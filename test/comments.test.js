require('dotenv').config()
const { expect } = require('chai');
const commentsRouter = require('../src/comments/comments-router')
const app = require('../src/app')

describe('comment endpoints test', () => {
   let db 
   before('make knex instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.DB_TEST,
      })
   commentsRouter.set('db', db)
   after('disconnect from db', () => db.destroy())
   it('GET endpoint for comments works', () => {
      supertest(commentsRouter)
         .get('/api/:postid/comments', postid)
         .expect(200, 'Hello Express!');
      })
   })
})