const { User } = require('../models');

const validateName = (displayName) => {
    if (!displayName || displayName.length < 8) {
        return false;
    }

    return true;
};

const validateField = (email, password) => {
    if (!email) {
        return { message: "\"email\" is required" };
    }

    if (!password) {
        return { message: "\"password\" is required" };
    }
   
    return true;
};

const validateEmail = (email) => {
    const regexEmail = /\b[\w.-]+@[\w.-]+.\w{2,4}\b/;
    if (!regexEmail.test(email)) {
        return false;
    }
    
    return true;
};

const validatePassword = (password) => {
    if (!password || password.length !== 6) {
       return false; 
    }

    return true;
};

const allValidations = (displayName, email, password) => {
    const validName = validateName(displayName);
    const validField = validateField(email, password);
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);
    if (!validName) {
        return { message: "\"displayName\" length must be at least 8 characters long" };
    }
    if (validField !== true) return { message: validField.message };
    if (!validEmail) { return { message: "\"email\" must be a valid email" }; }
    if (!validPassword) { return { message: "\"password\" length must be 6 characters long" }; }
    return true;
};

const existingEmail = async (email) => {
    console.log(email);
    const existEmail = await User.findOne({ email });
    console.log(existEmail);
    if (existEmail) { return { message: 'User already registered' }; }
    return true;
};

const createUser = async ({ displayName, email, password, image }) => {
  /*   const validName = validateName(displayName);
    const validField = validateField(email, password);
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password); */
    const validations = allValidations(displayName, email, password);
    const existUser = await existingEmail(email);
    
 /*    if (!validName) {
        return { message: 'displayName length must be at least 8 characters long' };
    }
    if (validField !== true) return { message: validField.message };
    if (!validEmail) { return { message: 'email must be a valid email' }; }
    if (!validPassword) { return { message: 'password length must be 6 characters long' }; } */
    if (validations.message) { return { message: validations.message }; }
    if (existUser.message) { return { message: existUser.message }; }

    const user = await User.create({ displayName, email, password, image });
    return user;
};

module.exports = { createUser };