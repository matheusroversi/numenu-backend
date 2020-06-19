"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _request = _interopRequireDefault(require("request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productsFilePath = "../file/menu.products.web.json";

const fetchFromFile = () => new Promise((resolve, reject) => {
  try {
    const productsData = _fs.default.readFileSync(productsFilePath);

    const productsDetail = JSON.parse(productsData);
    resolve(productsDetail);
  } catch (error) {
    reject(error);
  }
});

const fetchFromEnvironment = env => new Promise((resolve, reject) => {
  try {
    const productsData = env.products_DATA;
    const productsDetail = JSON.parse(productsData);
    resolve(productsDetail);
  } catch (error) {
    reject(error);
  }
});

const fetchFromRemote = env => {
  const url = env.products_DATA;
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

const fetchproducts = strategy => {
  switch (strategy) {
    case "ENVIRONMENT":
      return fetchFromEnvironment(process.env);

    case "REMOTE":
      return fetchFromRemote(process.env);

    default:
      return fetchFromFile();
  }
};

var _default = fetchproducts;
exports.default = _default;