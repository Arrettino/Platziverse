const mockAgent = require("./mockAgent");

const metrics = [
  {
    id: 1,
    type: "memory",
    value: 100,
    createdAt: "2019-11-13",
    agentId: 1,
  },
  {
    id: 2,
    type: "disk",
    value: 50,
    createdAt: "2019-09-29",
    agentId: 4,
  },
  {
    id: 3,
    type: "memory",
    value: 60,
    createdAt: "2019-11-13",
    agentId: 3,
  },
  {
    id: 4,
    type: "tasks",
    value: 10,
    createdAt: "2019-04-24",
    agentId: 5,
  },
  {
    id: 5,
    type: "memory",
    value: 100,
    createdAt: "2019-10-30",
    agentId: 2,
  },
  {
    id: 6,
    type: "memory",
    value: 100,
    createdAt: "2019-11-13",
    agentId: 5,
  },
  {
    id: 7,
    type: "disk",
    value: 50,
    createdAt: "2019-09-29",
    agentId: 4,
  },
  {
    id: 8,
    type: "memory",
    value: 60,
    createdAt: "2019-11-13",
    agentId: 3,
  },
  {
    id: 9,
    type: "tasks",
    value: 10,
    createdAt: "2019-04-24",
    agentId: 2,
  },
  {
    id: 10,
    type: "memory",
    value: 100,
    createdAt: "2019-10-30",
    agentId: 1,
  },
];

module.exports = {
  findOne: metrics[0],
  findByAgentUuid: (agentUuid) => {
    return metrics.filter(
      (metric) => metric.agentId === mockAgent.findByUuid(agentUuid)
    );
  },
  findByTypeAgentUuid: (type, agentUuid) => {
    return metrics.filter((metric) => {
      return (
        metric.type === type &&
        metric.agentId === mockAgent.findByUuid(agentUuid)
      );
    });
  },
};
