module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('departments', [{
    name: 'IT',
    managerId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'ACCOUNTS',
    managerId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'ADMINISTARTION',
    managerId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'HUMAN RESOURCES',
    managerId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),
  down: (queryInterface) => queryInterface.bulkDelete('departments', null, {})
};
