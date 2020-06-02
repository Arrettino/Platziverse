function setupMetric(MetricModel,AgentModel) {
  async function create(agentUuid, metric) {
    const agent = await AgentModel.findOne({where:{uuid:agentUuid}});
    if (agent) {
      metric.agentId = agentUuid
      const result = await MetricModel.create(metric);
      return result.toJSON();
    }
  }
  return {
    create,
  };
}
module.exports = setupMetric;
