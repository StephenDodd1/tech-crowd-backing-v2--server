const express = require('express');
require('dotenv').config();
//const contentService = require('./content-service')
const contentRouter = express.Router();
const jsonBodyParser = express.json();
const POSTS = require('./test-posts.json');

const users = [
   {
      userId: 'user1',
      username: 'SteDo',
      password: '1234',
      fn: 'Ste',
      ln: 'Do',
      dob: '1966-07-15',
      email: 'stedo@ste.do'
   },
   {
      userId: 'user2',
      username: 'randocomando',
      password: 'ABCD',
      fn: 'Steve',
      ln: 'Rando',
      dob: '1966-07-15',
      email: 'rando@coman.do'
   },
   {
      userId: 'user3',
      username: 'mandoRan',
      password: 'Fando',
      fn: 'Steve',
      ln: 'Mando',
      dob: '1966-07-15',
      email: 'mando@domo.man'
   },
];
const posts = [
   {
      postId: 'RED',
      userId: 'StephenDodd1',
      title: 'Yellur',
      content: 'A Golden Retriever Dog, or a Labrador Retriever?',
      type: 'Technology',
      datePosted: '2011-07-15'
   }
];
const comments = [
   {
      commentId: 'com1',
      postId: 'RED',
      userId: 'StephenDodd1',
      comment: 'A Golden Retriever Dog, or a Labrador Retriever?',
      commentDate: '2011-07-15'
   },
   {
      commentId: 'com2',
      postId: 'YELLUR',
      userId: 'StephenDodd1',
      comment: 'A Golden Retriever Dog, or a Labrador Retriever?',
      commentDate: '2011-07-15'
   },   
   {
      commentId: 'com3',
      postId: 'GREEN',
      userId: 'StephenDodd1',
      comment: 'A Golden Retriever Dog, or a Labrador Retriever?',
      commentDate: '2011-07-15'
   },   
   {
      commentId: 'com4',
      postId: 'ORANGE',
      userId: 'StephenDodd1',
      comment: 'A Golden Retriever Dog, or a Labrador Retriever?',
      commentDate: '2011-07-15'
   }
];

contentRouter
   .route('/content/users')
   .get((req,res) => {
      users.map(p => p)
      res.send(users)
   })

contentRouter
   .route('/content/users/:userId')
   .get((req,res) => {
      const user = users.filter(user => user.userId == req.params.userId)
      res.json(user)
   })

contentRouter
   .route('/content/posts')
   .get((req,res) => {
      const posts = POSTS.map(p => p);
      res.json(posts)
   })

contentRouter
   .route('/content/comments')
   .get((req,res) => {
      const allComments = comments.map(p => p);
      res.json(allComments)
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
   .route('/content/:postId/comments')
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
   .route('/content/posts/:postId')
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

contentRouter
   .route('/content/comments/:commentId')
   .delete(jsonBodyParser,(req,res) => {
      let commentIndex = comments.findIndex(a => a.commentId == req.params.commentId)
      comments.splice(commentIndex, 1)
      res.status(204).end()
   })


module.exports = contentRouter