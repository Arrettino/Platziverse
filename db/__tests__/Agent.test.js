const mockAgent = require("../__mocks__/mockAgent");

const mockAgentService = require("../__mocks__/mockAgentService");
jest.mock("../models/agent", () => jest.fn(() => mockAgentService));

const mockMetricService = require("../__mocks__/mockMetricService");
jest.mock("../models/metric", () => jest.fn(() => mockMetricService));

const setupDatabase = require("../");
//test find by id
const id = mockAgent.findOne.id;
//test upgrade
const oneAgent = mockAgent.findOne;
const usernameUpgrade = oneAgent.username;
const upgradeCondition = { where: { username: usernameUpgrade } };
//test create
const newAgent = mockAgent.newAgent;
const usernameCreate = newAgent.username;
const createCondition = { where: { username: usernameCreate } };
//test find all Agents
const allAgents = mockAgent.findAll;
//test find Agent conect
const AgentsConnected = mockAgent.findConnected;
const conectCondition = { where: { connected: true } };
//test find by username
const username = oneAgent.username;
const usernameCondition = { where: { username } };
const AgentsWhithUsername = mockAgent.findByUsername(username)[0];

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
  expect(mockAgentService.hasMany).toHaveBeenCalledTimes(1);
  expect(mockAgentService.hasMany).toHaveBeenCalledWith(mockMetricService);
});

test("Agent.findById should retrun Agent entity", async () => {
  const agent = await db.Agent.findById(id);
  expect(agent).toBe(mockAgent.findById(id));
});

test("Agent.createOrUpdate should be called to update an agent", async () => {
  const agent = await db.Agent.createOrUpdate(oneAgent);
  expect(mockAgentService.findOne).toHaveBeenCalledTimes(2);
  expect(mockAgentService.findOne).toHaveBeenCalledWith(upgradeCondition);
  expect(mockAgentService.update).toHaveBeenCalledTimes(1);
  expect(mockAgentService.update).toHaveBeenCalledWith(
    oneAgent,
    upgradeCondition
  );
  expect(agent).toStrictEqual(oneAgent);
});

test("Agent.createOrUpdate should be called to create an agent", async () => {
  const agent = await db.Agent.createOrUpdate(newAgent);
  expect(mockAgentService.findOne).toHaveBeenCalledTimes(1);
  expect(mockAgentService.findOne).toHaveBeenCalledWith(createCondition);
  expect(mockAgentService.create).toHaveBeenCalledTimes(1);
  expect(mockAgentService.create).toHaveBeenCalledWith(newAgent);
  expect(agent).toBe(newAgent);
});
test("Agent.findAll should be called and return all the agents", async () => {
  const Agents = await db.Agent.findAll();
  expect(mockAgentService.findAll).toHaveBeenCalledTimes(1);
  expect(Agents).toBe(allAgents);
});

test("Agent.findConnected should return the connected agents", async () => {
  const Agents = await db.Agent.findConnected();
  expect(mockAgentService.findAll).toHaveBeenCalledTimes(1);
  expect(mockAgentService.findAll).toHaveBeenCalledWith(conectCondition);
  expect(Agents).toBe(AgentsConnected);
});

test("Agent.findByUsername should return the agents that have the username passed as argument", async () => {
  const Agent = await db.Agent.findByUsername(username);
  expect(mockAgentService.findOne).toHaveBeenCalledTimes(1);
  expect(mockAgentService.findOne).toHaveBeenCalledWith(usernameCondition);
  expect(Agent).toStrictEqual(AgentsWhithUsername);
});
