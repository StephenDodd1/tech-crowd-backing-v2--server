const ContentService = {
   
   getUserId(knex) {
      return knex
         .select('userId')
         .from('users')
   }
}
module.exports = ContentService