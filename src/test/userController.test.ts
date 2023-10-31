import request from "supertest";
import jwt from "jsonwebtoken";
import { app, server } from "../app";
import User from "../models/userModel";

describe("User Controller tests", () => {
  let userId;
  let token;

  beforeAll(async () => {
    const userData = {
      usernameOrEmail: "gabrielraymond1",
      password: "asdf1234",
    };

    const response = await request(app).post("/api/auth/login").send(userData);

    token = response.body.token;
    console.log(token);
  });

  afterAll((done) => {
    // Close the server after all tests have completed
    server.close(done);
  });

  it("should create a user", async () => {
    const userData = {
      name: "test user",
      username: "testuser",
      email: "testuser@test.com",
      password: "testuser123",
      address: "123 Main St",
      phoneNumber: "08995432207",
      gender: "male",
      status: "active",
    };

    const response = await request(app)
      .post("/api/user/register")
      .send(userData);

    // const decoded = jwt.verify(response.body.token, process.env.TOKEN_SECRET);
    // console.log(decoded);
    userId = response.body._id;
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
  });

  //   it("get data user", async () => {
  //     const response = await request(app)
  //       .get("/api/user/profil")
  //       .set({ "x-auth-token": token });

  //     expect(response.status).toBe(200);
  //     expect(response.body).toHaveProperty("_id");

  //     userId = response.body._id;
  //   });

  it("delete user", async () => {
    const response = await request(app)
      .delete(`/api/user/${userId}`)
      .set({ "x-auth-token": token });

    expect(response.status).toBe(204);
    // expect(response.body)
  });
});

// describe("test user", () => {
//   let userId;
//   let token;

//   beforeAll(async () => {
//     const userData = {
//       usernameOrEmail: "gabrielraymond1",
//       password: "asdf1234",
//     };

//     const response = await request(app).post("/api/auth/login").send(userData);

//     token = response.body.token;
//     console.log(token);
//   });

//   afterAll((done) => {
//     // Close the server after all tests have completed
//     server.close(done);
//   });

//   it("get data user", async () => {
//     const response = await request(app)
//       .get("/api/user/profil")
//       .set({ "x-auth-token": token });

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("_id");

//     userId = response.body._id;
//   });

//   it("delete user", async () => {
//     const response = await request(app).delete(`/api/user/${userId}`);

//     expect(response.status).toBe(204);
//     // expect(response.body)
//   });
// });
