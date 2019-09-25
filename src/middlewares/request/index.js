import Validation from '../../helpers/validation';
import { checkIfExistsInDb } from '../../utils/searchDb';
import models from '../../models';
import { validateRequestObj } from '../../helpers/validation/tripValidation';

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
    if (req.user.id !== request.managerId || request.status !== 'open') {
      return res.status(403).json({
        success: false,
        message: 'You are not allowed to perform this operation',
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

export const validateEditRequest = (req, res, next) => {
  const errors = {};
  try {
    const tripType = req.body.tripType ? req.body.tripType.trim() : null;
    const reason = req.body.reason ? req.body.reason.trim() : null;
    const isValidReqParam = Validation.validateInteger(req.params.requestId, errors);
    if (!isValidReqParam) {
      throw new Error('Invalid Request Id');
    }
    const requestObj = {
      tripType,
      reason
    };
    validateRequestObj(requestObj, errors);
    delete errors.department;
    if (Object.keys(errors).length) {
      return res.status(400).json({
        success: false,
        errors
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const checkRequestOwnerAndConflict = async (req, res, next) => {
  const errors = {};
  const { reason, tripType } = req.body;
  try {
    const request = await checkIfExistsInDb(models.requests, req.params.requestId, 'Request not found');
    if (req.user.id !== request.requesterId) {
      return res.status(401).json({
        success: false,
        message: 'You are not authorised to perform this operation'
      });
    }
    if (request.reason === reason.trim()) {
      errors.reason = `Request reason is already ${reason}`;
    }
    if (request.tripType === tripType.trim()) {
      errors.tripType = `Request trip is already ${tripType}`;
    }
    if (Object.keys(errors).length) {
      return res.status(422).json({
        success: false,
        errors
      });
    }
    next();
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
