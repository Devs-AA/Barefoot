export default (sequelize, DataTypes) => {
  const Role = sequelize.define('roles', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deletedAt: DataTypes.DATE
  }, {
    paranoid: true,
    timestamps: true
  });
  return Role;
};
