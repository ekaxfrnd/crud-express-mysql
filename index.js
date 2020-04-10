const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
require('dotenv').config()

const conn = require('./config/db')
const userRoutes = require('./routes/userRoutes')

const app = express()
const port = process.env.SERVER_PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'))

app.use('/user', userRoutes)

app.listen(port, () => console.log(`Hosted on port: ${port}`))