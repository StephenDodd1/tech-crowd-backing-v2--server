const PostsService = {
  getLatestPosts(knex) {
    return knex.select("*").from("posts");
  },
  createPost(knex, post) {
    return knex.into("posts").insert(post);
  },
  searchPosts(knex, postSearch) {
     return knex.select("*").from("posts").where('title', 'like', `%${postSearch}%`);
  }
};

module.exports = PostsService;
