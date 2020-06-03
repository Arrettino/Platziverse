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
    username: "Luchito",
    name: "Lucho",
    hostname: "localhost",
    pid: 5,
    connected: false,
  }).catch(handleFatalError);
  console.log(chalk.bgGreen("--create or Update--"));
  console.log(agent);

  //findAll
  const agents = await Agent.findAll().catch(handleFatalError);
  console.log(chalk.bgGreen("--findAll--"));
  console.log(agents);
  //findById
  const conditionId = 1;
  const ById = await Agent.findById(conditionId).catch(handleFatalError);
  console.log(chalk.bgGreen("--findById--"));
  console.log(ById);
  //findById null
  const conditionIdNull = 5;
  const ByIdNull = await Agent.findById(conditionIdNull).catch(
    handleFatalError
  );
  console.log(chalk.bgGreen("--findByIdNull--"));
  console.log(chalk.inverse(ByIdNull));
  //findByUsername
  const UsernameCond = "Arrettino";
  const Username = await Agent.findByUsername(UsernameCond).catch(
    handleFatalError
  );
  console.log(chalk.bgGreen("--findByUsername--"));
  console.log(Username);
  //findByUsernameNull
  const UsernameNullCond = "Arsadasjdbnasiuniawsdewnasbdyvsaurettino";
  const UsernameNull = await Agent.findByUsername(UsernameNullCond).catch(
    handleFatalError
  );
  console.log(chalk.bgGreen("--findByUsernameNull--"));
  console.log(chalk.inverse(UsernameNull));
  //findConnected
  const connecteds = await Agent.findConnected();
  console.log(chalk.bgGreen("--findConnected--"));
  console.log(connecteds);
}

function handleFatalError(e) {
  console.error(chalk.bgRed(e.message));
  console.error(chalk.bgRed(e.stack));
  process.exit(1);
}

run();
