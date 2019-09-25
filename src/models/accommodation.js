module.exports = (sequelize, DataTypes) => {
  const accommodation = sequelize.define('accommodations', {
    name: DataTypes.STRING,
    noOfRooms: DataTypes.INTEGER,
    type: DataTypes.STRING,
    timesVisited: DataTypes.INTEGER,
    destinationId: DataTypes.INTEGER
  }, {});
  accommodation.associate = (models) => {
    accommodation.hasMany(models.trips, {
      foreignKey: 'accommodationId'
    });
    accommodation.belongsTo(models.destinations, {
      foreignKey: 'destinationId'
    });
  };
  return accommodation;
};
