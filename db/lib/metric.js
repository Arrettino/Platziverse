function setupMetric(MetricModel, AgentModel) {
  async function create(agentId, metric) {
    const agent = await AgentModel.findOne({ where: { id: agentId } });
    if (agent) {
      metric.agentId = agentId;
      const result = await MetricModel.create(metric);
      return result.toJSON();
    }
  }
  async function findByAgentId(agentId) {
    const metricsByAgentUuid = await MetricModel.findAll({
      attributes: ["type"],
      group: ["type"],
      include: [
        {
          attributes: [],
          model: AgentModel,
          where: {
            id: agentId,
          },
        },
      ],
      raw: true,
    });
    return metricsByAgentUuid;
  }
  async function findByTypeAgentId(metricType, agentId) {
    const metricsByTypeAgentId = await MetricModel.findAll({
      attributes: ["id", "type", "value", "createdAt"],
      where: {
        type: metricType,
      },
      limit: 20,
      order: [["createdAt", "DESC"]],
      include: [
        {
          attributes: [],
          model: AgentModel,
          where: {
            id: agentId,
          },
        },
      ],
      raw: true,
    });
    return metricsByTypeAgentId;
  }

  return {
    create,
    findByAgentId,
    findByTypeAgentId,
  };
}
module.exports = setupMetric;
