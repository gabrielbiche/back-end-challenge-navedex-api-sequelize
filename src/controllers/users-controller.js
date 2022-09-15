import { generateJWTToken, BadRequest } from '../helpers'

import db from '../models'

const Users = db.Users

export const signup = async (req, res) => {
  const { email, password } = req.body
  const repeatedEmail = await Users.findOne({ where: { email } })

  if (repeatedEmail) {
    throw new BadRequest('There is already a user registered with this email.')
  }

  await Users.create({ email, password })

  const user = await Users.findOne({
    where: { email },
    attributes: ['id', 'email']
  })
  
  return res.status(201).json(user)
}

export const login = async (req, res) => {
  
  const token = generateJWTToken(req.user)
  
  res.set('Authorization', token).status(204).end()
}

export default {
  signup,
  login
}
