const chalk = require('chalk')

function handleError(error) {
    console.error(chalk.red(`[fatal-error]: ${error.message}`));
    console.error(error.stack);
  }

module.exports = handleError