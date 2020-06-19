"use strict";

var _terminus = require("@godaddy/terminus");

var _rooms = _interopRequireDefault(require("./services/rooms"));

var _app = require("./app.config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function onHealthCheck() {
  // checks if the system is healthy,
  // we can add the checks here as needed
  return Promise.all([(0, _rooms.default)((0, _app.getRoomsSource)())]);
}

module.exports = server => {
  (0, _terminus.createTerminus)(server, {
    healthChecks: {
      "/healthz": onHealthCheck,
      verbatim: true
    }
  });
};