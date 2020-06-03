const mockMetric = require("./mockMetric");

const mockMetricService = {
  belongsTo: jest.fn(),
  create: jest.fn((Metric) =>
    Promise.resolve({
      toJSON() {
        return Metric;
      },
    })
  ),
  findAll: jest.fn((condition) => {
    if (condition.limit) {
      const MetricsByType = mockMetric.findByTypeAgentId(
        condition.where.type,
        condition.include[0].where.id
      );
      return MetricsByType;
    }
    const MetricsByUuid = mockMetric.findByAgentId(
      condition.include[0].where.uuid
    );
    return MetricsByUuid;
  }),
};

module.exports = mockMetricService;
