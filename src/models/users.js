'use strict'
import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Navers, { foreignKey: 'user_id' })
      Users.hasMany(models.Projects, { foreignKey: 'user_id' })
    }
  }
  Users.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: 'Email must be unique' },
        validate: {
          isEmail: { msg: 'Invalid e-mail data type' },
          notEmpty: { msg: 'Please enter a email' },
          notNull: { msg: 'Please enter a email' }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Please enter a password' },
          notNull: { msg: 'Please enter a password' },
          len: {
            args: [8, 256],
            msg: 'The password must contain at least 8 characters'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Users',
    }
  )
  return Users
}
