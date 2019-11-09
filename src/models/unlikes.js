module.exports = (sequelize, DataTypes) => {
  const unlikes = sequelize.define('unlikes', {
    accommodationId: DataTypes.INTEGER,
    requesterId: DataTypes.INTEGER
  }, {});
  unlikes.associate = (models) => {
    unlikes.belongsTo(models.users, {
      foreignKey: 'requesterId',
      as: 'requester'
    });
    unlikes.belongsTo(models.accommodations, {
      foreignKey: 'accommodationId',
      as: 'accommodation'
    });
  };
  return unlikes;
};
