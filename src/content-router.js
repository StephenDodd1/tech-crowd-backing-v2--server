const express = require('express');
require('dotenv').config();
//const contentService = require('./content-service')
const contentRouter = express.Router();
const jsonBodyParser = express.json();
const POSTS = require('./test-posts.json');
const app = require('./app');

const users = [];
const posts = [
   {postId: 'RED',
   userId: 'StephenDodd1',
   title: 'Yellur',
   content: 'A Golden Retriever Dog, or a Labrador Retriever?',
   type: 'Technology',
   datePosted: '2011-09-23'
}
];

contentRouter
   .route('/content/users')
   .get((req,res) => {
      const userName = req.query.userName;
      res.send(userName)
   })

contentRouter
   .route('/content/posts')
   .get((req,res) => {
      const posts = POSTS.map(p => p);
      res.json(posts)
   })

contentRouter
.route('/content/users')
.post(jsonBodyParser, (req,res) => {
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
   res.json(users[users.length-1])
})

contentRouter
   .route('/content/posts')
   .post(jsonBodyParser, (req,res) => {
      const { postId, userId, title, content, type, datePosted } = req.body;
      const newPost = {
         postId, 
         userId, 
         title, 
         content, 
         type, 
         datePosted
      }
      posts.push(newPost)
      res.send(posts[posts.length-1])
   })

contentRouter
   .route(`/content/posts/:postId`)
   .patch(jsonBodyParser, (req,res,next) => {
      const { title, content, type } = req.body;
      const postUpdate = { 
         title, 
         content, 
         type 
      }
      let postIndex = posts.findIndex((a) => a.post_id == req.params.post_id)
         if(title) {
            posts[postIndex].title = postUpdate.title;
         }
         if(content) {
            posts[postIndex].content = postUpdate.content;
         }
         if(type) {
            posts[postIndex].type = postUpdate.type;
         }
      res.json(posts[posts.length-1])
   })




module.exports = contentRouter