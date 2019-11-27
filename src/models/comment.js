module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comments', {
    message: DataTypes.STRING,
    requestId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    quotedCommentId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    paranoid: true,
    timestamps: true
  });
  comment.associate = (models) => {
    comment.belongsTo(models.users, {
      foreignKey: 'id'
    });
    comment.belongsTo(models.requests, {
      foreignKey: 'requestId'
    });
    comment.belongsTo(models.comments, {
      foreignKey: 'quotedCommentId'
    });
  };
  return comment;
};
