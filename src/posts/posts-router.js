const express = require('express');
const PostsService = require('./posts-service')
const postsRouter = express.Router();
const jsonBodyParser = express.json();
const Router = require('router')

const serializePosts = post => ({
   postId: post.post_id,
   userId: post.userid,
   title: post.title,
   content: post.content,
   type: post.type,
   date_posted: post.date_posted,
})

postsRouter
   .route('/api/posts/')
   .get((req, res, next) => {
      const knex = req.app.get('db');
      PostsService.getLatestPosts(knex)
      .then(posts => {
         res.json(posts.map(serializePosts))})
   })

module.exports = postsRouter