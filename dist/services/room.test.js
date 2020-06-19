"use strict";

var _nock = _interopRequireDefault(require("nock"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _rooms = _interopRequireDefault(require("./rooms"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe(".fetchRooms", () => {
  const validRoomsData = [{
    id: "afce3adc-00f0-4424-923c-d10cd72939b3",
    name: "Logos"
  }];
  describe("when strategy is ENVIRONMENT", () => {
    const strategy = "ENVIRONMENT";
    it("should load from env ROOMS_DATA", done => {
      process.env.ROOMS_DATA = JSON.stringify(validRoomsData);
      (0, _rooms.default)(strategy).then(rooms => {
        expect(rooms).toEqual(validRoomsData);
      }).then(done);
    });
    it("should reject the promise when invalid JSON defined", done => {
      process.env.ROOMS_DATA = "INVALID_JSON";
      (0, _rooms.default)(strategy).then(rooms => {
        done.fail(`Need fail on parse invalid json: ${rooms}`);
      }).catch(error => {
        expect(error.message).toEqual("Unexpected token I in JSON at position 0");
        done();
      });
    });
  });
  describe("when strategy is REMOTE", () => {
    const strategy = "REMOTE";
    const myUrlData = "http://minhaurl.com";
    beforeEach(() => {
      process.env.ROOMS_DATA = myUrlData;
    });
    it("should load from a URL", done => {
      (0, _nock.default)(myUrlData).get("/").reply(200, validRoomsData);
      (0, _rooms.default)(strategy).then(rooms => {
        expect(rooms).toEqual(validRoomsData);
      }).then(done);
    });
    it("should reject the promise when invalid JSON defined", done => {
      (0, _nock.default)(myUrlData).get("/").replyWithError({
        message: "Unexpected token I in JSON at position 0",
        code: "INVALID_JSON"
      });
      (0, _rooms.default)(strategy).then(rooms => {
        done.fail(`Need fail on parse invalid json: ${rooms}`);
      }).catch(error => {
        expect(error.message).toEqual("Unexpected token I in JSON at position 0");
        done();
      });
    });
  });
  describe("when strategy is not defined", () => {
    const filename = "../file/matrix.room.web.json";
    beforeEach(() => {
      _fs.default.mkdirSync(_path.default.dirname(filename), {
        recursive: true
      });

      _fs.default.writeFileSync(filename, JSON.stringify(validRoomsData));
    });
    afterEach(() => {
      _fs.default.unlinkSync(filename);
    });
    it("should load default when the file ../file/matrix.room.web.json is not defined", done => {
      _fs.default.unlinkSync(filename);

      (0, _rooms.default)().then(rooms => {
        expect(rooms).toBeDefined();
        expect(rooms.length).toBe(10);
      }).then(done);
    });
    it("should load from the file ../file/matrix.room.web.json", done => {
      (0, _rooms.default)().then(rooms => {
        expect(rooms).toEqual(validRoomsData);
      }).then(done);
    });
    it("should reject the promise when invalid JSON defined", done => {
      _fs.default.writeFileSync(filename, "INVALID_JSON");

      (0, _rooms.default)().then(rooms => {
        done.fail(`Need fail on parse invalid json: ${rooms}`);
      }).catch(error => {
        expect(error.message).toEqual("Unexpected token I in JSON at position 0");
        done();
      });
    });
  });
});