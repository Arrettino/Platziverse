const express = require("express");
const { config } = require("platziverse-tools");
const database = require("platziverse-db");

async function servicesApi(app) {
  const router = express.Router();

  let service = null;
  let Agent = null;
  let Metric = null;

  if (!service) {
    service = await database(config);
    Agent = service.Agent;
    Metric = service.Metric;
  }

  app.use("/api", router);

  router.get("/agents", async (req, res, next) => {
    let agents = [];
    try {
      agents = await Agent.findAll();
    } catch (error) {
      next(error);
    }

    res.send(agents);
  });

  router.get("/agent/:id", async (req, res, next) => {
    const { id } = req.params;
    let agent = null;
    try {
      agent = await Agent.findById(id);
    } catch (error) {
      next(error);
    }
    res.send(agent);
  });

  router.get("/metrics/:id", async (req, res, next) => {
    const { id } = req.params;
    let metric_type = null;
    try {
      metric_type = await Metric.findByAgentId(id);
    } catch (error) {
      next(error);
    }
    res.send(metric_type);
  });

  router.get("/metrics/:id/:type", async (req, res, next) => {
    const { id, type } = req.params;
    let metricsType = null
    try{
      metricsType = await Metric.findByTypeAgentId(type,id)
    }catch(error){
      next(error)
    }
    res.send(metricsType);
  });
}

module.exports = servicesApi;
