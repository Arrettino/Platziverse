const mockAgent = require("../__mocks__/mockAgent");
const mockService = require("../__mocks__/mockMetric");
const mockAgentService = require("../__mocks__/mockAgentService");
const mockMetricService = require("../__mocks__/mockMetricService");
jest.mock("platziverse-db", () =>
  jest.fn().mockResolvedValue({
    Agent: mockAgentService,
    Metric: mockMetricService,
  })
);

const jwt = require("jsonwebtoken");
const serverTest = require("../utils/testServer");
const routes = require("../api");
const { auth } = require("platziverse-tools");

const agent = mockAgent.findOne;
const agentId = agent.id;

describe("routes api test", () => {
  let request = null;
  let token = null;

  beforeEach(() => {
    request = serverTest(routes);
    token = jwt.sign({ username: "jabriel", admin: true }, auth.secret);
  });

  test("It should response the GET method", async () => {
    const response = await request
      .get("/api/agents")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("content-Type", /json/);

    const body = response.body;
    const expected = await mockAgentService.findAll();
    expect(body).toEqual(expected);
  });
  test("It should response the GET method", async () => {
    const response = await request
      .get(`/api/agent/${agentId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("content-Type", /json/);
    const expected = await mockAgentService.findById(agentId);
    const body = response.body;
    expect(body).toEqual(expected);
  });

  test("It should response the GET method", async () => {
    const response = await request
      .get(`/api/metrics/${agentId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("content-Type", /json/);
    body = response.body;
    const expected = mockMetricService.findByAgentId(agentId);
    expect(body).toEqual(expected);
  });

  test("It should response the GET method", async () => {
    const type = "disk";
    const response = await request
      .get(`/api/metrics/${agentId}/${type}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("content-Type", /json/);

    body = response.body;
    expected = await mockMetricService.findByAgentId(type, agentId);
    expect(body).toEqual(expected);
  });
});
