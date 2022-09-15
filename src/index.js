import 'express-async-errors'
import express from 'express'

import { PORT } from './config'
import routes from './routes'
import { errorHandlingMiddleware } from './middleware'

const app = express()

app.use(express.json())
app.use(routes)
app.use(errorHandlingMiddleware)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
