import jwt from 'jsonwebtoken'

import { ACCESS_SECRET, ACCESS_EXPIRES } from '.././config'

export const generateJWTToken = id =>
  jwt.sign({ id: id }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES })

export const verifyJWTToken = token => jwt.verify(token, ACCESS_SECRET)
