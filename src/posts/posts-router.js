const express = require("express");
const PostsService = require("./posts-service");
const postsRouter = express.Router();
const jsonBodyParser = express.json();
const Router = require("router");
const { restart } = require("nodemon");

const serializePosts = (post) => ({
  postId: post.post_id,
  userId: post.userid,
  title: post.title,
  content: post.content,
  type: post.type,
  date_posted: post.date_posted,
});

postsRouter.route("/api/posts/").get((req, res, next) => {
  const knex = req.app.get("db");
  PostsService.getLatestPosts(knex).then((posts) => {
    res.json(posts.map(serializePosts));
  });
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
      res.json(post);
    })
    .catch(next);
});

postsRouter.route("/api/posts/:postFilter").get((req, res, next) => {
  const knex = req.app.get("db");
  PostsService.searchPosts(knex, req.params.postFilter).then((posts) => {
    res.json(posts.map(serializePosts));
  });
});
module.exports = postsRouter;
