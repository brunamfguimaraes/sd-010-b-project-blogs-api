const { User } = require('../models');

const validateField = (email, password) => {
    if (!email) {
        return { message: '"email" is required' };
    }

    if (!password) {
        return { message: '"password" is required' };
    }
   
    return true;
};

const notEmpty = (email, password) => {
   if (email === '') {
      return { message: '"email" is not allowed to be empty' };
   } 

   if (password === '') {
      return { message: '"password" is not allowed to be empty' };
   }

   return true;
};

const existingEmail = async (email, password) => {
    const existEmail = await User.findOne({ where: { email, password } });
    if (!existEmail) { return { message: 'Invalid fields' }; }
    return true;
};

const loginUser = async ({ email, password }) => {
    const validField = validateField(email, password);
    const validEmpty = notEmpty(email, password);
    if (validEmpty !== true) return { message: validEmpty.message };
    if (validField !== true) return { message: validField.message };
    const validExist = await existingEmail(email, password);
    if (validExist !== true) return { message: validExist.message };
    const login = await User.findOne({ where: { email, password } });
    return login;
};

module.exports = { loginUser };
