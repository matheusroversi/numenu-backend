"use strict";

var _app = _interopRequireDefault(require("./app.server"));

var _app2 = require("./app.config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import officeFactory from "./office.factory";
//import healthCheck from "./app.healthcheck";
const {
  host,
  port
} = (0, _app2.getServerConfig)();

const server = _app.default.listen(port, host, undefined, () => {
  console.log(`Running on http://${host}:${port}`);
}); //healthCheck(server);
//officeFactory(server).start();


module.exports = server;