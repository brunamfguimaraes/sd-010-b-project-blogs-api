module.exports = {
  displayLeastCharacter: {
    status: 400,
    message: '"displayName" length must be at least 8 characters long',
  },

  emailNotExist: {
    status: 400,
    message: '"email" is required',
  },

  emailNotValid: {
    status: 400,
    message: '"email" must be a valid email',
  },

  passwordNotExist: {
    status: 400,
    message: '"password" is required',
  },

  passwordDiferentLength: {
    status: 400,
    message: '"password" length must be 6 characters long',
  },

  userExist: {
    status: 409,
    message: 'User already registered',
  },

  missingToken: {
    status: 401,
    message: 'Token not found',
  },

  jwtMalformed: {
    status: 401,
    message: 'Expired or invalid token',
  },

  emailEmpty: {
    status: 400,
    message: '"email" is not allowed to be empty',
  },

  passwordEmpty: {
    status: 400,
    message: '"password" is not allowed to be empty',
  },

  loginInvalid: {
    status: 400,
    message: 'invalid fields',
  },

  userNotExist: {
    status: 404,
    message: 'User does not exist',
  },
};