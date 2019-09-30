'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('logouts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    invalidToken: {
      type: Sequelize.STRING(5000),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Actual token is required'
        }
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
  down: (queryInterface) => queryInterface.dropTable('logouts')
};

