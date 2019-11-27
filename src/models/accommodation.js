module.exports = (sequelize, DataTypes) => {
  const accommodation = sequelize.define('accommodations', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    noOfRooms: DataTypes.INTEGER,
    type: DataTypes.STRING,
    timesVisited: DataTypes.INTEGER,
    destinationId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    paranoid: true,
    timestamps: true
  });
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
