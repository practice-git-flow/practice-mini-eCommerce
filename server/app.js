require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routes)


app.listen(port, () => console.log(`App running on  http://localhost:${port}`))