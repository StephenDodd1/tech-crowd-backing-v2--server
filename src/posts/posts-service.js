const PostsService = {
   getLatestPosts(knex) {
      return knex
         .select('*')
         .from('posts')
   },
   createPost(knex, post) {
      return knex
         .into('posts')
         .insert(post)
   }
}

module.exports = PostsService