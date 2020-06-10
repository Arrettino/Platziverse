const config = require("./config/config");
const handleFatalError = require("./utils/handleFatalError");
const parsePayload = require("./utils/parsePayload");
const handleError = require("./utils/handleError");

module.exports = {
  config,
  utils: {
    handleFatalError,
    parsePayload,
    handleError,
  }
};
