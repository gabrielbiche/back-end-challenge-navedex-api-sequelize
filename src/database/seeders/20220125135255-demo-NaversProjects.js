'use strict'

export default {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'NaversProjects',
      [
        {
          naver_id: 1,
          project_id: 1
        },
        {
          naver_id: 1,
          project_id: 2
        },
        {
          naver_id: 1,
          project_id: 3
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('NaversProjects', null, {})
  }
}
