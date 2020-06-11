const http = require("http");
const express = require("express");
const chalk = require("chalk");
const database = require("platziverse-db");
const routes = require("./api");

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

routes(app);

server.listen(port, () => {
  console.log(
    `${chalk.green("[platziverse-api]")} server listening on port ${port} `
  );
});
