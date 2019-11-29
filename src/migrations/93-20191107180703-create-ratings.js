module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ratings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    requesterName: {
      type: Sequelize.STRING
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    requesterId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    accommodationId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'accommodations',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    message: {
      type: Sequelize.STRING
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
  down: (queryInterface) => queryInterface.dropTable('ratings')
};
