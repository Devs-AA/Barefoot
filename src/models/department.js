module.exports = (sequelize, DataTypes) => {
  const department = sequelize.define('departments', {
    name: DataTypes.STRING,
    managerId: DataTypes.INTEGER
  }, {});
  department.associate = (models) => {
    department.belongsTo(models.users, {
      foreignKey: 'managerId',
      as: 'manager',
      key: 'id'
    });
  };
  return department;
};
