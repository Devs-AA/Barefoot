module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('accommodations', [
    {
      name: 'Spring Hotels',
      noOfRooms: 2,
      type: 'standard',
      timesVisited: 1,
      destinationId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Grace Hotels',
      noOfRooms: 1,
      type: 'standard',
      timesVisited: 1,
      destinationId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Sunshine Hotels',
      noOfRooms: 2,
      type: 'standard',
      timesVisited: 1,
      destinationId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Michai Hotels',
      noOfRooms: 4,
      type: 'suite',
      timesVisited: 1,
      destinationId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Sinon Hotels',
      noOfRooms: 3,
      type: 'suite',
      timesVisited: 4,
      destinationId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('accommodations', null, {})
};
