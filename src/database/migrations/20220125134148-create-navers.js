'use strict'
export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Navers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      birthdate: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      admission_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      job_role: {
        allowNull: false,
        type: Sequelize.STRING(255)
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
    await queryInterface.dropTable('Navers')
  }
}
