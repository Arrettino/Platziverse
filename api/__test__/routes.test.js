const serverTest = require("../utils/testServer");
const routes = require("../api");

describe("routes api test", () => {
  let request = null;

  beforeEach(() => {
    request = serverTest(routes);
  });

  test("It should response the GET method", async () => {
    const response = await request
      .get("/api/agents")
      .expect(200)
      .expect('content-Type', /json/)
    let body = response.body
    expect(body).toEqual({})
  });
});
