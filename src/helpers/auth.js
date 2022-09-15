import jwt from 'jsonwebtoken'

export const generateJWTToken = user =>
  jwt.sign({ id: user.id }, process.env.ACCESS_SECRET, {
    expiresIn: '15m'
  })
