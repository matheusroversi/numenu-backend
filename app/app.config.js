import environment from "./helpers/environment";

export function getME() {
  const meSource = process.env.ME_SOURCE;
  return meSource;
}

export function getCategories() {
  const categoriesSource = process.env.CATEGORIES_SOURCE;
  return categoriesSource;
}

export function getProducts() {
  const productsSource = process.env.PRODUCTS_SOURCE;
  return productsSource;
}

export function shouldEnforceSSL() {
  const enforceSSL = process.env.ENFORCE_SSL || "false";

  return enforceSSL === "true";
}

export function getEnvironment() {
  return process.env.NODE_ENV;
}

export function getSessionConfig() {
  const cookieSessionKey =
    process.env.COOKIE_SESSION_SECRET || "numenu-session";
  const maxAge =
    environment.parseVariable(process.env.COOKIE_SESSION_MAX_AGE) ||
    30 * 24 * 60 * 60 * 1000; // 30 days

  return {
    name: "numenu-session",
    keys: [cookieSessionKey],
    maxAge,
  };
}

export function getAuthConfig() {
  const defaultAuthStrategy = "google";
  const clientID =
    process.env.GOOGLE_CLIENT_ID ||
    "1038749742357-n75fcue19ltln1md2lb0d1l5c8gns7bf.apps.googleusercontent.com";
  const clientSecret = process.env.GOOGLE_SECRET || "0_8oyqYeMmdnqOvRvZjkL5z3";
  const callbackURL =
    process.env.GOOGLE_CALLBACK_URL ||
    "http://localhost:8080/auth/google/callback";

  return {
    authStrategy: defaultAuthStrategy,
    clientID,
    clientSecret,
    callbackURL,
  };
}

export function getAllowedDomains() {
  const allowedDomains = environment.parseVariable(
    process.env.WHITELIST_DOMAINS
  ) || ["*"];
  return allowedDomains;
}

export function getServerConfig() {
  const host = process.env.HOST || "0.0.0.0";
  const port = process.env.PORT || 8080;

  return { host, port };
}
