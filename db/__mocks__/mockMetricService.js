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
};

module.exports = mockMetricService;
