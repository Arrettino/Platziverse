const debug = require("debug")("platziverse:mqtt");
const chalk = require("chalk");
const mqemitter = require("mqemitter-child-process");
const redisPersistence = require("aedes-persistence-redis");
const net = require("net");
const database = require("platziverse-db");
const { config, handleFatalError } = require("platziverse-tools");

const client = mqemitter.child();
const port = 1883;
const aedes = require("aedes")();

const server = net.createServer(aedes.handle);

const clients = new Map();
let Agent;
let Metric;

server.listen(1883, (error) => {
  if (!error) {
    console.log(`${chalk.cyan("[ionode-mqtt]:")} server is running`);
  } else {
    handleFatalError(error);
  }
});

server.on("listening", async () => {
  try {
    const service = database(config);
  } catch (err) {
    handleFatalError(err);
  }
});

aedes.on("client", (client) => {
  debug(`[client-connected] : ${client.id}`);
});

aedes.on("clientDisconnect", (client) => {
  debug(`[client-disconnect] : ${client.id}`);
});

aedes.on("publish", (packet, client) => {
  debug(`Received: ${packet.topic}`);
  debug(`Payload: ${packet.payload}`);
});

process.on("uncaughtException", (err) => {
  handleFatalError(err);
});
process.on("unhandledRejection", (err) => {
  handleFatalError(err);
});
