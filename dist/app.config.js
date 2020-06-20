"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getME = getME;
exports.getCategories = getCategories;
exports.getProducts = getProducts;
exports.shouldEnforceSSL = shouldEnforceSSL;
exports.getEnvironment = getEnvironment;
exports.getSessionConfig = getSessionConfig;
exports.getAuthConfig = getAuthConfig;
exports.getAllowedDomains = getAllowedDomains;
exports.getServerConfig = getServerConfig;

var _environment = _interopRequireDefault(require("./helpers/environment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getME() {
  const meSource = process.env.ME_SOURCE;
  return meSource;
}

function getCategories() {
  const categoriesSource = process.env.CATEGORIES_SOURCE;
  return categoriesSource;
}

function getProducts() {
  const productsSource = process.env.PRODUCTS_SOURCE;
  return productsSource;
}

function shouldEnforceSSL() {
  const enforceSSL = process.env.ENFORCE_SSL || "false";
  return enforceSSL === "true";
}

function getEnvironment() {
  return process.env.NODE_ENV;
}

function getSessionConfig() {
  const cookieSessionKey = process.env.COOKIE_SESSION_SECRET || "numenu-session";
  const maxAge = _environment.default.parseVariable(process.env.COOKIE_SESSION_MAX_AGE) || 30 * 24 * 60 * 60 * 1000; // 30 days

  return {
    name: "numenu-session",
    keys: [cookieSessionKey],
    maxAge
  };
}

function getAuthConfig() {
  const defaultAuthStrategy = "google";
  const clientID = process.env.GOOGLE_CLIENT_ID || "1038749742357-n75fcue19ltln1md2lb0d1l5c8gns7bf.apps.googleusercontent.com";
  const clientSecret = process.env.GOOGLE_SECRET || "0_8oyqYeMmdnqOvRvZjkL5z3";
  const callbackURL = process.env.GOOGLE_CALLBACK_URL || "http://localhost:8080/auth/google/callback";
  return {
    authStrategy: defaultAuthStrategy,
    clientID,
    clientSecret,
    callbackURL
  };
}

function getAllowedDomains() {
  const allowedDomains = _environment.default.parseVariable(process.env.WHITELIST_DOMAINS) || ["*"];
  return allowedDomains;
}

function getServerConfig() {
  const host = "0.0.0.0";
  const port = process.env.PORT || 8080;
  console.log("#####", process.env);
  return {
    host,
    port
  };
}