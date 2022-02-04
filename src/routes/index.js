const { Router } = require('express')

const usersRouter = require('./users-router')
const naversRouter = require('./navers-router')
const projectsRouter = require('./projects-router')

const app = new Router()

app.use(usersRouter)
app.use(naversRouter)
app.use(projectsRouter)

module.exports = app
