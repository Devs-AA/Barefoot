module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('trips', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    destinationLocationId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    departureLocationId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    accommodationId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'accommodations',
        key: 'id'
      }
    },
    requestId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'requests',
        key: 'id'
      }
    },
    departureDate: {
      type: Sequelize.DATE,
      allowNull: false,
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
  down: (queryInterface) => queryInterface.dropTable('trips')
};
