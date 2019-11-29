module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('accommodations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    noOfRooms: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    destinationId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'destinations',
        key: 'id'
      }
    },
    timesVisited: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    likes: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    unlikes: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    addOn: {
      type: Sequelize.STRING,
      allowNull: true
    },
    available: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    images: {
      type: Sequelize.ARRAY(Sequelize.STRING(2033)),
      defaultValue: [],
      allowNull: false
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
    },
    rating: {
      allowNull: false,
      type: Sequelize.FLOAT,
      defaultValue: 0
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('accommodations')
};
