const db = require("../index");
const chalk = require("chalk");
async function run() {
  const config = {
    database: process.env.DB_NAME || "platziverse",
    username: process.env.DB_USER || "platzi",
    password: process.env.DB_PASS || "platzi",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    query: {
      raw: true,
    },
  };

  const { Agent, Metric } = await db(config).catch(handleFatalError);
  //createOrUpdate
  const agent = await Agent.createOrUpdate({
    uuid: "aaa-aac",
    name: "Isabel",
    username: "Acosta",
    hostname: "localhost",
    pid: 2,
    connected: false,
  }).catch(handleFatalError);
  console.log(chalk.bgGreen("--createOrUpdate--"));
  console.log(agent);
  //findAll
  const agents = await Agent.findAll().catch(handleFatalError);
  console.log(chalk.bgGreen("--findAll--"));
  console.log(agents);
  //findByUuid
  const conditionUuid = "aaa-aab";
  const ByUuid = await Agent.findByUuid(conditionUuid).catch(handleFatalError);
  console.log(chalk.bgGreen("--findByUuid--"));
  console.log(ByUuid);
  //findByUuid null
  const conditionUuidNull = "aaa-daa";
  const ByUuidNull = await Agent.findByUuid(conditionUuidNull).catch(
    handleFatalError
  );
  console.log(chalk.bgGreen("--byUuidNull--"));
  console.log(chalk.inverse(ByUuidNull));
  //findByUsername
  const UsernameCond = "Arrettino";
  const Username = await Agent.findByUsername(UsernameCond).catch(
    handleFatalError
  );
  console.log(chalk.bgGreen("--findByUsername--"));
  console.log(Username);
  //findConnected
  const connecteds = await Agent.findConnected().catch(handleFatalError);
  console.log(chalk.bgGreen("--findConnected--"));
  console.log(connecteds);
}

function handleFatalError(e) {
  console.error(e.message);
  console.error(e.stack);
  process.exit(1);
}


run();
