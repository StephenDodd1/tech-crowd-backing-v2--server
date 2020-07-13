const express = require('express');
require('dotenv').config();
//const contentService = require('./content-service')
const contentRouter = express.Router();
const jsonBodyParser = express.json();
const POSTS = require('./test-posts.json');

const users = [];

contentRouter
   .route('/content/posts')
   .get((req,res) => {
      const posts = POSTS.map(p => p);
      res.json(posts)
   })

contentRouter
   .route('/content/users')
   .get((req,res) => {
      const userName = req.query.userName;
      res.send(userName)
   })

contentRouter
   .route('/content/users')
   .post(jsonBodyParser, (req,res) => {
      console.log(req.body)
      const { userName, password, fn, ln, dob, email } = req.body;
      const newUser = {
         userName,
         password,
         fn,
         ln,
         dob,
         email
      }
      users.push(newUser);
      console.log(users[0])
      res.json(users)
   })
module.exports = contentRouter