const rescue = require('express-rescue');
const postService = require('../services/postService');
const { BlogPost, User, Category } = require('../models');

const creatPost = rescue(async (request, response) => {
  const newPost = request.body;
//   const { id: userId } = request;
  const post = await postService.creatPost(newPost, 1);
  return response.status(201).json(post);
});

const getPosts = async (req, res) => {
    const result = await postService.getPosts();

    return res.status(200).json(result);
};

const getPostsById = async (req, res) => {
    const { id } = req.params;
    const result = await BlogPost.findOne({
      where: { id },
      include: [{ model: User, as: 'user' }, { model: Category, as: 'categories' },
    ],
    });
    if (!result) {
        return res.status(404).json({ message: 'Post does not exist' });
    }

    return res.status(200).json(result);
};

const updatePost = rescue(async (req, res) => {
  const { title, content } = req.body;
  const result = await postService.updatePost(1, title, content);

  res.status(200).json(result);
});

const deletePost = rescue(async (request, response) => {
  const { id } = request.params;
  const { id: userId } = request.params;
  const { error } = await postService.deletePost(id, userId);
 
  if (error) {
    return response.status(error.status).json({ message: error.message });
  }
 
  response.status(204).json();
 });

module.exports = { 
    creatPost,
    getPosts,
    getPostsById,
    updatePost,
    deletePost,
};