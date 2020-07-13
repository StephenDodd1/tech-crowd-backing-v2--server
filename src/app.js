require('dotenv').config()
const knex = require('knex')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const { CLIENT_ORIGIN } = require('./config');
const app = express();
const contentRouter = require('./content-router')
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';
const db = knex({
   client: 'pg',
   connection: process.env.DB_URL,
})

app.set('db', db)

app.use(morgan(morganOption))
app.use(helmet())
app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);
app.use(contentRouter)
app.use(function errorHandler(error, req, res, next) {
   let response
   if (NODE_ENV === 'production') {
      respone = { error: { message: 'server error'}}
   } else {
      console.error(error)
      response = {message: error.message, error }
   }
   res.status(500).json(response)
})

module.exports = app