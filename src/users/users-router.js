const express = require("express");
const UsersService = require("./users-service");
const usersRouter = express.Router();
const jsonBodyParser = express.json();
const jwt = require("jsonwebtoken");
const xss = require("xss");
const createAuthToken = require("./auth-token");

usersRouter.route("/api/user").post(jsonBodyParser, (req, res, next) => {
  const authParam = req.get("Authorization") || "";
  const authToken = authParam.slice(0, authParam.indexOf(','))
  console.log("authToken: ", authToken);

  let basicToken;
  if (!authToken.toLowerCase().startsWith("basic")) {
    console.log("no auth token");
    return res.status(401).json({ error: "Missing basic token" });
  } else {
    console.log("yes auth token");
    basicToken = authToken.slice(6, authToken.indexOf(","));
  }
  const [tokenUsername, tokenPassword] = Buffer.from(basicToken, "base64")
    .toString()
    .split(":");
  console.log("username: ", tokenUsername);
  console.log("password: ", tokenPassword);
  if (!tokenUsername || !tokenPassword) {
    return res.status(401).json({
      error: "Unauthorized request",
    });
  }
  UsersService.authenticateUser(req.app.get("db"), tokenUsername, tokenPassword)
    .then((user) => {
      console.log(
        "user.password:",
        user.password,
        "tokenPassword:",
        tokenPassword
      );
      console.log('user is ', user)
      if (!user || user.password !== tokenPassword) {
        console.log(user.password);
        return res.status(401).json({ error: "Unauthorized request" });
      } else {const jwtToken = createAuthToken(user);
      console.log("jwtToken =", jwtToken);
      const data = {jwtToken, user}
      return res.json({ data })};
    })
    .then((data) => {
      return res.status(202).json(data);
    })
});

usersRouter.route("/api/users").post(jsonBodyParser, (req, res, next) => {
  const { username, password, fn, ln, dob, email } = req.body;
  const newUser = {
    username,
    password,
    fn,
    ln,
    dob,
    email,
  };
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
});
module.exports = usersRouter;
