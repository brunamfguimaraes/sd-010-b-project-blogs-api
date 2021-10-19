const BlogPosts = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define(
    'BlogPosts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
    },
    {
      createdAt: 'published',
      updatedAt: 'updated',
    },
  );

  blogPosts.associate = (models) => {
    blogPosts.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return blogPosts;
};

module.exports = BlogPosts;