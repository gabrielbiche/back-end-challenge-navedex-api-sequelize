'use strict'

export default {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Projects',
      [
        {
          user_id: 1,
          name: 'Projeto muito bom'
        },
        {
          user_id: 1,
          name: 'Projeto realmente bom'
        },
        {
          name: 'Projeto bom',
          user_id: 1
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Projects', null, {})
  }
}
