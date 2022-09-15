import passport from 'passport'

export default {
  local: (req, res, next) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error) res.status(401).json({ Message: error.message })
      if (!user) res.status(401).json({ Message: error.message })
      req.user = user
      return next()
    })(req, res, next)
  },

  bearer: (req, res, next) => {
    passport.authenticate('bearer', { session: false }, (error, user, info) => {
      if (error) res.status(500).json({ Message: error.message })
      if (!user) res.status(401).json({ Message: error.message })
      if (error && error.name === 'JsonWebTokenError')
        res.status(401).json({ Message: error.message })
      if (error && error.name === 'TokenExpiredError')
        res.status(401).json({ Message: error.message })
      req.user = user
      return next()
    })(req, res, next)
  }
}
