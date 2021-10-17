 const { RegisterValidate, JWTToken } = require('../middlewares');
const { User } = require('../models');

const EmailFinder = async (email) => {
  const result = await User.findOne({ where: { email } });
  if (result !== null) {
    return { err: { message: 'User already registered' }, code: 409 };
  }
  return false;
};

 const ServiceUserRegister = async (userData) => {
  const { email } = userData;

 const result = RegisterValidate(userData);
 if (result.err) {
   return result;
 }
 const emailExists = await EmailFinder(email);

 if (emailExists.err) {
  return emailExists;
}

  await User.create(userData);
  
  const token = JWTToken(email);
  
  return { code: 201, token };
 };

 const serviceUserList = async () => {
   const userList = await User.findAll();
     return {
       allUsers: { message: userList }, code: 200,
      };
 };

const serviceUserListById = async (id) => {
  const userListById = await User.findOne({ where: { id } });
  if (!userListById) {
    return { err: { message: 'User does not exist' }, code: 404 };
  }
  return {
    allUsers: { message: userListById }, code: 200,
   };
};

 module.exports = {
  ServiceUserRegister,
  serviceUserList,
  serviceUserListById,
 };