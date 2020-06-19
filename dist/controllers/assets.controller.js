"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const staticManifestResolver = manifestFile => {
  const manifestData = _fs.default.readFileSync(manifestFile);

  const manifest = JSON.parse(manifestData);
  return () => manifest;
};

const lazyManifestResolver = manifestPath => () => {
  const resolver = staticManifestResolver(manifestPath);
  return resolver();
};

const createAssetsResolver = (manifestResolver, assetsBasePath) => {
  const getAssetUrl = assetName => {
    const manifest = manifestResolver();
    const asset = manifest[assetName] || assetName;
    return `${assetsBasePath}/${asset}`;
  };

  return {
    url: getAssetUrl
  };
};

var _default = {
  staticManifestResolver,
  lazyManifestResolver,
  createAssetsResolver
};
exports.default = _default;