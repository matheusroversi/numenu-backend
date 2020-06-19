"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = authenticate;

var _auth = require("../services/auth");

function authenticate(opts) {
  const loginPath = opts === null || opts === void 0 ? void 0 : opts.loginPath;
  return (req, resp, next) => {
    if ((0, _auth.isUserLoggedIn)(req)) {
      return next();
    }

    if (loginPath) {
      return resp.status(401).redirect(loginPath);
    }

    resp.sendStatus(401);
  };
}