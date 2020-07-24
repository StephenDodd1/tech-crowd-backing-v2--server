require("dotenv").config();
const app = require("../src/app");
const knex = require("knex");

describe("posts endpoints test", () => {
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
    it("GET endpoint for posts works", () => {
      return supertest(app).get("/api/posts").expect(200);
    });
  });
  describe("POST ", () => {
    it("POST endpoint for posts works", () => {
      return supertest(app)
        .post("/api/posts", {
          post_id: 1,
          userid: 1,
          title: "test",
          content: "test",
          type: "Technology",
          comment_date: new Date(),
        })
        .expect(200);
    });
  });
  describe("UPDATE", () => {
    it("PATCH endpoint for posts works", () => {
      return supertest(app)
        .patch("/api/posts/1", {
          userid: 1,
          title: "test",
          content: "test",
          type: "Technology",
        })
        .expect(200)
    })
  })
});
