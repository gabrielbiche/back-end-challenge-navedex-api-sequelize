const { Router } = require('express')

const { usersController } = require('../controllers')
const authMiddleware = require('../middleware/auth-middleware')

const router = new Router()

router.post('/users/signup', usersController.signup)
router.post('/users/login', authMiddleware.local, usersController.login)

module.exports = router
