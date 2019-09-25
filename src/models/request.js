module.exports = (sequelize, DataTypes) => {
  const request = sequelize.define('requests', {
    tripType: DataTypes.ENUM(['oneWay', 'return', 'multiCity']),
    requesterId: DataTypes.INTEGER,
    reason: DataTypes.STRING,
    managerId: DataTypes.INTEGER,
    departmentId: DataTypes.INTEGER,
    status: DataTypes.ENUM(['open', 'approved', 'rejected'])
  }, {});
  request.associate = (models) => {
    request.hasMany(models.trips, {
      foreignKey: {
        name: 'requestId',
      }
    });
    request.belongsTo(models.users, {
      foreignKey: {
        name: 'requesterId',
        allowNull: false,
        key: 'id',
        as: 'requester'
      }
    });
    request.belongsTo(models.users, {
      foreignKey: {
        name: 'managerId',
        allowNull: false,
        key: 'id',
        as: 'manager'
      }
    });
    request.belongsTo(models.departments, {
      foreignKey: {
        name: 'departmentId',
        allowNull: false
      }
    });
  };
  return request;
};
