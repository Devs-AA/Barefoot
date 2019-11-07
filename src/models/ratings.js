module.exports = (sequelize, DataTypes) => {
  const ratings = sequelize.define('ratings', {
    requesterName: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    requesterId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    accommodationId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    paranoid: true,
    timeStamps: true
  });
  ratings.associate = (models) => {
    ratings.belongsTo(models.users, {
      foreignKey: 'requesterId',
      as: 'requester'
    });
    ratings.belongsTo(models.accommodations, {
      foreignKey: 'accommodationId',
      as: 'accommodation'
    });
  };
  return ratings;
};
