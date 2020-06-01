const mockAgent = require("../__mocks__/mockAgent");
const MetricModel = require('../models/metric')

const mockAgentService = require("../__mocks__/mockAgentService");
jest.mock("../models/agent", () => jest.fn(() => mockAgentService));

const mockMetric = { belongsTo: jest.fn() }
jest.mock('../models/metric', () => {
  return jest.fn(() => mockMetric)
})

const setupDatabase = require("../");

const id = mockAgent.findOne.id;

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
  expect(mockAgentService.hasMany).toHaveBeenCalledWith(mockMetric);
});
test("MockMetric called whit MockAgent", () => {
  expect(mockMetric.belongsTo).toHaveBeenCalledWith(mockAgentService);
});

test("Agent,findBtId should retrun Agent entity", async () => {
  const agent = await db.Agent.findById(id);
  expect(agent).toBe(mockAgent.findById(id));
});


