const Sequelize = require('sequelize');
const { User } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const validName = (name) => {
  if (name.lenght < 8) {
    return {
      message: 'name must have at least 8 characters',
    };
  }
};

const validEmail = (email) => {
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return { message: 'email must be filled' };
  if (!re.test(email)) return { message: 'invalid email format' };
};

const emailAlreadyInUse = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (user) return { message: 'email already in use' };
};

const validPassword = (password) => {
  if (password.toString().length < 6) {
    return { 
      message: 'Password must have at least 6 characters', 
    }; 
  }
};

const isUserFieldsInvalid = async (displayName, email, password) => {
  const dataCheck = await Promise.all([
    emailAlreadyInUse(email),
    validName(displayName),
    validEmail(email),
    validPassword(password),
  ]);
 
  const invalidFieldsMessage = dataCheck.filter((e) => e !== undefined);

  return invalidFieldsMessage[0];
};

const createNewUser = async (displayName, email, password, image) => {
  const invalidUserMessage = await isUserFieldsInvalid(displayName, email, password);

  if (invalidUserMessage) return { errorMessage: invalidUserMessage };

  const result = await sequelize.transaction(async (t) => {
    const user = await User.create({ displayName, email, password, image }, { transaction: t });

    return user;
  });

  return result;
};

module.exports = {
  validName,
  validEmail,
  validPassword,
  emailAlreadyInUse,
  createNewUser,
};