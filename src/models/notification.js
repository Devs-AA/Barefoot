module.exports = (sequelize, DataTypes) => {
  const notifications = sequelize.define('notifications', {
    title: DataTypes.STRING,
    recipientId: DataTypes.INTEGER,
    issuerId: DataTypes.INTEGER
  }, {});
  notifications.associate = (models) => {
    notifications.belongsTo(models.users, {
      primaryKey: 'recipientId',
    });
    notifications.belongsTo(models.users, {
      primaryKey: 'issuerId',
    });
  };
  return notifications;
};
