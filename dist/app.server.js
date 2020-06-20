"use strict";

var _express = _interopRequireDefault(require("express"));

var _cookieSession = _interopRequireDefault(require("cookie-session"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _assets = _interopRequireDefault(require("./controllers/assets.controller"));

var _app = _interopRequireDefault(require("./app.routes"));

var _auth = require("./services/auth");

var _categories = _interopRequireDefault(require("./services/categories"));

var _products = _interopRequireDefault(require("./services/products"));

var _me = _interopRequireDefault(require("./services/me"));

var _app2 = require("./app.config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const PUBLIC_URL = process.env.PUBLIC_URL || "http://localhost:3000"; //app.use(morgan("tiny"));

app.use((0, _cookieSession.default)((0, _app2.getSessionConfig)()));
app.use(_bodyParser.default.urlencoded({
  extended: false
})); // set the template engine ejs

app.set("view engine", "ejs");
app.set("views", "./app/views"); // use authentication

(0, _auth.setupAppAuth)(app);
app.use((0, _cors.default)({
  origin: [`${PUBLIC_URL}`],
  credentials: true
}));
app.use("/", _express.default.static(_path.default.join(__dirname, "..", "dist")));

const assetsManifestFile = _path.default.join(__dirname, "..", "dist", "manifest.json");

const assetsManifestResolver = (0, _app2.getEnvironment)() === "production" ? _assets.default.staticManifestResolver(assetsManifestFile) : _assets.default.lazyManifestResolver(assetsManifestFile);
app.locals.assets = _assets.default.createAssetsResolver(assetsManifestResolver, "/dist");
app.use((req, res, next) => {
  const isSecure = req.secure || req.header("x-forwarded-proto") === "https";

  if ((0, _app2.shouldEnforceSSL)() && !isSecure) {
    res.redirect(`https://${req.hostname}${req.url}`);
  } else {
    next();
  }
});
app.use(_app.default);
(0, _me.default)().then(meData => {
  app.locals.meDetail = meData;
}).catch(err => {
  console.error(err);
});
(0, _categories.default)((0, _app2.getCategories)()).then(categoriesData => {
  app.locals.categoriesDetail = categoriesData;
}).catch(err => {
  console.error(err);
});
(0, _products.default)((0, _app2.getProducts)()).then(productsData => {
  app.locals.productsDetail = productsData;
}).catch(err => {
  console.error(err);
});
module.exports = app;