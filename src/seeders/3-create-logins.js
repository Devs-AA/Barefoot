const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('logins', [
    {
      email: 'youremail10@andela.com',
      password: '$2a$10$yvbeeJa5YVri0P9R.BLrSOXDJlo09v22tyZz0ZIuJEFEDrJggvgzm',
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'youremail20@andela.com',
      password: '$2a$10$yvbeeJa5YVri0P9R.BLrSOXDJlo09v22tyZz0ZIuJEFEDrJggvgzm',
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'example@gmail.com',
      password: '$2a$10$yvbeeJa5YVri0P9R.BLrSOXDJlo09v22tyZz0ZIuJEFEDrJggvgzm',
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'example1@gmail.com',
      password: '$2a$10$yvbeeJa5YVri0P9R.BLrSOXDJlo09v22tyZz0ZIuJEFEDrJggvgzm',
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'requester1@gmail.com',
      password: '$2b$10$fEyEC31mVK0NmMuyP290/u2kQmmCR.yfdtWtVYh4QQVVEkeVEo5iC',
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'requester2@gmail.com',
      password: '$2b$10$fEyEC31mVK0NmMuyP290/u2kQmmCR.yfdtWtVYh4QQVVEkeVEo5iC',
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'requester3@gmail.com',
      password: '$2b$10$fEyEC31mVK0NmMuyP290/u2kQmmCR.yfdtWtVYh4QQVVEkeVEo5iC',
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  {}),
  down: (queryInterface) => queryInterface.bulkDelete('logins', null, {})
};
