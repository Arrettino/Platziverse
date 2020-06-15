const config = require("./config/config");
const handleFatalError = require("./utils/handleFatalError");
const parsePayload = require("./utils/parsePayload");
const handleError = require("./utils/handleError");
const auth = require('./auth/auth')

module.exports = {
  config,
  auth,
  utils: {
    handleFatalError,
    parsePayload,
    handleError,
  }
};
