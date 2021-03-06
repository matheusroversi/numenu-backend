"use strict";

var _strategy = require("./strategy");

describe("googleProfileToMatrixProfile()", () => {
  const defaultProfile = {
    id: "abc-123",
    emails: [{
      value: "neo@matrix.com"
    }],
    displayName: "Neo",
    photos: [{
      value: "neo-in-zion.png"
    }],
    provider: "google"
  };
  const defaultResult = {
    id: "abc-123",
    imageUrl: "neo-in-zion.png",
    provider: "google",
    name: "Neo",
    email: "neo@matrix.com"
  };
  it("should adapt google profile", () => {
    expect((0, _strategy.googleProfileToMatrixProfile)(defaultProfile)).toEqual(defaultResult);
  });
  it("should adapt without email", () => {
    const profile = { ...defaultProfile,
      emails: undefined
    };
    expect((0, _strategy.googleProfileToMatrixProfile)(profile)).toEqual({ ...defaultResult,
      email: undefined
    });
  });
  it("should adapt with empty email", () => {
    const profile = { ...defaultProfile,
      emails: []
    };
    expect((0, _strategy.googleProfileToMatrixProfile)(profile)).toEqual({ ...defaultResult,
      email: undefined
    });
  });
  it("should adapt without photo", () => {
    const profile = { ...defaultProfile,
      photos: undefined
    };
    expect((0, _strategy.googleProfileToMatrixProfile)(profile)).toEqual({ ...defaultResult,
      imageUrl: undefined
    });
  });
  it("should adapt with empty photo", () => {
    const profile = { ...defaultProfile,
      photos: []
    };
    expect((0, _strategy.googleProfileToMatrixProfile)(profile)).toEqual({ ...defaultResult,
      imageUrl: undefined
    });
  });
});