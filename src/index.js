const express = require('express')

require('dotenv').config()
require('./helpers/passport')

const routes = require('./routes')

const app = express()
const port = 3000

app.use(express.json())
app.use(routes)

app.listen(port, () => console.log(`Server is running on ${port}`))
