const service = require("./service");
const { dispatchError } = require("./util");

if (require.main === module) {
  try {
    service();
  } catch (error) {
    dispatchError(error);
  }

  process.on("uncaughtException", dispatchError);
}

module.exports = service;
