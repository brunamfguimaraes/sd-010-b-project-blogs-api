const { Category } = require('../models');

const create = async (name) => {
  if (!name) {
    const resp = { message: '"name" is required' };
    return resp; 
  }

  const createCategory = await Category.create({ name });

  return createCategory;
};

const getAll = async () => {
  const listCategories = await Category.findAll();

  return listCategories;
};

module.exports = {
  create,
  getAll,
};
