const jwt = require('jsonwebtoken');
const { BlogPost, User, Categorie } = require('../models/index');
const { code, errorMessage } = require('../schema/index');

/**
 * 
 * @param {object} post title, content, categoryIds
 * return code, notification
 */
const createPost = async ({ title, content, categoryIds }, token) => {
  const secret = process.env.JWT_SECRET;
  const { email } = jwt.verify(token, secret);

  const categories = await Categorie.findAll({
    where: { id: categoryIds },
  });

 if (categories.length !== categoryIds.length) {
   return {
     code: code.HTTP_BAD_REQUEST,
     notification: { message: errorMessage('noCategoryIds') },
   };
 }

  const { id } = await User.findOne({ where: { email } });
  const newPost = await BlogPost.create({ title, content, categoryIds, userId: id });

  const successfullyCreated = {
    code: code.HTTP_CREATED,
    notification: newPost,
  };

  return successfullyCreated;
};

module.exports = {
  createPost,
};
