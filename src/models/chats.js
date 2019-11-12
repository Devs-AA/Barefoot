module.exports = (sequelize, DataTypes) => {
  const chats = sequelize.define('chats', {
    username: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {});
  chats.associate = (models) => {
    chats.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  return chats;
};
