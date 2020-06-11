const express = require("express");

const api = express.Router();

async function servicesApi(app) {
  const router = express.Router();
  app.use("/api", router);

  router.get("/agents", (req, res) => {
    res.send({});
  });

  router.get("/agent/:id", (req, res) => {
    const { id } = req.params;
    res.send({ id });
  });

  router.get("/metrics/:id", (req, res) => {
    const { id } = req.params;
    res.send({ id });
  });

  router.get("/metrics/:id/:type", (req, res) => {
    const { id, type } = req.params;
    res.send({ id, type });
  });
}

module.exports = servicesApi;
