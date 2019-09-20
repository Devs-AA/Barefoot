/* eslint-disable import/prefer-default-export */
import { regexForEmail } from '../default';

export const emailRegex = (email) => {
  const Regex = regexForEmail;
  const EmailBoolean = email ? Regex.test(email) : false;
  return EmailBoolean;
};
