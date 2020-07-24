require("dotenv").config();
const app = require("../src/app");
const knex = require("knex");
const supertest = require("supertest");

describe("posts endpoints test", () => {
  let db;
  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
  });

  app.set("db", db);

  after("disconnect from db", () => db.destroy());

  describe("GET ", () => {
    it("GET endpoint for posts works", () => {
      supertest(app).get("/api/posts").expect(200, "Got some posts!");
    });
  });
  describe("POST ", () => {
    it("POST endpoint for posts works", () => {
      supertest(app)
        .post("/api/posts", {
          post_id: 1,
          userid: 1,
          title: "test",
          content: "test",
          type: "Technology",
          comment_date: new Date(),
        })
        .expect(200, "Posted!");
    });
  });
  describe("UPDATE", () => {
    it("PATCH endpoint for posts works", () => {
      supertest(app)
        .patch("/api/posts/:postId", {
          userid: 1,
          title: "test",
          content: "test",
          type: "Technology",
        })
        .expect(200, "Updated")
    })
  })
});
