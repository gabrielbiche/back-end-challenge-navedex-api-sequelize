const { Router } = require('express')

const { projectsController } = require('../controllers')
const authMiddleware = require('../middleware/auth-middleware')

const router = new Router()

router.get('/users/:user_id/projects', authMiddleware.bearer, projectsController.index)
router.get('/users/:user_id/projects/:project_id', authMiddleware.bearer, projectsController.show)
router.post('/users/:user_id/projects', authMiddleware.bearer, projectsController.store)
router.put('/users/:user_id/projects/:project_id', authMiddleware.bearer, projectsController.update)
router.delete('/users/:user_id/projects/:project_id', authMiddleware.bearer, projectsController.delete)

module.exports = router
