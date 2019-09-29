/* eslint-disable import/prefer-default-export */

import { jwtVerifyUserToken } from '../../utils/index';


export const authorization = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token required',
    });
  }
  try {
    // eslint-disable-next-line no-unused-vars
    const [, realToken] = token.split(' ');
    const { user } = await jwtVerifyUserToken(realToken);
    if (user) {
      req.user = user;
      return next();
    }
    throw new Error('Invalid Token Provided');
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const NoUserFromPassport = (req, res, next) => {
  if (!req.user) {
    return res.send(401, 'User Not Authenticated');
  }
  next();
};
