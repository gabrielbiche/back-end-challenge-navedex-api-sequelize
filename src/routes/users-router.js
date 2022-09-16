import { Router } from 'express'

import usersController from '../controllers/users-controller'

const routes = Router()

routes.post('/users/signup', usersController.signup)
routes.post('/users/login', usersController.login)

export default routes
