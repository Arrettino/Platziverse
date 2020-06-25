const http = require("http");
const express = require("express");
const chalk = require("chalk");
const database = require("platziverse-db");
const routes = require("./api");
const {
  utils: { handleError, handleFatalError },
} = require("platziverse-tools");

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

routes(app);

app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`);

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message });
  }

  res.status(500).send({ error: err.message });
});

process.on("uncaughtException", handleFatalError);
process.on("unhandledRejection", handleFatalError);

server.listen(port, () => {
  console.log(
    `${chalk.green("[platziverse-api]")} server listening on port ${port} `
  );
});
