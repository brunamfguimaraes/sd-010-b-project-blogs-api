'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const BlogPostsTable = queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
       // allowNull: false,
        type: Sequelize.STRING
      },
      content: {
       // allowNull: false,
        type: Sequelize.STRING
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate:'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'published',
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated',
        defaultValue: Sequelize.fn('now'),
      }
    })

    return BlogPostsTable;
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BlogPosts');
  }
};