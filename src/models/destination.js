module.exports = (sequelize, DataTypes) => {
  const destination = sequelize.define('destinations', {
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    paranoid: true,
    timestamps: true
  });
  destination.associate = (models) => {
    destination.hasMany(models.trips, {
      foreignKey: 'destinationLocationId'
    });
    destination.hasMany(models.trips, {
      foreignKey: 'departureLocationId'
    });
  };
  return destination;
};
