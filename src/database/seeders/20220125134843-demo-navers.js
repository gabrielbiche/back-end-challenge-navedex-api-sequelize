'use strict'

export default {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Navers',
      [
        {
          user_id: 1,
          name: 'Fulano',
          birthdate: '1999-05-15',
          admission_date: '2020-06-12',
          job_role: 'Desenvolvedor'
        },
        {
          user_id: 1,
          name: 'Ciclano',
          birthdate: '1992-10-28',
          admission_date: '2018-06-12',
          job_role: 'Desenvolvedor'
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Navers', null, {})
  }
}
