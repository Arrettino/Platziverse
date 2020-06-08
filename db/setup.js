const debug = require("debug")("platziverse:db:setup");
const inquirer = require("inquirer");
const chalk = require("chalk");
const db = require("./");
const { config, handleFatalError } = require('platziverse-tools');

const prompt = inquirer.createPromptModule();

function getCommandFlags() {
  return process.argv.filter(
    (val) => val.startsWith("--") || val.startsWith("-")
  );
}

async function validateAutomatedFlag() {
  const validate =
    getCommandFlags().filter((val) => val === "-y" || val === "--yes").length >
    0;
  if (!validate) {
    await answer();
  }
}

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
  await validateAutomatedFlag();
  const databaseConfig = config
  databaseConfig.logging =(s) => debug(s),
  databaseConfig.setup= true
  databaseConfig.database=jose
  

  try {
    await db(databaseConfig);
    console.log(chalk.bgGreen("Success!"));
    process.exit(0);
  } catch (err) {
    handleFatalError(err)
  }
}

setup();
