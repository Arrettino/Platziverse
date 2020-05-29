const debug = require("debug")("platziverse:db:setup");
const inquirer = require("inquirer");
const chalk = require("chalk");
const db = require("./");

const prompt = inquirer.createPromptModule();

async function answer() {
  const answer = await prompt([
    {
      type: "confirm",
      name: "setup",
      message: "This will be destroy your database, are you sure?",
    },
  ]);
  if (!answer.setup) {
    console.log(chalk.inverse("Script Canceled"));
    return process.exit(0);
  }
}
async function setup() {
  await answer();
  const config = {
    database: process.env.DB_NAME || "platziverse",
    username: process.env.DB_USER || "platzi",
    password: process.env.DB_PASS || "platzi",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: (s) => debug(s),
    setup: true,
  };

  try {
    await db(config);
    console.log(chalk.bgGreen("Success!"));
    process.exit(0);
  } catch (e) {
    console.error(e.message);
    console.error(e.stack);
    process.exit(1);
  }
}

setup();
