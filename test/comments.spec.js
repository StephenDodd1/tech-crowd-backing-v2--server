require("dotenv").config();
const app = require("../src/app");
const knex = require("knex");
const supertest = require("supertest");

describe("comment endpoints test", () => {
  console.log("comments spec ran");
  let db;
  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.DB_TEST,
    });
  });

  app.set("db", db);

  after("disconnect from db", () => db.destroy());

  describe("GET ", () => {
    it("GET endpoint for comments works", () => {
      supertest(app).get("/api/1/comment").expect(200, "Got some comments!");
    });
  });
  describe("POST ", () => {
    it("POST endpoint for comments works", () => {
      supertest(app)
        .post("/api/1/comment", {
          comment_id: 1,
          post_id: 1,
          userid: 1,
          comment: "test",
          comment_date: new Date(),
        })
        .expect(200, "Posted!");
    });
  });
  describe("DELETE", () => {
     it("DELETE endpoint works for comments", () => {
        supertest(app)
          .delete("/api/1/comment")
          .expect(200, "Deleted!")
     })
  })
});
