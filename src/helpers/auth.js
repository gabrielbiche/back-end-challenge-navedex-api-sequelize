import jwt from 'jsonwebtoken'

import { ACCESS_SECRET } from '.././config'

export const generateJWTToken = user =>
  jwt.sign({ id: user.id }, ACCESS_SECRET, {
    expiresIn: '15m'
  })
