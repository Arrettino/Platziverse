const mockMetric = require("../__mocks__/mockMetric");

const mockAgentService = require("../__mocks__/mockAgentService");
jest.mock("../models/agent", () => jest.fn(() => mockAgentService));

const mockMetricService = require("../__mocks__/mockMetricService");
jest.mock("../models/metric", () => jest.fn(() => mockMetricService));

const setupDatabase = require("../");

let db = null;

config = {
  logging: function () {},
  dialect: "sqlite",
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
  },
  query: {
    raw: true,
  },
};

beforeEach(async () => {
  db = await setupDatabase(config);
});
afterEach(() => {
  jest.clearAllMocks();
});

test("Metric exist", () => {
  expect(db.Metric).toBeTruthy();
});
