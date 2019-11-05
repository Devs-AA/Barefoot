module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('accommodations', [
    {
      name: 'Spring Hotels',
      noOfRooms: 2,
      type: 'standard',
      timesVisited: 1,
      destinationId: 1,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      price: 20000,
      addOn: 'Lorem ipsum dolor sit amet consectetur adipisicing elitsit amet consectetur adipisicing elit',
      address: '122, Luxury lane. GRA Ikeja, Lagos',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Grace Hotels',
      noOfRooms: 1,
      type: 'standard',
      timesVisited: 1,
      destinationId: 2,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      price: 20000,
      addOn: 'Lorem ipsum dolor sit amet consectetur adipisicing elitsit amet consectetur adipisicing elit',
      address: '122, Luxury lane. GRA Ikeja, Lagos',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Sunshine Hotels',
      noOfRooms: 2,
      type: 'standard',
      timesVisited: 1,
      destinationId: 3,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      price: 20000,
      addOn: 'Lorem ipsum dolor sit amet consectetur adipisicing elitsit amet consectetur adipisicing elit',
      address: '126, Luxury lane. GRA Ikeja, Lagos',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Michai Hotels',
      noOfRooms: 4,
      type: 'suite',
      timesVisited: 1,
      destinationId: 4,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      price: 20000,
      addOn: 'Lorem ipsum dolor sit amet consectetur adipisicing elitsit amet consectetur adipisicing elit',
      address: '129, Luxury lane. GRA Ikeja, Lagos',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Sinon Hotels',
      noOfRooms: 3,
      type: 'suite',
      timesVisited: 4,
      destinationId: 4,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      price: 20000,
      addOn: 'Lorem ipsum dolor sit amet consectetur adipisicing elitsit amet consectetur adipisicing elit',
      address: '22, Luxury lane. GRA Ikeja, Lagos',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('accommodations', null, {})
};
