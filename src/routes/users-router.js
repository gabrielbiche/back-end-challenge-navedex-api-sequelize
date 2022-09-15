import { Router } from 'express'

import usersController from '../controllers/users-controller'
import authMiddleware from '../middleware/auth-middleware'

const router = new Router()

router.post('/users/signup', usersController.signup)
router.post('/users/login', authMiddleware.local, usersController.login)

export default router
