module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('departments', [{
    name: 'IT',
    managerId: 11,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'ACCOUNTS',
    managerId: 12,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'ADMINISTARTION',
    managerId: 13,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'HUMAN RESOURCES',
    managerId: 14,
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),
  down: (queryInterface) => queryInterface.bulkDelete('departments', null, {})
};
