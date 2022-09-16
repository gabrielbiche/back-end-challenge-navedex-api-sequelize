import 'express-async-errors' 
import express from 'express' 

import routes from './routes'
import { errorHandlingMiddleware } from './middleware'

const app = express()

app.use(express.json())
app.use(routes)
app.use(errorHandlingMiddleware)

export default app