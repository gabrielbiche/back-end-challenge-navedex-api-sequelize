import { Router } from 'express'

import users from './users-router'
import navers from './navers-router'
import projects from './projects-router'

const router = Router()

router.use(users)
router.use(navers)
router.use(projects)

export default router
