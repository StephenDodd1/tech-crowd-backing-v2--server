const CommentsService = {
   getAllComments(knex, postId) {
      console.log(postId)
      return knex 
         .select('*')
         .from('comments')
         .where('post_id', postId)
   },
   //createComment(knex, comment) {
     // return knex
       //  .insert
   //}
}
module.exports = CommentsService