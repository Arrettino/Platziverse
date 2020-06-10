const express = require("express");

const api = express.Router();

api.get("/agents", (req, res) => {
  res.send({});
});

api.get("/agent/:id", (req, res) => {
  const { id } = req.params;
  res.send({ id });
});

api.get("/metrics/:id", (req, res) => {
  const { id } = req.params;
  res.send({ id });
});

api.get("/metrics/:id/:type", (req, res) => {
  const { id, type } = req.params;
  res.send({ id, type });
});

module.exports = api;
