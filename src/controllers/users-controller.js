import bcrypt from 'bcrypt'

import { generateJWTToken, BadRequest } from '../helpers'
import db from '../models'

const Users = db.Users

export const signup = async (req, res) => {
  const { email, password } = req.body

  const userExists = await Users.findOne({ where: { email } })

  if (userExists)
    throw new BadRequest('There is already a user registered with this email')

  const hashPassword = await bcrypt.hash(password, 12)

  await Users.create({ email, password: hashPassword })

  const user = await Users.findOne({
    where: { email },
    attributes: ['id', 'email']
  })

  return res.status(201).json(user)
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await Users.findOne({ where: { email } })

  if (!user) throw new BadRequest('Invalid email or password')

  const verifyPassword = await bcrypt.compare(password, user.password)

  if (!verifyPassword) throw new BadRequest('Invalid email or password')

  const token = generateJWTToken(user.id)

  res.set('authorization', token).status(204).end()
}

export default {
  signup,
  login
}
