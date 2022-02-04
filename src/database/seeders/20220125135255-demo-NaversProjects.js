'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'NaversProjects',
      [
        {
          naver_id: 1,
          project_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          naver_id: 1,
          project_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          naver_id: 1,
          project_id: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('NaversProjects', null, {})
  }
}
