import { Router } from 'express'

import naversController from '../controllers/navers-controller'
import { authenticationMiddleware } from '../middleware'

const routes = Router()

routes.use(authenticationMiddleware)
routes.get('/users/:user_id/navers', naversController.index)
routes.get('/users/:user_id/navers/:naver_id', naversController.show)
routes.post('/users/:user_id/navers', naversController.store)
routes.put('/users/:user_id/navers/:naver_id', naversController.update)
routes.delete('/users/:user_id/navers/:naver_id', naversController.destroy)

export default routes
