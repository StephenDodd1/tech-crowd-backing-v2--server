const PostsService = {
  getLatestPosts(knex) {
    return knex.select("*").from("posts");
  },
  createPost(knex, post) {
    return knex.into("posts").insert(post);
  },
  searchPosts(knex, postSearch) {
    return knex
      .select("*")
      .from("posts")
      .where("title", "like", `%${postSearch}%`);
  },
  updatePost(knex, update) {
    return knex
      .from("posts")
      .where("post_id", update.postId)
      .update({
        title: update.title,
        content: update.content,
        type: update.type,
      });
  },
};

module.exports = PostsService;
