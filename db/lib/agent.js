function setupAgent(AgentModel) {
  async function createOrUpdate(agent) {
    const cond = { where: { uuid: agent.uuid } };
    const existingAgent = await AgentModel.findOne(cond);
    if (existingAgent) {
      const update = await AgentModel.update(agent, cond);
      return update ? AgentModel.findOne(cond) : existingAgent;
    }
    const result = await AgentModel.create(agent);
    return result.toJSON();
  }

  async function findAll() {
    const Agents = AgentModel.findAll();
    return Agents;
  }

  async function findByUuid(uuid) {
    const cond = { where: { uuid } };
    const Agents = await AgentModel.findOne(cond);
    return Agents;
  }

  async function findByUsername(username) {
    const cond = { where: { username } };
    const Agents = await AgentModel.findAll(cond);
    return Agents;
  }

  async function findConnected() {
    const cond = { where: { connected: true } };
    const connectedAgents = await AgentModel.findAll(cond);
    return connectedAgents;
  }

  return {
    createOrUpdate,
    findConnected,
    findAll,
    findByUuid,
    findByUsername,
  };
}
module.exports = setupAgent;
