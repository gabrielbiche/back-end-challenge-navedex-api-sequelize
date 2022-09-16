'use strict'
import bcrypt from 'bcrypt'

export default {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'beltrano@domain.com',
          password: await bcrypt.hash('12345678', 12),
        },
        {
          email: 'gabriel@domain.com',
          password: await bcrypt.hash('12345678', 12),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}
