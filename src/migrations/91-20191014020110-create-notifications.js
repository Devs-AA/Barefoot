module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('notifications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    recipientId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    isRead: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    requestId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'requests',
        key: 'id'
      }
    },
    issuerId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('notifications')
};
