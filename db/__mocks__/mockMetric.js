const mockAgent = require("./mockAgent");

const metrics = [
  {
    id: 1,
    type: "memory",
    value: 100,
    createdAt: "2019-11-13",
    agentId: "4bf322ab-d9f7-4166-a99b-f004203fb7de",
  },
  {
    id: 2,
    type: "memory",
    value: 50,
    createdAt: "2019-11-13",
    agentId: "4bf322ab-d9f7-4166-a99b-f004203fb7de",
  },
  {
    id: 3,
    type: "disk",
    value: 50,
    createdAt: "2019-11-13",
    agentId: "4bf322ab-d9f7-4166-a99b-f004203fb7de",
  },
  {
    id: 4,
    type: "memory",
    value: 50,
    createdAt: "2019-11-13",
    agentId: "5bf322ab",
  },
];

const newMetric = {
  type: "memory",
  value: 20,
};

module.exports = {
  findOne: metrics[0],
  newMetric,
  findByAgentUuid: (agentUuid) => {
    return metrics.filter((metric) => metric.agentId === agentUuid);
  },
  findByTypeAgentUuid: (type, agentUuid) => {
    return metrics.filter((metric) => {
      return metric.type === type && metric.agentId === agentUuid;
    });
  },
};
