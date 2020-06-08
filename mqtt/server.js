const debug = require('debug')('platziverse:mqtt')
const chalk = require('chalk')
const mqemitter = require('mqemitter-child-process')
const redisPersistence = require('aedes-persistence-redis')
const net = require('net')

const client = mqemitter.child()
const port = 1883
const aedes = require('aedes')()

const server = net.createServer(aedes.handle)

server.listen(port, () => {
  try {
    console.log(chalk.cyan('[ionode-mqtt] server is running...'))
  } catch (error) {
    console.log(chalk.red(`[Error] ${error.message}`))
    console.log(error.stack)
    process.exit(1)
  }
})

