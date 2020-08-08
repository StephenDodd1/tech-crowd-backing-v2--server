const CommentsService = {
   getAllComments(knex, postId) {
      return knex("comments")
      .join("users", "comments.userid", "=", "users.userid")
      .select(
        "comments.comment_id",
        "users.username",
        "comments.post_id",
        "comments.comment",
        "comments.comment_date"
      )
      .from('comments')
      .where('post_id', postId);
  },
   createComment(knex, comment) {
      return knex
         .into('comments')
         .insert(comment)
   },
   deleteComment(knex, id) {
      return knex('comments')
         .where({comment_id: id})
         .del()
   }
}
module.exports = CommentsService