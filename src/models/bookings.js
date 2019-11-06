module.exports = (sequelize, DataTypes) => {
  const bookings = sequelize.define('bookings', {
    accomodationId: DataTypes.INTEGER,
    lodgeInDate: DataTypes.STRING,
    lodgeOutDate: DataTypes.STRING,
    requesterId: DataTypes.INTEGER
  }, {});
  bookings.associate = (models) => {
    bookings.belongsTo(models.accommodations, {
      foreignKey: 'accomodationId',
      as: 'accommodation'
    });
    bookings.belongsTo(models.users, {
      foreignKey: 'requesterId',
      as: 'requester'
    });
  };
  return bookings;
};
