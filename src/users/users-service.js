const UsersService = {
  authenticateUser(knex, tokenUsername) {
    return knex('users')
      .where({ 'username': tokenUsername })
      .first()
  },
  createUser(knex, user) {
    return knex.into("users").insert(user);
  },
};
module.exports = UsersService;
