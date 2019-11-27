module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('comments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    quotedCommentId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'comments',
        key: 'id',
      }
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    requestId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'requests',
        key: 'id',
      }
    },
    ownerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('comments')
};
