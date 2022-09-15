require('dotenv/config.js')

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
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

