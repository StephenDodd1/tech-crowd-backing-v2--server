const express = require('express');
const CommentsService = require('./comments-service')
const commentsRouter = express.Router();
const jsonBodyParser = express.json();
const Router = require('router')

const serializeComments = comment => ({
   commentId: comment.comment_id,
   userId: comment.userid,
   postId: comment.post_id,
   comment: comment.comment,
   comment_date: comment.comment_date,
})      /*const filteredComments = comments.filter(post => post.postId == req.params.postId.toLowerCase())
const allComments = filteredComments.map(p => p);*/

commentsRouter
   .route('/api/:postid/comments')
   .get((req, res, next) => {
      const postId = req.params.postId;
      CommentsService.getAllComments(req.app.get('db'), postId)
      .then(comments => {
         res.json(comments.map(serializeComments))})
   })

module.exports = commentsRouter