const express = require('express');
require('dotenv').config();
//const contentService = require('./content-service')
const contentRouter = express.Router();
const jsonBodyParser = express.json();
const POSTS = require('./test-posts.json');
const { v4: uuid } = require('uuid')

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
const comments = [
   {
      commentId: 'com1',
      postId: 'Jk!3',
      userId: 'StephenDodd1',
      comment: 'Did you forget your capital letter',
      commentDate: '2011-07-15'
   },
   {
      commentId: 'com2',
      postId: 'Jk!4',
      userId: 'StephenDodd1',
      comment: 'Good work.',
      commentDate: '2011-07-15'
   },   
   {
      commentId: 'com3',
      postId: 'Jk!2',
      userId: 'StephenDodd1',
      comment: 'Take an english class maybe??',
      commentDate: '2011-07-15'
   },   
   {
      commentId: 'com4',
      postId: 'Jk!4',
      userId: 'StephenDodd1',
      comment: 'A Water Dog, or a Mountain Dog?',
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
   .route('/content/:postId/comments')
   .get((req,res) => {
      const filteredComments = comments.filter(post => post.postId == req.params.postId)
      const allComments = filteredComments.map(p => p);
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
      console.log(newPost)
      POSTS.push(newPost)
      res.send(POSTS[POSTS.length-1])
   })

contentRouter
   .route('/content/:postId/comment')
   .post(jsonBodyParser, (req,res) => {
      const { comment } = req.body;
      const userId = 1;
      const postId = req.params.postId;
      const commentDate = `${new Date()}`;
      const commentId = uuid();
      const newComment = {
         commentId, 
         postId, 
         userId, 
         comment, 
         commentDate
      };
      console.log(newComment)
      comments.push(newComment)
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
      console.log(postUpdate)
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
      res.json(POSTS[POSTS.length-1])
   })

contentRouter
   .route('/content/comments/:commentId')
   .delete(jsonBodyParser,(req,res) => {
      let commentIndex = comments.findIndex(a => a.commentId == req.params.commentId)
      comments.splice(commentIndex, 1)
      res.status(204).end()
   })


module.exports = contentRouter