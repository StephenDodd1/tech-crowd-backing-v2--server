const PostsService = {
   getLatestPosts(knex) {
      return 'all good'
      /*return knex
         .select('*')
         .from('posts')*/
   },
}

module.exports = PostsService