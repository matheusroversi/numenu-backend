"use strict";

var _environment = _interopRequireDefault(require("./environment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe(".parseVariable()", () => {
  it("should return undefined when variable is undefined", () => {
    expect(_environment.default.parseVariable()).toBeUndefined();
  });
  it("should return undefined when variable is null", () => {
    expect(_environment.default.parseVariable(null)).toBeUndefined();
  });
  it("should return undefined when variable is empty string", () => {
    expect(_environment.default.parseVariable("")).toBeUndefined();
  });
  it("should return parsed object", () => {
    expect(_environment.default.parseVariable("{\"someProps\":true}")).toEqual({
      someProps: true
    });
  });
  it("should return parsed array", () => {
    expect(_environment.default.parseVariable("[1,2,3]")).toEqual([1, 2, 3]);
  });
  it("should return parsed number", () => {
    expect(_environment.default.parseVariable("852")).toEqual(852);
  });
});