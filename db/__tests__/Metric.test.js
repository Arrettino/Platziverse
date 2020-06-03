const mockMetric = require("../__mocks__/mockMetric");
const mockAgent = require("../__mocks__/mockAgent");

const mockAgentService = require("../__mocks__/mockAgentService");
jest.mock("../models/agent", () => jest.fn(() => mockAgentService));

const mockMetricService = require("../__mocks__/mockMetricService");
jest.mock("../models/metric", () => jest.fn(() => mockMetricService));

const setupDatabase = require("../");

let db = null;

//test create a metric
const agentId = mockAgent.findOne.id
const idCreate = { where: { id : agentId } };
const newMetric = mockMetric.newMetric;
const createMetric = { ...newMetric, agentId: agentId };

//test findByAgentUuid
const conditionId = {
  attributes: ["type"],
  group: ["type"],
  include: [
    {
      attributes: [],
      model: mockAgentService,
      where: {
        id: agentId,
      },
    },
  ],
  raw: true,
};
const metricId = mockMetric.findByAgentId(agentId);

//test findByTypeAgentId
const type = "memory";
const metricType = mockMetric.findByTypeAgentId(type, agentId);
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
        id: agentId,
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
  const metric = await db.Metric.create(agentId, newMetric);
  expect(mockAgentService.findOne).toHaveBeenCalledTimes(1);
  expect(mockAgentService.findOne).toHaveBeenCalledWith(idCreate);
  expect(mockMetricService.create).toHaveBeenCalledTimes(1);
  expect(mockMetricService.create).toHaveBeenCalledWith(newMetric);
  expect(metric).toStrictEqual(createMetric);
});

test("Metric.findByAgentUuid", async () => {
  const metric = await db.Metric.findByAgentId(agentId);
  expect(mockMetricService.findAll).toHaveBeenCalledTimes(1);
  expect(mockMetricService.findAll).toHaveBeenCalledWith(conditionId);
  expect(metric).toStrictEqual(metricId);
});

test("Metric.findByTypeAgentId", async () => {
  const metric = await db.Metric.findByTypeAgentId(type, agentId);
  expect(mockMetricService.findAll).toHaveBeenCalledTimes(1);
  expect(mockMetricService.findAll).toHaveBeenCalledWith(conditionType);
  expect(metric).toStrictEqual(metricType);
});
