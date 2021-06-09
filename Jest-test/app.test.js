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

//--------------------------------admin js functions-----------------------------------------------


describe("GET / ", () => {
    test("4) It should respond with admin dashboard in admin login page", async () => {
      const response = await request(x.app).get("/admindash");
      expect(response.statusCode).toBe(404);
    });
});


describe("GET / ", () => {
  test("5) It should respond with add a faculty in admin login page", async () => {
    const response = await request(x.app).get("/faculty/add");
    expect(response.statusCode).toBe(404);
  });
});

describe("GET / ", () => {
  test("6) It should respond with  delete or edit a faculty in admin login page", async () => {
    const response = await request(x.app).get("/faculty/edit");
    expect(response.statusCode).toBe(404);
  });
});


describe("GET / ", () => {
  test("7) It should respond with uploading time table in admin login page", async () => {
    const response = await request(x.app).get("/upload/timetable");
    expect(response.statusCode).toBe(404);
  });
});


describe("GET / ", () => {
  test("8) It should respond with uploading new hall allotment in admin login page", async () => {
    const response = await request(x.app).get("/upload/hallalloc");
    expect(response.statusCode).toBe(404);
  });
});


describe("GET / ", () => {
  test("9) It should respond with viewing FAQ in admin login page", async () => {
    const response = await request(x.app).get("/view/faq");
    expect(response.statusCode).toBe(404);
  });
});



describe("GET / ", () => {
  test("10) It should respond with downloading hall allocation in admin login page", async () => {
    const response = await request(x.app).get("/download/hallalloc");
    expect(response.statusCode).toBe(404);
  });
});


describe("GET / ", () => {
  test("11) It should respond with deleting hall allocation in admin login page", async () => {
    const response = await request(x.app).get("/delete/hallalloc");
    expect(response.statusCode).toBe(404);
  });
});

//----------------------------------------dean js functions----------------------------------------------------

describe("GET / ", () => {
  test("12) It should respond with dean dashboard login page", async () => {
    const response = await request(x.app).get("/login");
    expect(response.statusCode).toBe(404);
  });
});


describe("GET / ", () => {
  test("13) It should respond with dean dashboard logout page", async () => {
    const response = await request(x.app).get("/logout");
    expect(response.statusCode).toBe(404);
  });
});


describe("GET / ", () => {
  test("14) It should respond with dean dashboard page", async () => {
    const response = await request(x.app).get("/dashboard");
    expect(response.statusCode).toBe(404);
  });
});


describe("GET / ", () => {
  test("15) It should respond with viewing faculty details in dean login page", async () => {
    const response = await request(x.app).get("/faculty/view'");
    expect(response.statusCode).toBe(404);
  });
});


describe("GET / ", () => {
  test("16) It should respond with viewing exam timetable in dean login page", async () => {
    const response = await request(x.app).get("/display/examtt");
    expect(response.statusCode).toBe(404);
  });
});


describe("GET / ", () => {
  test("17) It should respond with displaying hall allocation in dean login page", async () => {
    const response = await request(x.app).get("/display/hallalloc");
    expect(response.statusCode).toBe(404);
  });
});


//----------------------------------------faculty js functions----------------------------------------------------

describe("GET / ", () => {
  test("18) It should respond with faculty login  Page", async () => {
      const response = await request(x.app).get("/login");
      expect(response.statusCode).toBe(404);
 });
});



describe("GET / ", () => {
  test("19) It should respond with viewing or updating details in faculty login  Page", async () => {
      const response = await request(x.app).get("/update/details");
      expect(response.statusCode).toBe(404);
 });
});


describe("GET / ", () => {
  test("20) It should respond with updating the password in faculty login  Page", async () => {
      const response = await request(x.app).get("/update/password");
      expect(response.statusCode).toBe(404);
 });
});


describe("GET / ", () => {
  test("21) It should respond with displaying the faculty timetable in faculty login  Page", async () => {
      const response = await request(x.app).get("/display/facultytt");
      expect(response.statusCode).toBe(404);
 });
});


describe("GET / ", () => {
  test("22) It should respond with displaying the exam timetable in faculty login  Page", async () => {
      const response = await request(x.app).get("/display/examtt");
      expect(response.statusCode).toBe(404);
 });
});


describe("GET / ", () => {
  test("23) It should respond with exchanging the slots in faculty login  Page", async () => {
      const response = await request(x.app).get("/exchange/select");
      expect(response.statusCode).toBe(404);
 });
});


describe("GET / ", () => {
  test("24) It should respond with confirming the exchange slots in faculty login  Page", async () => {
      const response = await request(x.app).get("/exchange/confirm");
      expect(response.statusCode).toBe(404);
 });
});


describe("GET / ", () => {
  test("25) It should respond with viewing the slot requests in faculty login  Page", async () => {
      const response = await request(x.app).get("/requests/view");
      expect(response.statusCode).toBe(404);
 });
});



describe("GET / ", () => {
  test("26) It should respond with accepting the requested slots in faculty login  Page", async () => {
      const response = await request(x.app).get("/requests/accept");
      expect(response.statusCode).toBe(404);
 });
});


describe("GET / ", () => {
  test("27) It should respond with rejecting the requested slots in faculty login  Page", async () => {
      const response = await request(x.app).get("/requests/reject");
      expect(response.statusCode).toBe(404);
 });
});



describe("GET / ", () => {
  test("28) It should respond with getting the link for the forgot password in faculty login  Page", async () => {
      const response = await request(x.app).get("/getlink");
      expect(response.statusCode).toBe(404);
 });
});



