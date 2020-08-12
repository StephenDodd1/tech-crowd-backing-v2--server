const PostsService = {
  getLatestPosts(knex) {
    return knex("posts")
      .join("users", "posts.userid", "=", "users.userid")
      .select(
        "posts.post_id",
        "users.username",
        "posts.title",
        "posts.content",
        "posts.date_posted"
      );
  },
  createPost(knex, post) {
    return knex.into("posts").insert(post);
  },
  searchPosts(knex, postSearch) {
    return knex
      .select("*")
      .from("posts")
      .where("title", "like", `%${postSearch}%`)
      .orWhere("content", "like", `%${postSearch}%`);
  },
  updatePost(knex, postId, update) {
    return knex.from("posts").where("post_id", postId).update({
      title: update.title,
      content: update.content,
      type: update.type,
    });
  },
};

module.exports = PostsService;
