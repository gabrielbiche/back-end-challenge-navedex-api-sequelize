'use strict'

export default {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Projects',
      [
        {
          user_id: 1,
          name: 'Projeto muito bom',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 1,
          name: 'Projeto realmente bom',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Projeto bom',
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Projects', null, {})
  }
}
