const mockAgent = require("../__mocks__/mockAgent");
const MetricModel = require("../models/metric");

const mockAgentService = require("../__mocks__/mockAgentService");
jest.mock("../models/agent", () => jest.fn(() => mockAgentService));

const mockMetric = { belongsTo: jest.fn() };
jest.mock("../models/metric", () => {
  return jest.fn(() => mockMetric);
});

const setupDatabase = require("../");
//test find by id
const id = mockAgent.findOne.id;
//test upgrade
const oneAgent = mockAgent.findOne
const uuidUpgrade = oneAgent.uuid
const upgradeCondition = { where: { uuid: uuidUpgrade } }
//test create
const newAgent = mockAgent.newAgent
const uuidCreate = newAgent.uuid
const createCondition = { where: { uuid: uuidCreate } }
//test find by uuid
const uuidOneAgent = oneAgent.uuid
const uuidCondition = {where: {uuid : uuidOneAgent}}
//test find all Agents
const allAgents = mockAgent.findAll
//test find Agent conect
const AgentsConnected = mockAgent.findConnected 
const conectCondition = {where: { connected: true } } 
//test find by username
const username = oneAgent.username
const usernameCondition = { where: { username } }
const AgentsWhithUsername = mockAgent.findByUsername(username)

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

test("Agent.findById should retrun Agent entity", async () => {
  const agent = await db.Agent.findById(id);
  expect(agent).toBe(mockAgent.findById(id));
});

test("Agent.createOrUpdate should be called to create an agent", async () => {
  const agent = await db.Agent.createOrUpdate(oneAgent)
  expect(mockAgentService.findOne).toHaveBeenCalledTimes(2)
  expect(mockAgentService.findOne).toHaveBeenCalledWith(upgradeCondition)
  expect(mockAgentService.update).toHaveBeenCalledTimes(1)
  expect(mockAgentService.update).toHaveBeenCalledWith(
    oneAgent,
    upgradeCondition
  )
  expect(agent).toBe(oneAgent)
});

test('Agent.createOrUpdate should be called to create an agent', async () => {
  const agent = await db.Agent.createOrUpdate(newAgent)
  expect(mockAgentService.findOne).toHaveBeenCalledTimes(1)
  expect(mockAgentService.findOne).toHaveBeenCalledWith(createCondition)
  expect(mockAgentService.create).toHaveBeenCalledTimes(1)
  expect(mockAgentService.create).toHaveBeenCalledWith(newAgent)
  expect(agent).toBe(newAgent)
})

test('Agent.findByUuid should be called an return the matched agent', async () => {
  const agent = await db.Agent.findByUuid(uuidCondition)
  expect(mockAgentService.findOne).toHaveBeenCalledTimes(1)
  expect(mockAgentService.findOne).toHaveBeenCalledWith(uuidCondition)
  expect(agent).toBe(oneAgent)
})

test('Agent.findAll should be called and return all the agents', async () => {
  const Agents = await db.Agent.findAll()
  expect(mockAgentService.findAll).toHaveBeenCalledTimes(1)
  expect(Agents).toBe(allAgents)
})

test('Agent.findConnected should return the connected agents', async () => {
  const Agents = await db.Agent.findConnected()
  expect(mockAgentService.findAll).toHaveBeenCalledTimes(1)
  expect(mockAgentService.findAll).toHaveBeenCalledWith(conectCondition)
  expect(Agents).toBe(AgentsConnected)  
})

test('Agent.findByUsername should return the agents that have the username passed as argument', async () => {
 const Agent = await db.Agent.findByUsername(username)
 expect(mockAgentService.findAll).toHaveBeenCalledTimes(1)
 expect(mockAgentService.findAll).toHaveBeenCalledWith(usernameCondition)
 expect(Agent).toStrictEqual(AgentsWhithUsername)
})