require("dotenv").config();
const app = require("../src/app");
const knex = require("knex");

describe("comment endpoints test", () => {
  console.log("comments spec ran");
  let db;
  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
  app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  describe("GET ", () => {
    it("GET endpoint for comments works", () => {
      return supertest(app).get("/api/1/comments").expect(200);
    });
  });
  describe("POST ", () => {
    it("POST endpoint for comments works", () => {
      const newComment = {
        "post_id": 1,
        "userid": 1,
        "comment": "test"}
      return supertest(app)
        .post("/api/1/comment").send(
          newComment
        )
        .expect(200);
    });
  });
  describe("DELETE", () => {
     it("DELETE endpoint works for comments", () => {
        return supertest(app)
          .delete("/api/comments/1")
          .expect(200)
     })
  })
});
