import 'express-async-errors'
import 'dotenv/config'
import express from 'express'

import './helpers/passport'

import routes from './routes'
import { errorHandlingMiddleware } from './middleware'

const app = express()
const port = Number(process.env.PORT)

app.use(express.json())
app.use(routes)
app.use(errorHandlingMiddleware)

app.listen(port, () => console.log(`Server is running on ${port}`))
