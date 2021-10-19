module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });

  Users.associate = (models) => {
    Users.hasMany(models.BlogPost,
      { foreignKey: 'userId', as: 'posts' });
  };
  
  return Users;
};