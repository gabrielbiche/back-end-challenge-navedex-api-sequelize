const jwt = require('jsonwebtoken')

exports.generateJWTToken = user =>
  jwt.sign({ id: user.id }, process.env.ACCESS_SECRET, {
    expiresIn: '15m'
  })
