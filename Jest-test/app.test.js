const  x = require("../app");

const request = require("supertest");

describe("GET / ", () => {
  test("It should respond with FAQ Page", async () => {
    const response = await request(x.app).get("/faq");
    expect(response.statusCode).toBe(200);
  });
});


describe("GET / ", () => {
    test("It should respond with ABOUT Page", async () => {
        const response = await request(x.app).get("/about");
        expect(response.statusCode).toBe(200);
   });
});


describe("GET / ", () => {
    test("It should respond with HOME Page", async () => {
        const response = await request(x.app).get("/");
        expect(response.statusCode).toBe(200);
   });
});

describe("GET / ", () => {
    test("It should respond login page", async () => {
      const response = await request(x.app).get("/admindash");
      expect(response.statusCode).toBe(404);
    });
});