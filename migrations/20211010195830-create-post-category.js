'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostsCategories', {
      postId: {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
      },
      categoryId: {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostsCategories');
  }
};