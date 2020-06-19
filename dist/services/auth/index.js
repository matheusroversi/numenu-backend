"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupAppAuth = setupAppAuth;
exports.authenticationHandler = authenticationHandler;
exports.authenticationCallbackHandler = authenticationCallbackHandler;
exports.currentUser = currentUser;
exports.isUserLoggedIn = isUserLoggedIn;
exports.logout = logout;
exports.getMe = getMe;
exports.authStrategy = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _app = require("../../app.config");

var _authorization = require("./authorization");

var _strategy = require("./strategy");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authConfig = (0, _app.getAuthConfig)();
const isAuthorized = (0, _authorization.domainAuthorization)((0, _app.getAllowedDomains)());

_passport.default.use((0, _strategy.buildAuthStrategy)(authConfig, isAuthorized));

_passport.default.serializeUser((user, done) => done(null, user));

_passport.default.deserializeUser((user, done) => done(null, user));

const authStrategy = authConfig.authStrategy;
exports.authStrategy = authStrategy;

function setupAppAuth(app) {
  app.use(_passport.default.initialize());
  app.use(_passport.default.session());
}

function authenticationHandler() {
  return _passport.default.authenticate(authStrategy, {
    scope: ["profile", "email"]
  });
}

function authenticationCallbackHandler({
  successRedirect,
  failureRedirect
}) {
  return function (req, resp, next) {
    const redirectToFailure = err => {
      const errorMessage = err || "";
      resp.status(401).redirect(`${failureRedirect}?error=${encodeURIComponent(errorMessage)}`);
    };

    _passport.default.authenticate(authStrategy, function (err, profile) {
      if (err) {
        return redirectToFailure(err);
      }

      if (!profile) {
        return redirectToFailure();
      }

      req.login(profile, err => {
        if (err) {
          return redirectToFailure(err);
        }

        resp.redirect(successRedirect);
      });
    })(req, resp, next);
  };
}

function currentUser(req) {
  return req.user;
}

function isUserLoggedIn(req) {
  return !!currentUser(req);
}

function logout(req) {
  req.logout();
}

function getMe(req) {
  return req.user;
}