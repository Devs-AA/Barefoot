/* eslint-disable require-jsdoc */

import Response from '../utils/response';
import Validation from '../helpers/validation';

const { errorResponse } = Response;

export default class ValidateMiddleware {
  static forgotPasswordCheck(req, res, next) {
    const { errors, isValid } = Validation.validateEmail(req.body.email);
    // Check validation
    if (!isValid) {
      return errorResponse(res, 400, errors);
    }
    next();
  }

  static resetPasswordCheck(req, res, next) {
    const { errors, isValid } = Validation.validatePassword(req.body);
    // Check validation
    if (!isValid) {
      if (errors.password && errors.password === 'Passwords must match') {
        return errorResponse(res, 401, errors);
      }
      return errorResponse(res, 400, errors);
    }
    next();
  }
}
