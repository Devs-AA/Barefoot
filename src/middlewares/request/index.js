import Validation from '../../helpers/validation';
import { checkIfExistsInDb } from '../../utils/searchDb';
import models from '../../models';

export const validateUpdateRequest = (req, res, next) => {
  const errors = {};
  const validStatus = ['approved', 'rejected'];
  const validParam = Validation.validateInteger(req.params.requestId);
  if (!validParam) {
    errors.requestId = 'Invalid Request Id';
  }
  if (!req.body.status) {
    errors.status = 'New request status required';
  } else {
    req.body.status = req.body.status.trim();
    if (!validStatus.includes(req.body.status)) {
      errors.status = 'Invalid request status provided';
    }
  }
  if (Object.keys(errors).length) {
    return res.status(400).json({
      success: false,
      errors
    });
  }
  next();
};

export const checkRequestManager = async (req, res, next) => {
  const id = parseInt(req.params.requestId, 10);
  try {
    const request = await checkIfExistsInDb(models.requests, id, 'Request not found');
    if (req.user.id !== request.managerId) {
      return res.status(403).json({
        success: false,
        message: 'You are not allowed to perform this operation',
      });
    }
    if (request.status !== 'open') {
      return res.status(403).json({
        success: false,
        message: `Request already ${request.status}`,
      });
    }
    return next();
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
