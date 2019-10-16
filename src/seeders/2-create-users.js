const faker = require('faker');


module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('users', [
    {
      username: 'iammarusoft',
      firstName: 'alimi',
      lastName: 'marusoft',
      email: 'example@gmail.com',
      isVerified: true,
      roleId: 1,
      emailNotification: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'iammarusoft1',
      firstName: 'alimi1',
      lastName: 'marusoft1',
      email: 'example1@gmail.com',
      roleId: 5,
      isVerified: false,
      emailNotification: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'iammarusoft2',
      firstName: 'alimi2',
      lastName: 'marusoft2',
      email: 'example2@gmail.com',
      roleId: 5,
      isVerified: true,
      emailNotification: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'iammarusoft3',
      firstName: 'alimi3',
      lastName: 'marusoft3',
      email: 'example3@gmail.com',
      roleId: 5,
      isVerified: false,
      emailNotification: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'iammarusoft4',
      firstName: 'alimi4',
      lastName: 'marusoft4',
      email: 'example4@gmail.com',
      roleId: 5,
      isVerified: true,
      emailNotification: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'youremail10@andela.com',
      roleId: 4,
      emailNotification: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'youremail20@andela.com',
      roleId: 5,
      emailNotification: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: process.env.YOUR_EMAIL,
      roleId: 3,
      emailNotification: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      roleId: 1,
      email: 'barefoot@gmail.com',
      emailNotification: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      roleId: 1,
      email: process.env.ADMIN_EMAIL,
      emailNotification: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'walesadeks@gmail.com',
      roleId: 4,
      emailNotification: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'barefoot1@gmail.com',
      roleId: 4,
      emailNotification: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'barefoot2@gmail.com',
      roleId: 4,
      emailNotification: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'barefoot3@gmail.com',
      roleId: 4,
      emailNotification: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'requester1@gmail.com',
      roleId: 5,
      emailNotification: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'requester2@gmail.com',
      roleId: 5,
      emailNotification: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'requester3@gmail.com',
      roleId: 5,
      emailNotification: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),
  down: (queryInterface) => queryInterface.bulkDelete('users', null, {})
};
