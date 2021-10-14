'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const blogPosts = queryInterface.createTable("BlogPosts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      title: {
        allowNull: false,
        type: Sequelize.STRING
      },

      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'userId',
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },

      published: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updated: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });

    return blogPosts;
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("BlogPosts")
  }
};