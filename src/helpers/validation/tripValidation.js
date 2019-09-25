import moment from 'moment';
import Validator from '../validation';
import models from '../../models';
import { checkIfExistsInDb } from '../../utils/searchDb';


const validateDate = (date, errors) => {
  if (!date) {
    errors.departureDate = 'No departure date provided';
  } else {
    const isValidDate = moment(date, 'YYYY-|/MM-|/DD hh:mm-ss').isValid();
    if (!isValidDate) {
      errors.departureDate = 'Invalid daparture date';
    }
  }
};

export const validateId = (id, idType, errors) => {
  if (!id) {
    errors[idType] = `No ${idType} location provided`;
  } else if (!Validator.validateInteger(id)) {
    errors[idType] = `Invalid ${idType} location provided`;
  }
};

const checkOnewayTrip = (trip, errors) => {
  validateDate(trip.departureDate, errors);
  validateId(trip.departureLocationId, 'Departure', errors);
  validateId(trip.destinationLocationId, 'Destination', errors);
  validateId(trip.accommodationId, 'Accommodation', errors);
  if (trip.departureLocationId === trip.destinationLocationId) {
    errors.destination = 'You cannot choose your departure location as your destination location';
  }
};

export const validateOnewayTrip = (trip, errors) => {
  if (!trip || typeof trip !== 'object' || Array.isArray(trip)) {
    errors.trip = 'No Trip Provided';
  } else {
    checkOnewayTrip(trip, errors);
    if (Date.parse(trip.departureDate) - Date.now() < 432000000) {
      errors.departureDate = 'Invalid Trip Date. Give at least a week\'s notice for trip';
    }
  }
};

const checkReturnTrip = (trip, errors) => {
  validateDate(trip.departureDate, errors);
  validateId(trip.departureLocationId, errors);
  validateId(trip.destinationLocationId, errors);
  if (trip.accommodationId) {
    errors.accommodation = 'Return trip should not have accommodation';
  }
};

export const validateReturnTrip = (initialTrip, returnTrip, errors) => {
  if (!returnTrip || typeof returnTrip !== 'object' || Array.isArray(returnTrip)) {
    errors.returnTrip = 'No Return Trip Provided';
  } else {
    checkReturnTrip(returnTrip, errors);
    if (Date.parse(returnTrip.departureDate) - Date.parse(initialTrip) < 86400000) {
      errors.departureDate = 'Invalid Trip Date. Give at least a day difference from initial trip';
    }
    const initialLocation = initialTrip.departureLocationId;
    const returningLocation = returnTrip.destinationLocationId;
    const initialDestination = initialTrip.destinationLocationId;
    const returningDestination = returnTrip.departureLocationId;
    if (initialLocation !== returningLocation) {
      errors.returnTripDeapature = 'Departure location of the initial trip must be the same as the destination of the return trip';
    } else if (initialDestination !== returningDestination) {
      errors.returnTripDestination = 'Departure location of the return trip must be the same as the destination of the initial trip';
    }
  }
};

export const validateMuticityTrip = async (trips, errors) => {
  let presentLocation = '';
  let date = '';
  if (!Array.isArray(trips)) {
    errors.trips = 'Invalid Trips';
  }
  if (!trips.length) {
    errors.trips = 'No trips selected';
  } else if (trips.length < 2) {
    errors.trip = 'Multi city trip should have more than one trip';
  }

  if (Object.keys(errors).length) {
    return errors;
  }
  trips.map(async (trip, index) => {
    if (!trip || typeof trip !== 'object' || Array.isArray(trip)) {
      errors[`Trip ${index + 1}`] = `No Trip Provided for trip ${index + 1}`;
    } else {
      checkOnewayTrip(trip, errors);
      if (index > 0) {
        if (Date.parse(trip.departureDate) - Date.parse(date) < 86400000) {
          errors[`Trip ${index + 1} departure date`] = `Invalid Trip Date for trip ${index + 1}. Give at least a day difference from initial trip`;
        }
        if (trip.departureLocationId !== presentLocation) {
          errors[`trip ${index + 1} destination`] = `Your departure location for trip ${index + 1} should be the same with destination Location for trip ${index}`;
        }
      } else {
        if (Date.parse(trip.departureDate) - Date.now() < 432000000) {
          errors.departureDate = 'Invalid Trip Date. Give at least a week\'s notice for trip';
        }
        date = trip.departureDate;
        presentLocation = trip.destinationLocationId;
      }
    }
  });
};

export const validateRequestObj = (body, errors) => {
  const stringRegex = /^[a-z\s]+$/i;
  const typeOfTrip = ['oneWay', 'return', 'multiCity'];
  const {
    reason, departmentId, tripType
  } = body;
  if (!reason) {
    errors.reason = 'Trip reason not provided';
  } else if (!stringRegex.test(reason) && reason) {
    errors.reason = 'Invalid travel reason';
  }
  if (!tripType) {
    errors.tripType = 'Type of trip not provided';
  } else if (!typeOfTrip.includes(tripType)) {
    errors.tripType = 'Invalid trip type';
  }
  if (!departmentId) {
    errors.department = 'No department provided';
  } else if (!Validator.validateInteger(departmentId)) {
    errors.department = 'Invalid department provided';
  }
};

export const findTripData = async (trip, type, errors, message) => {
  try {
    await checkIfExistsInDb(models.destinations, trip.destinationLocationId, 'Destination does not exist');
    await checkIfExistsInDb(models.destinations, trip.departureLocationId, 'Departure does not exist');
    if (type === 'return') {
      return null;
    }
    const accommodation = await checkIfExistsInDb(models.accommodations, trip.accommodationId, 'Accommodation does not exist');
    if (trip.destinationLocationId !== accommodation.destinationId) {
      errors.status = 422;
      throw new Error(message);
    }
  } catch (error) {
    throw Error(error.message);
  }
};
