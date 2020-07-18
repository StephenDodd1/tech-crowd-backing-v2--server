const PostsService = {
   getLatestPosts(knex) {
      return knex
         .select('*')
         .from('posts')
   },
}

module.exports = PostsService