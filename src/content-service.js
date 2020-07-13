const contentService = {
   getLatestPosts(knex) {
      return knex
         .select('*')
         .from('posts')
   },
   getUserId(knex) {
      return knex
         .select('userId')
         .from('users')
         .where(`userName = ${userName}`)
   }
}