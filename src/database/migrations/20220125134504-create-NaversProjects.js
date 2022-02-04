'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('NaversProjects', {
      naver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Navers', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Projects', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('NaversProjects')
  }
}
