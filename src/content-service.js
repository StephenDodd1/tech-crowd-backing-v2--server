const ContentService = {
   
   getUserId(knex) {
      return knex
         .select('userId')
         .from('users')
         .where(`userName = ${userName}`)
   }
}
module.exports = ContentService