"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _request = _interopRequireDefault(require("request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const roomFilePath = "../file/menu.categories.web.json";

const fetchFromFile = () => new Promise((resolve, reject) => {
  try {
    const roomsData = _fs.default.readFileSync(roomFilePath);

    const roomsDetail = JSON.parse(roomsData);
    resolve(roomsDetail);
  } catch (error) {
    reject(error);
  }
});

const fetchFromEnvironment = env => new Promise((resolve, reject) => {
  try {
    const roomsData = env.ROOMS_DATA;
    const roomsDetail = JSON.parse(roomsData);
    resolve(roomsDetail);
  } catch (error) {
    reject(error);
  }
});

const fetchFromRemote = env => {
  const url = env.ROOMS_DATA;
  return new Promise((resolve, reject) => {
    (0, _request.default)(url, (error, response, body) => {
      // in addition to parsing the value, deal with possible errors
      if (error) return reject(error);

      try {
        // JSON.parse() can throw an exception if not valid JSON
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  });
};

const fetchRooms = strategy => {
  switch (strategy) {
    case "ENVIRONMENT":
      return fetchFromEnvironment(process.env);

    case "REMOTE":
      return fetchFromRemote(process.env);

    default:
      return fetchFromFile();
  }
};

var _default = fetchRooms;
exports.default = _default;