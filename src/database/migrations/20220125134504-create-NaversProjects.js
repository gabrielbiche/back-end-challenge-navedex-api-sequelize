'use strict'

export default {
  up: async (queryInterface, Sequelize) => {
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
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('NaversProjects')
  }
}
