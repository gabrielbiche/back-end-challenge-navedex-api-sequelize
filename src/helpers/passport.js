import passport from 'passport'
import LocalStrategy from 'passport-local'
import BearerStrategy from 'passport-http-bearer'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { Unauthorized } from '../helpers/errors'
import db from '../models'

const Users = db.Users

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    async (email, password, done) => {
      try {
        const user = await Users.findOne({ where: { email } })
        if (!user) throw new Unauthorized('There is no user registered with this email.')
        const validPasswordBcrypt = await bcrypt.compare(password, user.password)
        if (!validPasswordBcrypt) throw new Unauthorized()
        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
)

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const payload = jwt.verify(token, process.env.ACCESS_SECRET)
      const user = await Users.findByPk(payload.id)
      done(null, user)
    } catch (error) {
      done(error)
    }
  })
)
