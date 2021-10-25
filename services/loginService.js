const { User } = require('../models');

const validateEmail = async (email) => {
  if (email === '') return { erro: { code: 400, message: '"email" is not allowed to be empty' } };

  if (!email) return { erro: { code: 400, message: '"email" is required' } };

  const userExist = await User.findOne({ where: { email } });
  if (!userExist) return { erro: { code: 400, message: 'Invalid fields' } };

  return true;
};

const validatePassword = (password) => {
  if (password === '') { 
    return { erro: { code: 400, message: '"password" is not allowed to be empty' } }; 
  }

  if (!password) return { erro: { code: 400, message: '"password" is required' } };

  return true;
};

module.exports = { validateEmail, validatePassword };