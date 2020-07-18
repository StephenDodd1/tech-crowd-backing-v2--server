const ContentService = {
   
   getUserId(knex, userId) {
      return knex
         .select('userId')
         .from('users')
         .where('userid', userId)
   }
}
module.exports = ContentService