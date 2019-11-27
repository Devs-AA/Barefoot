import path from 'path';
import fs from 'fs';
import cloudinary from 'cloudinary';
import Validation from '../helpers/validation';
import { checkIfExistsInDb } from '../utils/searchDb';
import { destinations, accommodations, requests } from '../models';
import { validateDate } from '../helpers/default';

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

export const validateBookingInput = async (req, res, next) => {
  const { tripDate, lodgeInDate, lodgeOutDate } = req.body;
  const errors = {};
  validateDate(tripDate, 'trip', errors);
  validateDate(lodgeInDate, 'arrival', errors);
  validateDate(lodgeOutDate, 'departure', errors);
  if ((Date.parse(tripDate) - Date.parse(lodgeInDate)) > 0) {
    errors.date = 'Trip date should be earlier than arrival date';
  }
  if ((Date.parse(lodgeOutDate) - Date.parse(lodgeInDate)) < 0) {
    errors.date = 'Departure date should be at least a day ahead of arrival date';
  }
  if (Object.keys(errors).length) {
    return res.status(400).json({
      success: false,
      errors
    });
  }
  next();
};

export const checkBookinginfo = async (req, res, next) => {
  const { accommodationId } = req.params;
  const { id } = req.user;
  try {
    const foundAccommodation = await checkIfExistsInDb(accommodations, accommodationId, 'Accommodation does not exists');
    req.accommodation = foundAccommodation;
    const foundRequest = await requests.findOne({
      where: {
        requesterId: id,
        status: 'approved',
        active: true
      }
    });
    if (!foundRequest) {
      throw new Error('You have no approved request');
    }
    req.request = foundRequest.dataValues;
    next();
  } catch ({ message }) {
    return res.status(404).json({
      success: false,
      message
    });
  }
};

export const validateImage = (imageArray) => {
  let isValid = true;
  imageArray.forEach((image) => {
    if (!path.extname(image.originalname).match(/jpg|jpeg|png/)) {
      isValid = false;
    }
  });
  return isValid;
};

export const getImagesUrl = async (files) => {
  const images = files.map(async (file) => {
    const { url } = await cloudinary.uploader.upload(file.path);
    fs.unlinkSync(file.path);
    return url;
  });
  return Promise.all(images);
};

export const checkAccommodationImages = async (req, res, next) => {
  const { files } = req;
  if (files) {
    const validImage = validateImage(files);
    if (!validImage) {
      return res.status(400).json({
        success: false,
        message: 'File is not an image'
      });
    }
    try {
      req.images = await getImagesUrl(files);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Could not upload image. Please check your internet connection'
      });
    }
    next();
  }
};
