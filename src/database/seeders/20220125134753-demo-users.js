'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'beltrano@domain.com',
          password: '12345678',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'gabriel@domain.com',
          password: '12345678',
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
