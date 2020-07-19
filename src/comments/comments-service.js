const CommentsService = {
   getAllComments(knex, postId) {
      console.log(postId)
      return knex 
         .select('*')
         .from('comments')
         .where('post_id', postId)
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