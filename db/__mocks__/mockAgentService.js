const mockAgent = require("./mockAgent");

const id = mockAgent.findOne.id;

const mockAgentService = {
  hasMany: jest.fn(),
  findByPk: jest.fn(() => Promise.resolve(mockAgent.findById(id))),
};
module.exports = mockAgentService;
