require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const { NODE_ENV, CLIENT_ORIGIN , DB_URL} = require('./config')

const contentRouter = require('./content-router')
const postsRouter = require('./posts-router/posts-router')
const app = express()
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';
  const knex = require('knex')

  const db = knex({
    client: 'pg',
    connection: DB_URL,
  })
  console.log('knex and driver installed correctly')
  app.set('db', db)
  

  
app.use(morgan(morganOption))
app.use(helmet())
app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);
app.use(postsRouter)
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
app.get('/', (req, res) => {
   res.send('Hello, world!')
 })

module.exports = app