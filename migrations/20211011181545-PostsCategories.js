'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('PostsCategories', {
      postId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        // primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: "BlogPosts",
          key: "id",
        },
      },
      categoryId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        // primaryKey: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: "Categories",
          key: "id",
        },
      },
    })
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('PostsCategories');
  }
};
