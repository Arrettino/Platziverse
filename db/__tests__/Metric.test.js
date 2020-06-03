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
const UuidCreate = { where: { uuid: agentUuid } };
const newMetric = mockMetric.newMetric;
const createMetric = { ...newMetric, agentId: agentUuid };

//test findByAgentUuid
const conditionUuid = {
  attributes: ["type"],
  group: ["type"],
  include: [
    {
      attributes: [],
      model: mockAgentService,
      where: {
        uuid: agentUuid,
      },
    },
  ],
  raw: true,
};
const metricUuid = mockMetric.findByAgentUuid(agentUuid);

//test findByTypeAgentUuid
const type = "memory";
const metricType = mockMetric.findByTypeAgentUuid(type, agentUuid);
const conditionType = {
  attributes: ["id", "type", "value", "createdAt"],
  where: {
    type: type,
  },
  limit: 20,
  order: [["createdAt", "DESC"]],
  include: [
    {
      attributes: [],
      model: mockAgentService,
      where: {
        uuid: agentUuid,
      },
    },
  ],
  raw: true,
};
//config
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

//tests
test("Metric exist", () => {
  expect(db.Metric).toBeTruthy();
});

test("MockMetric called whit MockAgent", () => {
  expect(mockMetricService.belongsTo).toHaveBeenCalledTimes(1);
  expect(mockMetricService.belongsTo).toHaveBeenCalledWith(mockAgentService);
});

test("Metric.create should be called to creat a metric", async () => {
  const metric = await db.Metric.create(agentUuid, newMetric);
  expect(mockAgentService.findOne).toHaveBeenCalledTimes(1);
  expect(mockAgentService.findOne).toHaveBeenCalledWith(UuidCreate);
  expect(mockMetricService.create).toHaveBeenCalledTimes(1);
  expect(mockMetricService.create).toHaveBeenCalledWith(newMetric);
  expect(metric).toStrictEqual(createMetric);
});

test("Metric.findByAgentUuid", async () => {
  const metric = await db.Metric.findByAgentUuid(agentUuid);
  expect(mockMetricService.findAll).toHaveBeenCalledTimes(1);
  expect(mockMetricService.findAll).toHaveBeenCalledWith(conditionUuid);
  expect(metric).toStrictEqual(metricUuid);
});

test("Metric.findByTypeAgentUuid", async () => {
  const metric = await db.Metric.findByTypeAgentUuid(type, agentUuid);
  expect(mockMetricService.findAll).toHaveBeenCalledTimes(1);
  expect(mockMetricService.findAll).toHaveBeenCalledWith(conditionType);
  expect(metric).toStrictEqual(metricType);
});
