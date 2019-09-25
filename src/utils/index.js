/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
/**
 * @param {id} id of newly registered user from the user Table.
 * @return {string} generated token that is a string data type.
 */
export const emailVerifyToken = (id) => new Promise((resolve) => {
  const token = jwt.sign({ id }, process.env.EMAIL_VERIFY_TOKEN_SECRET_KEY, { expiresIn: '24h' });
  if (token) return resolve(token);
});

/**
 * @param {user } user public details of newly registered user from the user table
 * @return {string} generated token that is a string data type.
 */
export const jwtSignUser = (user) => new Promise((resolve) => {
  const token = jwt.sign(user, process.env.JWT_SECRET);
  if (token) return resolve(token);
});

export const jwtVerifyUserToken = (token) => new Promise((resolve, reject) => {
  const result = jwt.verify(token, process.env.JWT_SECRET);
  const ERROR = 'Token cannot be VERIFIED because your secret key is has an issue';
  if (result) return resolve(result);
  if (!result) return reject(ERROR);
});

/**
 * @param {object} object This is the obeject to check if it is empty.
 * @return {boolean} returns true or false depending if the body is empty or not.
 */
export const isEmptyBody = (object) => {
  if (Object.keys(object).length > 0) {
    return false;
  }
  return true;
};

/**
 * @param {object} object This is the obeject to check if it has property in it.
 * @return {Array} returns an array of mismatch property.
 */
export const isMissingBodyProperty = (object) => {
  const requiredBodyProperty = ['email', 'firstName', 'lastName', 'password'];
  const submittedBodyProperty = Object.keys(object);
  const res = requiredBodyProperty.filter(function (n) {
    return !this.has(n);
  }, new Set(submittedBodyProperty));
  if (res) {
    return res;
  }
  return false;
};

/**
 * @param {object} object This is the obeject to check if it has property in it.
 * @return {Array} returns an array of mismatch property value.
 */
export const isMissingBodyPropertyValue = (object) => {
  const whiteSpaceRegex = /\s/g;
  const arrayProperty = [];
  for (const key in object) {
    object[key].trim();
    if (whiteSpaceRegex.test(object[key])) {
      if (object[key].trim().length <= 0) {
        arrayProperty.push(key);
      }
    }
    if (!object[key]) {
      arrayProperty.push(key);
    }
  }
  return arrayProperty;
};
