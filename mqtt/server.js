const debug = require("debug")("platziverse:mqtt");
const chalk = require("chalk");
const mqemitter = require("mqemitter-child-process");
const redisPersistence = require("aedes-persistence-redis");
const net = require("net");
const database = require("platziverse-db");
const {
  config,
  utils: { handleFatalError, parsePayload, handleError },
} = require("platziverse-tools");

const client = mqemitter.child();
const port = 1883;
const aedes = require("aedes")();

const server = net.createServer(aedes.handle);

const clients = new Map();
let Agent;
let Metric;

server.listen(port, (error) => {
  if (!error) {
    console.log(`${chalk.cyan("[ionode-mqtt]:")} server is running`);
  } else {
    handleFatalError(error);
  }
});

server.on("listening", async () => {
  try {
    const service = await database(config);
    Agent = service.Agent;
    Metric = service.Metric;
  } catch (err) {
    handleFatalError(err);
  }
});

aedes.on("client", (client) => {
  debug(`[client-connected] : ${client.id}`);
  clients.set(client.id, null);
});

aedes.on("publish", async (packet, client) => {
  debug(`Received: ${packet.topic}`);
  switch (packet.topic) {
    case "agent/connected":
    case "agent/disconnected":
      debug(`Payload: ${packet.payload}`);
      break;
    case "agent/message":
      const payload = parsePayload(packet.payload);
      if (payload) {
        let agent;

        try {
          agent = await Agent.createOrUpdate({
            ...payload.agent,
            connected: true,
          });
        } catch (err) {
          return handleError(err);
        }
        debug(`Agent ${agent.id} saved`);

        if (!clients.get(client.id)) {
          clients.set(client.id, agent)
        // publish the connected agent
          aedes.publish({
            topic: 'agent/connected',
            payload: JSON.stringify({
              agent: {
                id:agent.id,
                username: agent.username,
                name: agent.name,
                hostname: agent.hostname,
                pid: agent.pid,
                connected: agent.connected
              }
            })
          })
        }
        for (let metric of payload.metrics) {
          let m;
          try {
            m = await Metric.create(agent.id, metric);
          } catch (err) {
            return handleError(err);
          }
          debug(`Metric ${m.id} saved on agent ${agent.uuid}`);
        }
      }
      break;
  }
});

aedes.on("clientDisconnect", async (client) => {
  debug(`[client-disconnect] : ${client.id}`);
  const agent = clients.get(client.id);

  if (agent) {
    try {
      await Agent.createOrUpdate({ ...agent, connected: false });
    } catch (err) {
      handleError(err);
    }

    clients.delete(client.id);

    aedes.publish({
      topic: "agent/disconnected",
      payload: JSON.stringify({
        agent: {
          id: agent.id,
        },
      }),
    });

    debug(
      `Client (${client.id}) associeted to Agent (${agent.id}) marked as disconnected`
    );
  }
});

process.on("uncaughtException", (err) => {
  handleFatalError(err);
});
process.on("unhandledRejection", (err) => {
  handleFatalError(err);
});
