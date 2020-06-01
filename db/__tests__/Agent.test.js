const setupDatabase = require("../");
const AgentModel = require("../models/agent");
const MetricModel = require("../models/metric");

const mockAgent = { hasMany: jest.fn() };
jest.mock("../models/agent", () => {
  return jest.fn(() => mockAgent);
});

const mockMetric = { belongsTo: jest.fn() };
jest.mock("../models/metric", () => {
  return jest.fn(() => mockMetric);
});

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

test("Agent exist", () => {
  expect(db.Agent).toBeTruthy();
});

test("MockAgent called whit MockMetric", () => {
  expect(mockAgent.hasMany).toHaveBeenCalledWith(mockMetric);
});

test("MockMetric called whit MockAgent", () => {
  expect(mockMetric.belongsTo).toHaveBeenCalledWith(mockAgent);
});