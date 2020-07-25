const express = require("express");
const CommentsService = require("./comments-service");
const commentsRouter = express.Router();
const jsonBodyParser = express.json();
const Router = require("router");
const xss = require('xss')

const serializeComments = (comment) => ({
  commentId: comment.comment_id,
  userId: comment.userid,
  postId: comment.post_id,
  comment: xss(comment.comment),
  comment_date: comment.comment_date,
});

commentsRouter.route("/api/:postid/comments").get((req, res, next) => {
  const postId = req.params.postid;
  const knex = req.app.get("db");
  CommentsService.getAllComments(knex, postId).then((comments) => {
      if(!comments) {
        return res.status(404).json({
          error: { message: "Comments not available"}
        })
      }
    res.status(200).send().json(comments.map(serializeComments));
  });
});

commentsRouter
  .route("/api/:postId/comment")
  .post(jsonBodyParser, (req, res, next) => {
    const post_id = req.params.postId;
    const userid = 1;
    const { comment } = req.body;
    const newComment = {
      post_id,
      userid,
      comment,
    };
    const knex = req.app.get("db");
    CommentsService.createComment(knex, newComment)
      .then((comment) => {
        if (!comment) {
          return res.status(404).json({
            error: { message: `Comment doesn't exist` },
          });
        }
        res.status(200).send()//.json(comment);
      })
      .catch(next);
  });

commentsRouter.route("/api/comments/:comment_id").delete((req, res, next) => {
  const comment_id = req.params.comment_id;
  const knex = req.app.get("db");
  CommentsService.deleteComment(knex, comment_id)
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({
          error: { message: "Comment was not deleted" },
        });
      }
      res.status(200).send().json(comment, "comment was deleted");
    })
    .catch(next);
});
module.exports = commentsRouter;
