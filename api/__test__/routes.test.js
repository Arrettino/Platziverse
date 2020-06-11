const serverTest = require("../utils/testServer");
const routes = require("../api");

describe("routes api test", () => {
  let request = null;

  beforeEach(() => {
    request = serverTest(routes);
  });

  test("It should response the GET method", async () => {
    await request.get("/api/agents").expect(200);
  });
});
