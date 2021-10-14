// const { User } = require('../models');
const {
  createNewUser,
  fieldLength,
  validateEmail,
  verifyEmptyFields,
  registeredEmail,
} = require('../services/userService');

const verifyFieldsEmpty = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!password) await verifyEmptyFields('password');
    if (!email) await verifyEmptyFields('email');
    next();
  } catch (e) {
    if (e.name === 'emptyError') {
      const response = e.message;
      return res.status(400).json({ message: response });
    }
  }
};

const verifyFieldsLength = async (req, res, next) => {
  try {
    const { displayName, password } = req.body;
    await fieldLength(displayName, password);
    next();
  } catch (e) {
    if (e.name === 'lengthError') {
      const response = e.message;
      return res.status(400).json({ message: response });
      }
    }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    await validateEmail(email);
    next();
  } catch (e) {
    if (e.name === 'emailError') {
      const response = e.message;
      return res.status(400).json({ message: response });
      }
    }
};

const verifyRegisteredUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    await registeredEmail(email);
    next();
  } catch (e) {
    if (e.name === 'registeredUser') {
      const response = e.message;
      return res.status(409).json({ message: response });
      }
    }
};

const createUser = async (req, _res, next) => {
  const { displayName, email, password, image } = req.body;
  await createNewUser(displayName, email, password, image);
  next();
};

module.exports = {
  createUser,
  verifyFieldsLength,
  verifyEmail,
  verifyFieldsEmpty,
  verifyRegisteredUser,
};
