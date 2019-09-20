import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authorization = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Token required',
    });
  }
  try {
    // eslint-disable-next-line no-unused-vars
    const [, realToken] = token.split(' ');
    const decoded = await jwt.decode(realToken, process.env.JWT_SECRET);
    if (decoded) {
      req.result = decoded;
      return next();
    }
    throw new Error('Invalid Token Provided');
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};
