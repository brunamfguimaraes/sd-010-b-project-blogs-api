const { getAllUsers } = require('./controllers/userController');
const { createUser } = require('./controllers/userController');
const { validateEmail } = require('./controllers/userController');
const { checkPassword } = require('./controllers/userController');
const { checkDisplayName } = require('./controllers/userController');
const { login } = require('./controllers/userController');
const { getUserById } = require('./controllers/userController');
const { checkNameValidation } = require('./controllers/categoryController');
const { createCategory } = require('./controllers/categoryController');
const { getAllCategories } = require('./controllers/categoryController');

module.exports = {
  getAllUsers,
  createUser,
  validateEmail,
  checkPassword,
  checkDisplayName,
  login,
  getUserById,
  checkNameValidation,
  getAllCategories,
  createCategory,
  
};