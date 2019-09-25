module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('destinations', [
    {
      name: 'Epic Tower',
      country: 'Nigeria',
      city: 'Lagos',
      address: '77 Ikorodu road, Lagos, Nigeria',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Might Tower',
      country: 'Uganda',
      city: 'unknown',
      address: 'unknown',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Peak Tower',
      country: 'Kenya',
      city: 'Kampala',
      address: 'unknown',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Mount Will',
      country: 'Tanzania',
      city: 'unknown',
      address: 'unknown',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('destinations', null, {})
};
