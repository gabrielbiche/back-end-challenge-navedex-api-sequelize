import express from 'express'

import 'dotenv/config'
import './helpers/passport'

import routes from './routes'

const app = express()
const port = Number(process.env.PORT)

app.use(express.json())
app.use(routes)

app.listen(port, () => console.log(`Server is running on ${port}`))
