import models from '../../models';
import { checkIfExistsInDb } from '../../utils/searchDb';
import {
  validateRequestObj, validateOnewayTrip, validateReturnTrip, validateMuticityTrip, findTripData,
  validateId
} from '../../helpers/validation/tripValidation';

export const validateTripRequest = async (req, res, next) => {
  req.body.tripType = !req.body.tripType ? null : req.body.tripType.trim();
  req.body.reason = !req.body.reason ? null : req.body.reason.trim();
  try {
    const errors = {};
    const { tripType, reason, departmentId } = req.body;
    const requestObj = {
      reason,
      departmentId,
      tripType
    };
    validateRequestObj(requestObj, errors);
    if (Object.keys(errors).length) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }
    return next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const validateTripInput = async (req, res, next) => {
  const errors = {};
  validateId(req.params.requestId, 'Request', errors);
  if (Object.keys(errors).length) {
    return res.status(400).json({
      success: false,
      error: 'Invalid request id'
    });
  }
  try {
    const foundRequest = await models.requests.findOne({
      where: {
        id: req.params.requestId
      },
      include: [models.trips]
    });
    if (!foundRequest) {
      return res.status(404).json({
        success: false,
        error: 'Request not found'
      });
    }
    if (req.user.id !== foundRequest.dataValues.requesterId) {
      return res.status(403).json({
        success: false,
        error: 'You cannot perform this operation'
      });
    }
    const { tripType, status, trips } = foundRequest.dataValues;
    if (status === 'open') {
      throw new Error('Your travel request has not been approved');
    } else if (status === 'rejected') {
      throw new Error('Your travel request has been rejected');
    }
    if (trips && trips.length) {
      throw new Error('You cannot perform this operation');
    }
    switch (tripType) {
    case 'oneWay':
      validateOnewayTrip(req.body.trip, errors);
      break;
    case 'return':
      validateOnewayTrip(req.body.initialTrip, errors);
      validateReturnTrip(req.body.initialTrip, req.body.returnTrip, errors);
      break;
    case 'multiCity':
      validateMuticityTrip(req.body.trips, errors);
      break;
    default:
      errors.tripType = 'Invalid Trip type';
    }
    if (Object.keys(errors).length) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }
    req.request = foundRequest.dataValues;
    next();
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.message
    });
  }
};

export const validateTripData = async (req, res, next) => {
  const errors = {};
  try {
    const { tripType } = req.request;
    if (tripType === 'oneWay') {
      await findTripData(req.body.trip, tripType, errors, 'The selected accommodation is not available at the choosen destination');
    } else if (tripType === 'return') {
      const { initialTrip, returnTrip } = req.body;
      await findTripData(initialTrip, tripType, errors, 'The selected accommodation is not available at the choosen initial trip destination');
      await findTripData(returnTrip, tripType, errors, 'The selected accommodation is not available at the choosenreturn trip destination');
    } else if (tripType === 'multiCity') {
      const { trips } = req.body;
      const tripsPromise = trips.map(async (trip, index) => {
        await findTripData(trip, tripType, errors, `The selected accommodation for trip ${index + 1} is not available at the choosen destination`);
        return trip;
      });
      await Promise.all(tripsPromise);
    }
    if (Object.keys(errors).length) {
      return res.status(404).json({
        success: false,
        errors
      });
    }
    next();
  } catch (error) {
    res.status(errors.status || 404).json({
      success: false,
      message: error.message
    });
  }
};

export const checkRequest = async (req, res, next) => {
  try {
    const foundRequest = await models.requests.findOne({
      where: {
        requesterId: req.user.id,
        status: 'open'
      }
    });
    // if (foundRequest) {
    //   throw new Error('You still have a pending request');
    // }
    const foundDepartment = await checkIfExistsInDb(models.departments, req.body.departmentId, 'Department does not exist');
    if (foundDepartment) {
      req.managerId = foundDepartment.managerId;
    }
    return next();
  } catch (error) {
    return res.status(422).json({
      success: false,
      message: error.message,
    });
  }
};
