const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { Unauthorized } = require('../helpers/errors')
const db = require('../models')

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
        /* Caso utilize seeders descomente a validação validPasswordBd e sua verificação,
          vide seção Observações na documentação para mais informações */
        // const validPasswordBd = password === user.password ? true : false
        // if (!validPasswordBd) throw new Unauthorized('Invalid email or password.')
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
