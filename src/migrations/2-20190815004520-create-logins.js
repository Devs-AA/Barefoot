
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('logins', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'email',
      }
    },
    password: {
      type: Sequelize.STRING
    },
    lastLogin: {
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
  down: (queryInterface) => queryInterface.dropTable('logins')
};
