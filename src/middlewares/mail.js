/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import { emailVerifyToken } from '../utils/index';
import validation from '../helpers/validation';

const { isValidEmail } = validation;

/**
 * @param {req} req contains the express object.
 * @param {res} res contains the express response.
 * @param {next} next calls the next middleware.
 * @returns {next-middleware } returns the next middleware or throws an error.
 * @returns {error} if any error occurs it throws an error.
 */
export const SendVerificationToken = async (req, res, next) => {
  /**
   * @var {id} id is the user unique id from Table column
   */
  const id = req.user ? req.user.email : 'nodedeweb@yahoo.com';

  try {
    const token = await emailVerifyToken(id);
    if (token) {
      req.emailToken = token;
      next();
    }
  } catch (err) {
    return res.status(400).json({ status: 400, error: err });
  }
};
/**
 * @param {req} req contains the express object.
 * @param {res} res contains the express response.
 * @param {next} next calls the next middleware.
 * @returns {next-middleware } returns the next middleware or throws an error.
 * @returns {error} if any error occurs it throws an error.
 */
export const handleEmptyEmailBody = (req, res, next) => {
  if (!req.body) {
    res.status(403).json({ status: 403, error: 'No body property is presented in the req object' });
  } else {
    let { email, firstName, lastName } = req.body;
    if (email && firstName && lastName) {
      email = email.trim();
      firstName = firstName.trim();
      lastName = lastName.trim();
      next();
    } else {
      res.status(403).json({ status: 403, error: 'Email, firstName and lastName is required' });
    }
  }
};
export const handleInvalidEmail = (req, res, next) => {
  const emailCheck = isValidEmail(req.body.email);
  if (emailCheck) {
    next();
  } else {
    res.status(403).json({ status: 403, error: 'Please provide a valid email' });
  }
};
