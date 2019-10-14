module.exports = (sequelize, DataTypes) => {
  const notifitications = sequelize.define('notifitications', {
    title: DataTypes.STRING,
    recipientId: DataTypes.INTEGER
  }, {});
  notifitications.associate = (models) => {
    notifitications.belongsTo(models.users, {
      primaryKey: 'recipientId',
      as: 'notifications'
    });
  };
  return notifitications;
};
