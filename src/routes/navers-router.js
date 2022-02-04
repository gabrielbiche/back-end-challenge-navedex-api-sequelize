const { Router } = require('express')

const { naversController } = require('../controllers')
const authMiddleware = require('../middleware/auth-middleware')

const router = new Router()

router.get('/users/:user_id/navers', authMiddleware.bearer, naversController.index)
router.get('/users/:user_id/navers/:naver_id', authMiddleware.bearer, naversController.show)
router.post('/users/:user_id/navers', authMiddleware.bearer, naversController.store)
router.put('/users/:user_id/navers/:naver_id', authMiddleware.bearer, naversController.update)
router.delete('/users/:user_id/navers/:naver_id', authMiddleware.bearer, naversController.delete)

module.exports = router
