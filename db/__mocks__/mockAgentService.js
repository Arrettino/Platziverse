const mockAgent = require("./mockAgent");

const Agents = mockAgent.findAll;
const id = mockAgent.findOne.id;
const uuid = mockAgent.findOne.uuid;
const uuidCond = { where: { uuid } };

const mockAgentService = {
  hasMany: jest.fn(),
  findOne: jest.fn((condition) => {
    for (let key in Agents) {
      if (condition.where.uuid === Agents[key].uuid) {
        return Agents[key];
      }
      return false;
    }
  }),
  findByPk: jest.fn(() => Promise.resolve(mockAgent.findById(id))),
  update: jest.fn(() => Promise.resolve(mockAgent.findOne)),
};
module.exports = mockAgentService;
