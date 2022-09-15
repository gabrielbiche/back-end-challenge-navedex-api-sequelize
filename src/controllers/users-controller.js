import { generateJWTToken } from '../helpers/auth'
import { BadRequest } from '../helpers/errors'
import db from '../models'

const Users = db.Users

export const signup = async (req, res) => {
  const { email, password } = req.body
  try {
    const repeatedEmail = await Users.findOne({ where: { email } })
    if (repeatedEmail)
      throw new BadRequest('There is already a user registered with this email.')
    await Users.create({ email, password })
    const user = await Users.findOne({
      where: { email },
      attributes: ['id', 'email']
    })
    return res.status(201).json(user)
  } catch (error) {
    if (error && error instanceof BadRequest) {
      return res.status(error.statusCode).json({ Message: error.message })
    } else if (error && error.name === 'SequelizeValidationError') {
      return res.status(400).json({ Message: error.message })
    }
    res.status(500).json({ Message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const token = generateJWTToken(req.user)
    res.set('Authorization', token).status(204).end()
  } catch (error) {
    return res.status(500).json({ Message: error.message })
  }
}
