import models from '../models';
import Validation from '../helpers/validation';
import { checkIfExistsInDb } from '../utils/searchDb';

export const validateCommentInput = (req, res, next) => {
  const { message, quotedCommentId } = req.body;
  const errors = {};
  const isValidRequestId = Validation.validateInteger(req.params.requestId);
  if (!isValidRequestId) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request id'
    });
  }
  if (!message) {
    errors.message = 'No comment message provided';
  } else if (typeof message !== 'string') {
    errors.message = 'Invalid Message';
  }
  if (quotedCommentId) {
    const validQuotedCommentId = Validation.validateInteger(quotedCommentId, errors);
    if (!validQuotedCommentId) {
      errors.quotedCommentId = 'Invalid quoted comment id';
    }
  }
  if (Object.keys(errors).length) {
    return res.status(400).json({
      success: false,
      errors
    });
  }
  return next();
};


export const validateCommentRequest = async (req, res, next) => {
  const id = req.params.requestId;
  try {
    const request = await checkIfExistsInDb(models.requests, id, 'Request does not exist');
    if (req.body.quotedCommentId) {
      await checkIfExistsInDb(models.comments, req.body.quotedCommentId, 'Quoted comment does not exist');
    }
    if (request.status !== 'open') {
      return res.status(403).json({
        success: false,
        message: `You cannot comment on ${request.status} requests`
      });
    }
    if (req.user.id !== request.requesterId && req.user.id !== request.managerId) {
      return res.status(401).json({
        success: false,
        message: 'You are not authorised to perform this operation'
      });
    }
    next();
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
