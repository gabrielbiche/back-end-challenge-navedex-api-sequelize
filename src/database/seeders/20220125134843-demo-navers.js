'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Navers',
      [
        {
          user_id: 1,
          name: 'Fulano',
          birthdate: '1999-05-15',
          admission_date: '2020-06-12',
          job_role: 'Desenvolvedor',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 1,
          name: 'Ciclano',
          birthdate: '1992-10-28',
          admission_date: '2018-06-12',
          job_role: 'Desenvolvedor',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Navers', null, {})
  }
}
