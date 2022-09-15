import { Router } from 'express'

import usersRouter from './users-router'
import naversRouter from './navers-router'
import projectsRouter from './projects-router'

const app = new Router()

app.use(usersRouter)
app.use(naversRouter)
app.use(projectsRouter)

export default app
