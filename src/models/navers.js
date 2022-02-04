'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Navers extends Model {
    static associate(models) {
      Navers.belongsTo(models.Users, { foreignKey: 'user_id' })
      Navers.belongsToMany(models.Projects, {
        through: 'NaversProjects',
        as: 'projects',
        foreignKey: 'naver_id'
      })
    }
  }
  Navers.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Please enter the name' },
          notNull: { msg: 'Please enter the name' },
          len: { args: [4, 256], msg: 'The name must contain at least 4 characters' }
        }
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Please enter the birthdate' },
          notNull: { msg: 'Please enter the birthdate' }
        }
      },
      admission_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Please enter the admission date' },
          notNull: { msg: 'Please enter the admission date' }
        }
      },
      job_role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Please enter the job role' },
          notNull: { msg: 'Please enter the job role' },
          len: { args: [4, 256], msg: 'The job role must contain at least 4 characters' }
        }
      }
    },
    {
      sequelize,
      modelName: 'Navers'
    }
  )
  return Navers
}
