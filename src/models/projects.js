'use strict'
import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class Projects extends Model {
    static associate(models) {
      Projects.belongsTo(models.Users, { foreignKey: 'user_id' })
      Projects.belongsToMany(models.Navers, {
        through: 'NaversProjects',
        as: 'navers',
        foreignKey: 'project_id'
      })
    }
  }
  Projects.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: 'Please enter the project name' },
          notNull: { msg: 'Please enter the project name' },
          len: { args: [4, 256], msg: 'The project name must contain at least 4 characters' }
        }
      }
    },
    {
      sequelize,
      modelName: 'Projects'
    }
  )
  return Projects
}
