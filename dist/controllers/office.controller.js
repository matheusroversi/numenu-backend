"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hashmap = _interopRequireDefault(require("hashmap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Constructor
class OfficeController {
  constructor() {
    this.usersInRoomOffice = new _hashmap.default();
  }

  addUserInRoom(user, room) {
    this.removeUser(user.id);
    const userInRoom = {
      user,
      room
    };
    this.usersInRoomOffice.set(user.id, userInRoom);
  }

  setUserInMeet(userId, isUserInMeet) {
    const userInRoom = this.getUserInRoom(userId);

    if (userInRoom) {
      userInRoom.user.inMeet = isUserInMeet;
      this.addUserInRoom(userInRoom.user, userInRoom.room);
    }
  }

  getUserInRoom(userId) {
    return this.usersInRoomOffice.get(userId);
  }

  removeUser(userId) {
    this.usersInRoomOffice.delete(userId);
  }

  getUsersInOffice() {
    return this.usersInRoomOffice;
  }

  getUsersInOfficeByMap() {
    const usersInOffice = new Map();
    this.getUsersInOffice().forEach((value, key) => {
      usersInOffice[key] = value;
    });
    return usersInOffice;
  }

}

var _default = OfficeController;
exports.default = _default;