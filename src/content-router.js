const express = require('express');
const ContentService = require('./content-service');
const contentRouter = express.Router();
const jsonBodyParser = express.json();





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



module.exports = contentRouter