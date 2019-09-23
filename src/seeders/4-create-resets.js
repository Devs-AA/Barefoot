
module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('resets', [{
    email: 'youremail10@andela.com',
    resetToken: '$2a$10$Yc4fNidn3ih0Z0wRajFhq.AwneQLYR2RWWYQT7PGJdJj4UN1BGJ1K',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'youremail20@andela.com',
    resetToken: '$2a$10$Yc4fNidn3ih0Z0wRajFhq.AwneQLYR2RWWYQT7PGJdJj4UN1BGJ1K2',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('resets', null, {})
};
