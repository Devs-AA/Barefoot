module.exports = (sequelize, DataTypes) => {
  const trip = sequelize.define('trips', {
    destinationLocationId: DataTypes.INTEGER,
    departureLocationId: DataTypes.INTEGER,
    accommodationId: DataTypes.INTEGER,
    requestId: DataTypes.INTEGER,
    departureDate: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
    requesterId: DataTypes.INTEGER
  }, {
    paranoid: true,
    timestamps: true
  });
  trip.associate = (models) => {
    trip.belongsTo(models.accommodations, {
      foreignKey: 'accommodationId'
    });
    trip.belongsTo(models.requests, {
      foreignKey: 'requestId'
    });
    trip.belongsTo(models.users, {
      foreignKey: 'requesterId'
    });
  };
  return trip;
};
