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
      const MetricsByType = mockMetric.findByTypeAgentUuid(
        condition.where.type,
        condition.include[0].where.uuid
      );
      return MetricsByType;
    }
    const MetricsByUuid = mockMetric.findByAgentUuid(
      condition.include[0].where.uuid
    );
    return MetricsByUuid;
  }),
};

module.exports = mockMetricService;
