const mockAgent = require("./mockAgent");

const mockAgentService = {
  hasMany: jest.fn(),
  findAll: jest.fn((condition = false) => {
    if (condition) {
      if (condition.where.connected) {
        return mockAgent.findConnected;
      }
      if (condition.where.username) {
        return mockAgent.findByUsername(condition.where.username);
      }
    }
    return mockAgent.findAll;
  }),
  findOne: jest.fn((condition) => {
    if(condition.where.id){
      const agent = mockAgent.findById(condition.where.id)
      return Promise.resolve(agent)
    }
    const agent = mockAgent.findByUsername(condition.where.username);
    return Promise.resolve(agent[0]);
  }),
  findById: jest.fn((id) => { 
    Id= parseInt(id)
    return mockAgent.findById(Id)}),
  update: jest.fn(() => Promise.resolve(mockAgent.findOne)),
  create: jest.fn((Agent) =>
    Promise.resolve({
      // When create an user the function return created.toJSON
      // so this is the mock implementation for that functionality
      toJSON() {
        return Agent;
      },
    })
  ),
};
module.exports = mockAgentService;

  