import { Unauthorized, verifyJWTToken } from '../helpers'
import db from '../models'

const Users = db.Users

export const authenticationMiddleware = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) throw new Unauthorized()

  const token = authorization.split(' ')[1]
  const { id } = verifyJWTToken(token)
  const user = await Users.findOne({ where: { id } })

  if (!user) throw new Unauthorized()

  const { password, ...loggerUser } = user
  req.user = loggerUser

  next()
}
