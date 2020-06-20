"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const me = {
  name: "Quintal",
  logo: "https://storage.googleapis.com/vendizap-categorias/cd1f793be1c5baa18e550901a3c20820.jpg",
  userId: {
    $oid: "5eaccc563c61db1ddb312725"
  },
  shipping: {
    type: "table",
    value: [{
      min: 0,
      max: 39.99,
      value: 10
    }, {
      min: 40,
      max: 59.99,
      value: 5
    }, {
      min: 60,
      value: 0
    }]
  }
};
var _default = me;
exports.default = _default;