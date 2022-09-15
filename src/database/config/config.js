const env = require('../../config')

module.exports = {
  development: {
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username: '',
    password: '',
    database: '',
    host: '',
    port: '',
    dialect: '',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: '',
    password: '',
    database: '',
    host: '',
    port: '',
    dialect: '',
    dialectOptions: {
      bigNumberStrings: true
    }
  }
}
