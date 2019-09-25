import jwt from 'jsonwebtoken';

const isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token required'
    });
  }
  try {
    // eslint-disable-next-line no-unused-vars
    const [, realToken] = token.split(' ');
    const decoded = await jwt.decode(realToken, process.env.JWT_SECRET);
    if (decoded) {
      req.user = decoded;
      return next();
    }
    throw new Error('Invalid Token Provided');
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

export default isLoggedIn;
