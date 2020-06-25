//server
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const proxy = require("./proxy");
const port = process.env.PORT || 8080;
const cors = require('cors')
//socket.io
const socketio = require("socket.io");
const io = socketio(server);
//path
const path = require("path");
const { dirname } = require("path");
//Agent
const platziverseAgent = require("platziverse-agent");
const agent = new platziverseAgent();
//dev
const debug = require("debug")("platziverse:web");
//utils
const {utils: { handleError, handleFatalError }} = require("platziverse-tools");
const chalk = require("chalk");
const pipe = require("./utils/pipe");

app.use(cors())
app.use(express.static('client/build'));
proxy(app);


io.on('connect', (socket) => {
  console.log(`Connected ${socket.id}`);
  agent.on('agent/message', payload => {
    socket.emit('agent/message',payload)
    console.log('message')
  })
  agent.on('agent/connected',payload=>{
    console.log('connected')
  })
  agent.on('agent/disconnected',payload=>{
    console.log('disconnected')
  })
});

app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)
  
  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }
  
  res.status(500).send({ error: err.message })
})

server.listen(port, () => {
  console.log(`${chalk.green("[platziverse-web]")} server listening on port ${port}`);
  agent.connect();
});

process.on("uncaughtException", (err) => {
  handleFatalError(err);
});
process.on("unhandledRejection", (err) => {
  handleFatalError(err);
});
