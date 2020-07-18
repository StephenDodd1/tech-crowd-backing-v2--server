const CommentsService = {
   getAllComments(knex, userId){
      return knex 
         .select('*')
         .from('comments')
         .where('userid', userId)
   }
}