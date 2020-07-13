const express = require('express');
require('dotenv').config();
//const contentService = require('./content-service')
const contentRouter = express.Router();
const jsonBodyParser = express.json();
const POSTS = require('./test-posts.json');

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

module.exports = contentRouter