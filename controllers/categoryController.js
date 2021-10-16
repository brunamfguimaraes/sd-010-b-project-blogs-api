const categoryService = require('../services/categoryService');

const create = async (req, res) => {
  const { name } = req.body;

  const createCategory = await categoryService.create(name);

  if (createCategory.message) {
    return res.status(400).json({ message: createCategory.message });
  }

  return res.status(201).json(createCategory);
};

const getAllCategories = async (req, res) => {
  const listCategories = await categoryService.getAll();

  return res.status(200).json(listCategories);
};

module.exports = {
  create,
  getAllCategories,
};
