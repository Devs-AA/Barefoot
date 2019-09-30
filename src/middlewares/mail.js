/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import dotenv from 'dotenv';
import { verifyEmailTemplate } from '../services/mail/template/verifyEmail';
import { emailVerifyToken } from '../utils/index';
import validation from '../helpers/validation';
import Mail from '../services/mail/Mail';

dotenv.config();

const { CLIENT_URL } = process.env;

const { isValidEmail } = validation;

/**
 * @param {req} req contains the express object.
 * @param {res} res contains the express response.
 * @param {next} next calls the next middleware.
 * @returns {next-middleware } returns the next middleware or throws an error.
 * @returns {error} if any error occurs it throws an error.
 */
export const SendVerificationEmail = async (req, res, next) => {
  let { email, firstName, lastName } = req.body;
  email = email ? email.trim() : '';
  firstName = firstName ? firstName.trim() : '';
  lastName = lastName ? lastName.trim() : '';
  /**
   * @var {id} id is the user unique id from Table column
   */
  const id = req.user ? req.user.email : 'nodedeweb@yahoo.com';
  const token = await emailVerifyToken(id);

  const emaildDetails = {
    Subject: 'Email Verification',
    Recipient: email,
  };
  const domain = CLIENT_URL;
  const linkProd = `${req.protocol}://${req.hostname}/api/v1/users/email/verify?id=${token}`;
  const linkLocal = `${req.protocol}://${req.hostname}:${process.env.PORT}/api/v1/users/email/verify?id=${token}`;
  const link = `${req.protocol}://${req.hostname}` === domain ? linkProd : linkLocal;
  const data = {
    email,
    firstName,
    lastName,
    link,
  };
  try {
    const send = new Mail(emaildDetails, verifyEmailTemplate(data));
    const response = await send.main();
    if (!response) {
      return res.status(400).json({ status: 400, error: 'Network error occured, please check your network' });
    }

    if (response.message === 'No recipients defined') {
      return res.status(403).json({ status: 403, error: response.message });
    }
    if (response.message === 'queryA ECONNREFUSED smtp.gmail.com') {
      return res.status(511).json({ status: 511, error: 'Network error occured, please check your network' });
    }
    if (response.message === 'queryA EREFUSED smtp.gmail.com') {
      return res.status(511).json({ status: 511, error: 'Network error occured, please check your network' });
    }
    if (response) {
      req.verificationMailResponse = response;
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
