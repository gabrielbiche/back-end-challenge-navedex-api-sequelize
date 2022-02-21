'use strict'
const bcrypt = require('bcrypt')

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'beltrano@domain.com',
          password: await bcrypt.hash('12345678', 12),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'gabriel@domain.com',
          password: await bcrypt.hash('12345678', 12),
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
