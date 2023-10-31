import request from "supertest";
import { app, server } from "../app";
import User from "../models/userModel";

describe("Authentication Controller Tests", () => {
  afterAll((done) => {
    // Close the server after all tests have completed
    server.close(done);
  });

  it("check if can login with username", async () => {
    const userData = {
      usernameOrEmail: "gabrielraymond1",
      password: "asdf1234",
    };

    const response = await request(app).post("/api/auth/login").send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("check if can login with email", async () => {
    const userData = {
      usernameOrEmail: "gabrielraymond.grd@gmail.com",
      password: "asdf1234",
    };

    const response = await request(app).post("/api/auth/login").send(userData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("check if username or email wrong", async () => {
    const userData = {
      usernameOrEmail: "asdf",
      password: "asdf1234",
    };

    const response = await request(app).post("/api/auth/login").send(userData);

    expect(response.status).toBe(401);
    expect(response.text).toBe("Username or Email is not found");
  });

  it("check if password wrong", async () => {
    const userData = {
      usernameOrEmail: "gabrielraymond1",
      password: "passwordsalah",
    };

    const response = await request(app).post("/api/auth/login").send(userData);

    expect(response.status).toBe(401);
    expect(response.text).toBe("Invalid Password");
  });
});
