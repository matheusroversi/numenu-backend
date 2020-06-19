"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _authenticate = _interopRequireDefault(require("./middlewares/authenticate"));

var _auth = require("./services/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

const routes = {
  loginPath: "/",
  getMe: "/me",
  getUser: "/user",
  logoutPath: "/auth/logout",
  listCategoriesPath: "/categories",
  listProductsPath: "/products",
  loginStrategyPath: `/auth/${_auth.authStrategy}`,
  loginStrategyCallbackPath: `/auth/${_auth.authStrategy}/callback`,
  homePath: "https://localhost:3003/"
};
router.get(routes.loginPath, (req, res) => {
  if ((0, _auth.isUserLoggedIn)(req)) {
    return res.redirect(routes.homePath);
  }

  return res.render("index", {
    error: req.query.error
  });
});
router.get(routes.listCategoriesPath, (req, res) => {
  res.json(req.app.locals.categoriesDetail);
});
router.get(routes.listProductsPath, (req, res) => {
  res.json(req.app.locals.productsDetail);
});
router.get(routes.getMe, (req, res) => {
  res.json(req.app.locals.meDetail);
});
router.get(routes.getUser, (0, _authenticate.default)(), (req, res) => {
  res.json((0, _auth.currentUser)(req));
});
router.get(routes.loginStrategyPath, (0, _auth.authenticationHandler)());
router.get(routes.loginStrategyCallbackPath, (0, _auth.authenticationCallbackHandler)({
  successRedirect: routes.homePath,
  failureRedirect: routes.loginPath
}));
router.get(routes.logoutPath, (req, res) => {
  (0, _auth.logout)(req);
  res.redirect(routes.homePath);
});
var _default = router;
exports.default = _default;