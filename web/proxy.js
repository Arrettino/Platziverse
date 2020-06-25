const express = require("express");
const { endpoint, apiToken } = require("./config");
const fetch = require("node-fetch");

async function proxy(app) {
  const router = express.Router();
  app.use("", router);

  router.get("/agents", async (req, res, next) => {
    const url = `${endpoint}/api/agents`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiToken}`
      },
    };
    let result;

    try {
      result = await fetch(url, options);
      const data = await result.json();
      res.send(data);
    } catch (e) {
      return next(e);
    }
  });

  router.get("/agent/:id", (req, res, next) => {});

  router.get("/metrics/:id", (req, res, next) => {});                                                          

  router.get("/metrics/:id/:type", async(req, res, next) => {   
    const { id, type } = req.params;
    const url = ` ${endpoint}/api/metrics/${id}/${type}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      mode:'corse'
    };
    let result;
    
    try {
      result = await fetch(url, options);
      const data = await result.json();
      res.send(data);
    } catch (e) {
      return next(e);
    }
  });
}
module.exports = proxy;
