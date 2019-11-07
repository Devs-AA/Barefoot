module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('bookings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    accommodationId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'accommodations',
        key: 'id'
      }
    },
    lodgeInDate: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lodgeOutDate: {
      type: Sequelize.STRING,
      allowNull: false
    },
    requesterId: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
  down: (queryInterface) => queryInterface.dropTable('bookings')
};
