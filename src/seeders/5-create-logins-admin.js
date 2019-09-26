/* eslint-disable  */
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

function hashPassword () {
  return bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);  
}

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('logins', [
    {
      email: process.env.ADMIN_EMAIL,
      lastLogin: new Date(),
      password:  hashPassword(),
      createdAt: new Date(),
      updatedAt: new Date()
    }],
    {}),
  down: (queryInterface) => queryInterface.bulkDelete('logins', null, {})
};



