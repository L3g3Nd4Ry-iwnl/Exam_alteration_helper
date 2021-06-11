const  x = require("../app");

const request = require("supertest");

describe("GET / ", () => {
  test("1) It should respond with FAQ Page", async () => {
    const response = await request(x.app).get("/");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET / ", () => {
    test("2) It should respond with ABOUT Page", async () => {
        const response = await request(x.app).get("/faq");
        expect(response.statusCode).toBe(200);
   });
});

describe("GET / ", () => {
    test("3) It should respond with HOME Page", async () => {
        const response = await request(x.app).get("/about");
        expect(response.statusCode).toBe(200);
   });
});

describe("GET / ", () => {
  test("4) It should respond with admin dashboard in admin login page", async () => {
    const response = await request(x.app).get("/admin/login");
    expect(response.statusCode).toBe(200);
  });
});




describe("GET / ", () => {
  test("5) It should respond with add a faculty in admin login page", async () => {
    const response = await request(x.app).get("/admin/faculty/add");
    expect(response.statusCode).toBe(403);
  });
});



describe("GET / ", () => {
  test("6) It should respond with  delete or edit a faculty in admin login page", async () => {
    const response = await request(x.app).get("/admin/faculty/edit");
    expect(response.statusCode).toBe(403);
  });
});

describe("GET / ", () => {
  test("7) It should respond with uploading time table in admin login page", async () => {
    const response = await request(x.app).get("/admin/upload/timetable");
    expect(response.statusCode).toBe(403);
  });
});

describe("GET / ", () => {
  test("8) It should respond with uploading new hall allotment in admin login page", async () => {
    const response = await request(x.app).get("/admin/upload/hallalloc");
    expect(response.statusCode).toBe(403);
  });
});

describe("GET / ", () => {
  test("9) It should respond with viewing FAQ in admin login page", async () => {
    const response = await request(x.app).get("/admin/view/faq");
    expect(response.statusCode).toBe(403);
  });
});

describe("GET / ", () => {
  test("10) It should respond with downloading hall allocation in admin login page", async () => {
    const response = await request(x.app).get("/admin/download/hallalloc");
    expect(response.statusCode).toBe(403);
  });
});

describe("GET / ", () => {
  test("11) It should respond with deleting hall allocation in admin login page", async () => {
    const response = await request(x.app).get("/admin/delete/hallalloc");
    expect(response.statusCode).toBe(403);
  });
});


//----------------------------------------dean js functions----------------------------------------------------

describe("GET / ", () => {
  test("12) It should respond with dean dashboard login page", async () => {
    const response = await request(x.app).get("/dean/login");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET / ", () => {
  test("13) It should respond with dean dashboard page", async () => {
    const response = await request(x.app).get("/dean/dashboard");
    expect(response.statusCode).toBe(302);
  });
});

describe("GET / ", () => {
  test("14) It should respond with viewing faculty details in dean login page", async () => {
    const response = await request(x.app).get("/dean/faculty/view'");
    expect(response.statusCode).toBe(404);
  });
});

describe("GET / ", () => {
  test("15) It should respond with viewing exam timetable in dean login page", async () => {
    const response = await request(x.app).get("/dean/display/examtt");
    expect(response.statusCode).toBe(403);
  });
});


describe("GET / ", () => {
  test("16) It should respond with displaying hall allocation in dean login page", async () => {
    const response = await request(x.app).get("/dean/display/hallalloc");
    expect(response.statusCode).toBe(403);
  });
});

//----------------------------------------faculty js functions----------------------------------------------------

describe("GET / ", () => {
  test("17) It should respond with faculty login  Page", async () => {
      const response = await request(x.app).get("/login");
      expect(response.statusCode).toBe(404);
 });
});

describe("GET / ", () => {
  test("18) It should respond with viewing or updating details in faculty login  Page", async () => {
      const response = await request(x.app).get("/faculty/update/details");
      expect(response.statusCode).toBe(403);
 });
});


describe("GET / ", () => {
  test("19) It should respond with updating the password in faculty login  Page", async () => {
      const response = await request(x.app).get("/faculty/update/password");
      expect(response.statusCode).toBe(403);
 });
});

describe("GET / ", () => {
  test("20) It should respond with displaying the faculty timetable in faculty login  Page", async () => {
      const response = await request(x.app).get("/faculty/display/facultytt");
      expect(response.statusCode).toBe(403);
 });
});




describe("GET / ", () => {
  test("21) It should respond with displaying the exam timetable in faculty login  Page", async () => {
      const response = await request(x.app).get("/faculty/display/examtt");
      expect(response.statusCode).toBe(403);
 });
});





describe("GET / ", () => {
  test("22) It should respond with exchanging the slots in faculty login  Page", async () => {
      const response = await request(x.app).get("/faculty/exchange/select");
      expect(response.statusCode).toBe(404);
 });
});


describe("GET / ", () => {
  test("23) It should respond with confirming the exchange slots in faculty login  Page", async () => {
      const response = await request(x.app).get("/faculty/exchange/confirm");
      expect(response.statusCode).toBe(404);
 });
});

describe("GET / ", () => {
  test("24) It should respond with viewing the slot requests in faculty login  Page", async () => {
      const response = await request(x.app).get("/faculty/requests/view");
      expect(response.statusCode).toBe(403);
 });
});



describe("GET / ", () => {
  test("25) It should respond with accepting the requested slots in faculty login  Page", async () => {
      const response = await request(x.app).get("/faculty/requests/accept");
      expect(response.statusCode).toBe(403);
 });
});


describe("GET / ", () => {
  test("26) It should respond with rejecting the requested slots in faculty login  Page", async () => {
      const response = await request(x.app).get("/faculty/requests/reject");
      expect(response.statusCode).toBe(403);
 });
});




