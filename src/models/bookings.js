module.exports = (sequelize, DataTypes) => {
  const bookings = sequelize.define('bookings', {
    accommodationId: DataTypes.INTEGER,
    lodgeInDate: DataTypes.STRING,
    lodgeOutDate: DataTypes.STRING,
    requesterId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    paranoid: true,
    timestamps: true
  });
  bookings.associate = (models) => {
    bookings.belongsTo(models.accommodations, {
      foreignKey: 'accommodationId',
      as: 'accommodation'
    });
    bookings.belongsTo(models.users, {
      foreignKey: 'requesterId',
      as: 'requester'
    });
  };
  return bookings;
};
