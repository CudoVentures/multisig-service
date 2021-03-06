const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const OpenApiValidator = require('express-openapi-validator')
const schema = require('./swagger.json')
require('dotenv').config()

// Set up the express app
const app = express()

// Log requests to the console.
app.use(logger('dev'))
app.use(
  cors({
    origin: process.env.MULTISIG_CLIENT_URL
  })
)
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Setup a default catch-all route that sends back a welcome message in JSON format.

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(schema))

app.use(
  OpenApiValidator.middleware({
    apiSpec: schema,
    validateResponses: true
  })
)

require('./routes')(app)

app.use((error, req, res, next) => {
  const status = error.status || 500
  const message = error.message
  res.status(status).json({ error: message })
  next()
})

module.exports = app
