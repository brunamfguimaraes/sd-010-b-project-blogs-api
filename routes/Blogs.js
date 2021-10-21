const { Router } = require('express');
const postController = require('../controllers/Blogs');
const { tokenValidation } = require('../mid/tokenValidation');

const Blog = Router();

Blog
    .get('/', tokenValidation, postController.getAll);

module.exports = Blog;