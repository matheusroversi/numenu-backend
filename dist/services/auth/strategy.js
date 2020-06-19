"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.googleProfileToMatrixProfile = googleProfileToMatrixProfile;
exports.buildAuthStrategy = buildAuthStrategy;

var _passportGoogleOauth = require("passport-google-oauth20");

function googleProfileToMatrixProfile(profile) {
  var _emails$, _photos$;

  const {
    id,
    emails,
    displayName: name,
    photos,
    provider
  } = profile;
  const email = emails === null || emails === void 0 ? void 0 : (_emails$ = emails[0]) === null || _emails$ === void 0 ? void 0 : _emails$.value;
  const imageUrl = photos === null || photos === void 0 ? void 0 : (_photos$ = photos[0]) === null || _photos$ === void 0 ? void 0 : _photos$.value;
  return {
    id,
    imageUrl,
    provider,
    name,
    email
  };
}

function buildAuthStrategy({
  clientID,
  clientSecret,
  callbackURL
}, isAuthorized) {
  return new _passportGoogleOauth.Strategy({
    clientID,
    clientSecret,
    callbackURL
  }, (accessToken, refreshToken, googleProfile, cb) => {
    const profile = googleProfileToMatrixProfile(googleProfile);
    /* if (!isAuthorized(profile)) {
      return cb(new Error(`E-mail ${profile.email} is not authorized`));
    } */

    return cb(undefined, profile);
  });
}