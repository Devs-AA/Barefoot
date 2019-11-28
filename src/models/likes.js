module.exports = (sequelize, DataTypes) => {
  const likes = sequelize.define('likes', {
    accommodationId: DataTypes.INTEGER,
    requesterId: DataTypes.INTEGER
  }, {});
  likes.associate = (models) => {
    likes.belongsTo(models.users, {
      foreignKey: 'requesterId',
      as: 'requester'
    });
    likes.belongsTo(models.accommodations, {
      foreignKey: 'accommodationId',
      as: 'accommodation'
    });
  };
  return likes;
};
