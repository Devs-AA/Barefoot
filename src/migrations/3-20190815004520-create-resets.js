
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('resets', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    email: {
      type: Sequelize.STRING,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'email',
      }

    },
    resetToken: {
      type: Sequelize.STRING
    },
    expireTime: {
      type: Sequelize.DATE
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
  down: (queryInterface) => queryInterface.dropTable('resets')
};
