const express = require('express');
const UsersService = require('./users-service');
const usersRouter = express.Router();
const jsonBodyParser = express.json();
const xss = require('xss')

usersRouter
  .route('/api/users')
  .get((req,res,next) => {
    const username = xss(req.body.username);
    const password = xss(req.body.username);
    UsersService.authenticateUser(req.app.get('db'), username, password)
    res.json(username);
  })

usersRouter
  .route('/api/users')
  .post(jsonBodyParser, (req, res, next) => {
    const { username, password, fn, ln, dob, email } = req.body;
    const newUser = {
      username,
      password,
      fn,
      ln,
      dob,
      email
  }
  UsersService.createUser(req.app.get("db"), req.body)
  .then((user) => {
    if (!user) {
      res.status(404).json({
        error: { message: "user was not created" },
      });
    }
    res.json(user);
  })
  .catch(next);
})
module.exports = usersRouter;