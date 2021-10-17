const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv/config');

const secret = process.env.JWT_SECRET;

const tokenExist = (token) => {
  if (!token || token === '') {
    return false;
  }
  return true;
};
const validToken = async (req, res, next) => {
  const { authorization } = req.headers;
  let user;
  if (!tokenExist(authorization)) return res.status(401).json({ message: 'Token not found' });
  try {
    const decoded = jwt.verify(authorization, secret);
    if (decoded) {
      user = await User.findOne({ where: { email: decoded } });
    }
    if (user) {
      req.email = decoded;
      next();
    }
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  validToken,
};
