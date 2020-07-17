const express = require('express');
const ContentService = require('./content-service')
const contentRouter = express.Router();
const jsonBodyParser = express.json();

contentRouter
   .route('/api/users')
   .get((req,res) => {
      users.map(p => p)
      res.send(users)
   })

contentRouter
   .route('/api/users/:userId')
   .get((req,res) => {
      const user = users.filter(user => user.userId == req.params.userId)
      res.json(user)
   })


contentRouter
   .route('/api/:postId/comments')
   .get((req,res) => {
      console.log(req.params)
      const filteredComments = comments.filter(post => post.postId == req.params.postId.toLowerCase())
      const allComments = filteredComments.map(p => p);
      console.log(allComments)
      res.json(allComments)
   })

contentRouter
   .route('/api/users')
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
   .route('/api/posts')
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
   .route('/api/:postId/comments')
   .post(jsonBodyParser, (req,res) => {
      const { commentId, postId, userId, comment, commentDate } = req.body;
      const newComment = {
         commentId, 
         postId, 
         userId, 
         comment, 
         commentDate
      }
      posts.push(newComment)
      res.send(comments[comments.length-1])
   })

contentRouter
   .route('/api/posts/:postId')
   .patch(jsonBodyParser, (req,res,next) => {
      console.log(req.body)
      const { title, content, type } = req.body;
      const postUpdate = { 
         title, 
         content, 
         type 
      }
      console.log(postUpdate, title, content, type)
      let postIndex = POSTS.findIndex((a) => a.postId == req.params.postId)
         if(title) {
            POSTS[postIndex].title = postUpdate.title;
         }
         if(content) {
            POSTS[postIndex].content = postUpdate.content;
         }
         if(type) {
            POSTS[postIndex].type = postUpdate.type;
         }
      res.json(posts[posts.length-1])
   })

contentRouter
   .route('/api/comments/:commentId')
   .delete(jsonBodyParser,(req,res) => {
      let commentIndex = comments.findIndex(a => a.commentId == req.params.commentId)
      comments.splice(commentIndex, 1)
      res.status(204).end()
   })

module.exports = contentRouter