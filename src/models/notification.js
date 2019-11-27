module.exports = (sequelize, DataTypes) => {
  const notifications = sequelize.define('notifications', {
    title: DataTypes.STRING,
    isRead: DataTypes.BOOLEAN,
    recipientId: DataTypes.INTEGER,
    requestId: DataTypes.INTEGER
  }, {});
  notifications.associate = (models) => {
    notifications.belongsTo(models.users, {
      primaryKey: 'recipientId',
    });
    notifications.belongsTo(models.requests, {
      primaryKey: 'requestId',
    });
  };
  return notifications;
};
