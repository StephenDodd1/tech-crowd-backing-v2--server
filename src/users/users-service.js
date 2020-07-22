const UsersService = {
  authenticateUser(knex, username, password) {
    return knex
      .select("*")
      .from("users")
      .where("username", username, "password", password);
  },
  createUser(knex, user) {
    return knex.into("users").insert(user);
  },
};
module.exports = UsersService;
