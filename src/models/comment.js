module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comments', {
    message: DataTypes.STRING,
    requestId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
    quotedCommentId: DataTypes.INTEGER
  }, {});
  comment.associate = (models) => {
    comment.belongsTo(models.users, {
      foreignKey: 'id'
    });
    comment.belongsTo(models.requests, {
      foreignKey: 'id'
    });
    comment.belongsTo(models.comments, {
      foreignKey: 'quotedCommentId'
    });
  };
  return comment;
};
