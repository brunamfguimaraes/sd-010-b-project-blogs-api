const postsService = require('../service/postsService');

const createPost = async (req, res) => {
  const { body } = req;
  const token = req.headers.authorization;

  const post = await postsService.createPost(token, body);

  if (post.validToken) {
    return res.status(401).json(post.message);
  }

  if (post.isValidCat) {
    return res.status(400).json(post.message);
  }

  if (post.details) {
    return res.status(400).json({ message: post.details[0].message });
  }

  if (post.categorieExist) {
    return res.status(409).json(post.error);
  }

  return res.status(201).json(post);
};

const getAllPost = async (req, res) => {
  const token = req.headers.authorization;

  const getAll = await postsService.getAllPost(token);

  if (getAll.validToken) {
    return res.status(401).json(getAll.message);
  }

  return res.status(200).json(getAll);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;

  const getById = await postsService.getPostById(token, id);

  if (!getById) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  if (getById.validToken) {
    return res.status(401).json(getById.message);
  }

  return res.status(200).json(getById);
};

const editPosts = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const token = req.headers.authorization;

  const editPost = await postsService.editPosts(token, id, body);

  if (editPost.status) {
    return res.status(editPost.status).json({ message: editPost.message });
  }

  // if (editPost.validCat) return res.status(400).json(editPost.message);
  // if (editPost.permission) {
  //   return res.status(401).json(editPost.message);
  // }
  // if (!editPost) {
  //   return res.status(404).json({ message: 'Post does not exist' });
  // }
  // if (editPost.validToken) {
  //   return res.status(401).json(editPost.message);
  // }

  return res.status(200).json(editPost);
};

module.exports = {
  editPosts,
  createPost,
  getAllPost,
  getPostById,
};