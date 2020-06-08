const debug = require("debug")("platziverse:mqtt");
const chalk = require("chalk");
const mqemitter = require("mqemitter-child-process");
const redisPersistence = require("aedes-persistence-redis");
const net = require("net");
const database = require("platziverse-db");

const client = mqemitter.child();
const port = 1883;
const aedes = require("aedes")();

const database_config = {
  database: process.env.DB_NAME || "platziverse",
  username: process.env.DB_USER || "platzi",
  password: process.env.DB_PASS || "platzi",
  host: process.env.DB_HOST || "localhost",
  dialect: "postgres",
  query: {
    raw: true,
  },
};

const server = net.createServer(aedes.handle);

const clients = new Map();
let Agent;
let Metric;

server.listen(port, () => {
  try {
    console.log(chalk.cyan("[ionode-mqtt] server is running..."));
  } catch (error) {
    handleFatalError(error);
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

process.on("uncaughtException", handleFatalError);
process.on("unhandledRejection", handleFatalError);

function handleFatalError(error) {
  console.error(chalk.red(`[fatal-error]: ${error.message}`));
  console.error(error.stack);
  process.exit(1);
}
