module.exports = (sequelize, DataTypes) => {
  const accommodation = sequelize.define('accommodations', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    noOfRooms: DataTypes.INTEGER,
    type: DataTypes.STRING,
    timesVisited: DataTypes.INTEGER,
    destinationId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    addOn: DataTypes.STRING,
    price: DataTypes.INTEGER,
    available: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE,
    rating: DataTypes.FLOAT,
    likes: DataTypes.INTEGER,
    unlikes: DataTypes.INTEGER,
    images: DataTypes.ARRAY(DataTypes.STRING(2033)),
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
