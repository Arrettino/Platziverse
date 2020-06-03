function setupMetric(MetricModel, AgentModel) {
  async function create(agentUuid, metric) {
    const agent = await AgentModel.findOne({ where: { uuid: agentUuid } });
    if (agent) {
      metric.agentId = agentUuid;
      const result = await MetricModel.create(metric);
      return result.toJSON();
    }
  }
  async function findByAgentUuid(agentUuid) {
    const metricsByAgentUuid = await MetricModel.findAll({
      attributes: ["type"],
      group: ["type"],
      include: [
        {
          attributes: [],
          model: AgentModel,
          where: {
            uuid: agentUuid,
          },
        },
      ],
      raw: true,
    });
    return metricsByAgentUuid;
  }
  async function findByTypeAgentUuid(metricType, agentUuid) {
    const metricsByTypeAgentUuid = await MetricModel.findAll({
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
            uuid: agentUuid,
          },
        },
      ],
      raw: true,
    });
    return metricsByTypeAgentUuid;
  }

  return {
    create,
    findByAgentUuid,
    findByTypeAgentUuid,
  };
}
module.exports = setupMetric;
