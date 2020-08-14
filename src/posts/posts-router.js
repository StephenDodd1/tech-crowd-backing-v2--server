const express = require("express");
const PostsService = require("./posts-service");
const postsRouter = express.Router();
const jsonBodyParser = express.json();
const xss = require('xss')

const serializePosts = (post) => ({
  postId: post.post_id,
  userId: post.username,
  title: xss(post.title),
  content: xss(post.content),
  type: post.type,
  date_posted: post.date_posted,
});

postsRouter.route("/api/posts/").get((req, res, next) => {
  const knex = req.app.get("db");
  PostsService.getLatestPosts(knex).then((posts) => {
    if(!posts) {
      res.status(404).json({
        error: {message: "did not get post"}
      })
    }
    console.log(posts)
    res.status(200).json(posts.map(serializePosts));
  })
  .catch(next)
});

postsRouter.route("/api/posts").post(jsonBodyParser, (req, res, next) => {
  const knex = req.app.get("db");
  const { userid, title, content, type } = req.body;
  const newPost = {
    userid,
    title,
    content,
    type,
  };
  PostsService.createPost(knex, newPost)
    .then((post) => {
      if (!post) {
        res.status(404).json({
          error: { message: "post was not created" },
        });
      }
      res.status(200).json(post);
    })
    .catch(next);
});

postsRouter.route("/api/posts/:postFilter").get((req, res, next) => {
  const knex = req.app.get("db");
  PostsService.searchPosts(knex, req.params.postFilter).then((posts) => {
    res.status(200).json(posts.map(serializePosts));
  });

postsRouter.route("/api/post/:postid").patch(jsonBodyParser, (req,res,next) => {
  const knex = req.app.get("db");
  const { title, content, type } = req.body;
  const postId = Number(req.params.postid);
  console.log(postId)
  const postUpdate = {
      title, 
      content, 
      type 
  }
  console.log('...', postUpdate, 'and ...', postId)
  PostsService.updatePost(knex, postId, postUpdate).then((update) => {
    console.log(postId)
    if(!update) {
      res.status(404).json({
        error: { message: "post was not updated"}
      })
    }
    res.status(200).json(update)
  })
  .catch(next)
})
});
module.exports = postsRouter;
