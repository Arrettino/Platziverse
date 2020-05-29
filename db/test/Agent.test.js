const setupDatabase = require("../");
let config = {
  logging: function () {},
};
let db = null;

beforeEach(async () => {
  db = await setupDatabase(config);
});

test("Agent", () => {
  expect(db.Agent).toBeTruthy();
});
