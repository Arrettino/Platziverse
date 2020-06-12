const mockMetric = require("./mockMetric");
const { findByTypeAgentId } = require("./mockMetric");

const mockMetricService = {
  belongsTo: jest.fn(),
  findByAgentId:jest.fn((id)=>{
    Id= parseInt(id)
    return (mockMetric.findByAgentId(Id))
  }),
  findByTypeAgentId:jest.fn((type,id)=>{
    Id=parseInt(id)
    return findByTypeAgentId(type,Id)

  })
};

module.exports = mockMetricService;