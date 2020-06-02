const mockMetric = require("../__mocks__/mockMetric");
const mockAgent = require("../__mocks__/mockAgent");

const mockAgentService = require("../__mocks__/mockAgentService");
jest.mock("../models/agent", () => jest.fn(() => mockAgentService));

const mockMetricService = require("../__mocks__/mockMetricService");
jest.mock("../models/metric", () => jest.fn(() => mockMetricService));

const setupDatabase = require("../");

let db = null;

//test create a metric
const agentUuid = mockAgent.findOne.uuid;
const UuidCreate = {where: {uuid:agentUuid}}
const newMetric = mockMetric.newMetric;
const createMetric = {...newMetric, agentId:agentUuid}

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

test("Agent.create should be called to creat a metric", async () => {
  const metric = await db.Metric.create(agentUuid, newMetric);
  expect(mockAgentService.findOne).toHaveBeenCalledTimes(1)
  expect(mockAgentService.findOne).toHaveBeenCalledWith(UuidCreate)
  expect(mockMetricService.create).toHaveBeenCalledTimes(1);
  expect(mockMetricService.create).toHaveBeenCalledWith(newMetric);
  expect(metric).toStrictEqual(createMetric)
});
