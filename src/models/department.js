module.exports = (sequelize, DataTypes) => {
  const department = sequelize.define('departments', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    managerId: DataTypes.INTEGER
  }, {
    paranoid: true,
    timestamps: true
  });
  department.associate = (models) => {
    department.belongsTo(models.users, {
      foreignKey: 'managerId',
      as: 'manager',
      key: 'id'
    });
  };
  return department;
};
