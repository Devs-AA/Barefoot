import Validator from '../validation';

export const validateTripObj = (arr, type, err) => {
  let presentLocation = '';
  let date = '';
  const dateRegex = /([0-9]{4}-|\/(0[1-9]|1[0-2])-|\(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;
  if (!Array.isArray(arr)) {
    err.trips = 'Invalid Trips'; 
  }
  if (!arr.length) {
    err.trips = 'No trip selected';
  }
  const trips = arr.map((obj, index) => {
    if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
      err.trip = `Invalid Trip ${index + 1}`;
    }
    if (!obj.destinationLocationId) {
      err[`trip ${index + 1} destination`] = `No destination provided for the trip ${index + 1}`;
    } else if (!Validator.validateInteger(obj.destinationLocationId) && obj.destinationLocationId) {
      err[`trip ${index + 1} destination`] = `Invalid destination provided for the trip number ${index + 1}`;
    }
    if (!obj.departureLocationId) {
      err[`trip ${index + 1} departure`] = `No depature location provided for the trip number ${index + 1}`;
    } else if (!Validator.validateInteger(obj.departureLocationId)) {
      err[`trip ${index + 1} departure`] = `Invalid departure location id provided for the trip number ${index + 1}`;
    }
    if (!obj.accommodationId) {
      err[`trip ${index + 1} accommodation`] = `No accommodation provided for the trip number ${index + 1}`;
    } else if (!Validator.validateInteger(obj.accommodationId) && obj.accommodationId) {
      err[`trip ${index + 1} accommodation`] = `Invalid accommodation id provided for the trip number ${index + 1}`;
    }
    if (obj.departureLocationId === obj.destinationLocationId) {
      err[`trip ${index + 1}`] = 'A trip\'s destination cannot be the same as the departure location';
    }
    if (!obj.departureDate) {
      err[`trip ${index + 1} departureDate`] = `Trip date not provided for trip ${index + 1}`;
    } else {
      obj.departureDate = obj.departureDate.trim();
      if (!dateRegex.test(obj.departureDate)) {
        err[`trip ${index + 1} departureDate`] = `Invalid Trip date/time format for trip ${index + 1}`;
      } else if (Date.parse(obj.departureDate) - Date.now() < 432000000 && index === 0) {
        err[`trip ${index + 1} departureDate`] = 'Invalid Trip Date. Give at least a week\'s notice for initial trip';
      } else if (Date.parse(obj.departureDate) - Date.parse(date) < 86400000) {
        err[`trip ${index + 1} departureDate`] = 'Invalid Trip Date. Give at least a day difference from previous trip';
      }
    }
    if ((type === 'multiCity' || type === 'return') && presentLocation && obj.departureLocationId !== presentLocation) {
      err[`trip ${index + 1} departure`] = `Invalid departure Location in trip ${index + 1}`;
    } else {
      presentLocation = obj.destinationLocationId;
    }
    date = obj.departureDate;
    return obj;
  });
  return trips;
};


export const validateRequestObj = (body, errors) => {
  const stringRegex = /^[a-z\s]+$/i;
  const typeOfTrip = ['oneWay', 'return', 'multiCity'];
  const {
    reason, tripType, departmentId
  } = body;
  if (!reason) {
    errors.reason = 'Trip reason not provided';
  } else {
    body.reason = body.reason.trim();
    if (!stringRegex.test(reason) && reason) {
      errors.reason = 'Invalid travel reason';
    }
  }
  if (!tripType) {
    errors.tripType = 'Type of trip not provided';
  } else {
    body.tripType = body.tripType.trim();
    if (!typeOfTrip.includes(tripType)) {
      errors.reason = 'Invalid trip type';
    }
  }
  if (!departmentId) {
    errors.department = 'No department provided';
  }
  if (!Validator.validateInteger(departmentId) && !errors.department) {
    errors.department = 'Invalid department provided';
  }
};

export const validateTrip = (body, error) => {
  const { tripType, trips } = body;
  if (tripType === 'oneWay' && trips.length > 1) {
    throw new Error('One-way trips can only have one trip');
  }
  if (tripType === 'return' && trips.length < 2) {
    error.returnTrip = 'Return trip not provided';
  } else if (tripType === 'return' && trips.length > 2) {
    error.returnTrip = 'Return trip can only be a two way trip';
  } else if (tripType === 'return' && trips.length === 2) {
    const currentLocation = trips[0].departureLocationId;
    const returningLocation = trips[1].destinationLocationId;
    const initialDestination = trips[0].destinationLocationId;
    const returningDestination = trips[1].departureLocationId;
    if (currentLocation !== returningLocation) {
      error.returnTripDeapature = 'Departure location of the initial trip must be the same as the destination of the return trip';
    }
    if (initialDestination !== returningDestination) {
      error.returnTripDestination = 'Departure location of the return trip must be the same as the destination of the initial trip';
    }
  }
  if (tripType === 'multiCity' && trips.length < 2) {
    throw new Error('Multi-city must have more than a trip ');
  }
};