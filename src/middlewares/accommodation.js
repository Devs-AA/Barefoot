import Validation from '../helpers/validation';
import { checkIfExistsInDb } from '../utils/searchDb';
import { destinations } from '../models';

export const isInteger = (num, key, title, errors) => {
  const validInteger = Validation.validateInteger(num);
  if (!validInteger) {
    errors[key] = `${title} is invalid`;
  }
  return errors;
};
export const validateNewAccommodationInput = async (req, res, next) => {
  const errors = {};
  const {
    name, description, address, type, destinationId, noOfRooms, price, addOn
  } = req.body;
  if (addOn && addOn.length < 3) {
    errors.addOn = 'AddOn services should have between 3 to 500 characters';
  } else if (addOn && typeof addOn !== 'string') {
    errors.addOn = 'Invalid add-on service';
  }
  if (!name) {
    errors.name = 'Name is required';
  } else if (name.length < 3 || name.length > 50) {
    errors.name = 'Name  should have between 3 to 50 characters';
  } else if (typeof name !== 'string') {
    errors.name = 'Invalid name';
  }
  if (!type) {
    errors.type = 'Room type is required';
  } else if (type.length < 8 || type.length > 50) {
    errors.type = 'Room type should have between 8 to 50 characters';
  } else if (typeof type !== 'string') {
    errors.type = 'Invalid room type';
  }
  if (!address) {
    errors.address = 'Address is required';
  } else if (address.length < 10 || address.length > 150) {
    errors.address = 'Address  should have between 10 to 150 characters';
  } else if (typeof address !== 'string') {
    errors.address = 'Invalid address';
  }
  if (!description) {
    errors.description = 'Description is required';
  } else if (description.length < 50) {
    errors.description = 'Description should have more than 50 characters';
  } else if (typeof description !== 'string') {
    errors.description = 'Invalid description';
  }
  if (!destinationId) {
    errors.destination = 'Destination is required';
  } else {
    isInteger(destinationId, 'destination', 'Destination', errors);
  }
  if (!noOfRooms) {
    errors.noOfRooms = 'Number of rooms is required';
  } else {
    isInteger(noOfRooms, 'noOfRooms', 'Number of rooms', errors);
  }
  if (!price) {
    errors.price = 'Price is required';
  } else {
    isInteger(price, 'price', 'Price', errors);
  }
  if (Object.keys(errors).length) {
    return res.status(400).json({
      success: false,
      errors
    });
  }
  try {
    await checkIfExistsInDb(destinations, destinationId, 'Sorry we do not have a branch in the choosen destination. Check back later');
  } catch ({ message }) {
    return res.status(404).json({
      success: false,
      message
    });
  }
  return next();
};
