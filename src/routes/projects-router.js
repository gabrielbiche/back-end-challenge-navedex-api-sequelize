import { Router } from 'express'

import projectsController from '../controllers/projects-controller'
import { authenticationMiddleware } from '../middleware'

const routes = Router()

routes.use(authenticationMiddleware)
routes.get('/users/:user_id/projects', projectsController.index)
routes.get('/users/:user_id/projects/:project_id', projectsController.show)
routes.post('/users/:user_id/projects', projectsController.store)
routes.put('/users/:user_id/projects/:project_id', projectsController.update)
routes.delete('/users/:user_id/projects/:project_id', projectsController.destroy)

export default routes
