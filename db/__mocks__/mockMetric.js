const mockAgent = require("./mockAgent");

const metrics = [
  {
    id: 1,
    type: "memory",
    value: 100,
    createdAt: "2019-11-13",
    agentId: 1,
  },
];

const newMetric = {
  id: 2,
  type: "memory",
  value: 20,
  createdAt: "2019-11-15",
  agentId: "4bf",
};

module.exports = {
  findOne: metrics[0],
  newMetric,
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
