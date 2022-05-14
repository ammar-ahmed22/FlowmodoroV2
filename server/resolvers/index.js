"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _apolloServerExpress = require("apollo-server-express");

var resolvers = {
  Query: {
    hello: function hello() {
      return "hello world";
    },
    getTasks: function () {
      var _getTasks = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var id, user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref.id;
                _context.next = 3;
                return _User["default"].findById(id);

              case 3:
                user = _context.sent;

                if (!user) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", user.tasks);

              case 6:
                throw new _apolloServerExpress.UserInputError("User not found", {
                  id: id
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getTasks(_x, _x2) {
        return _getTasks.apply(this, arguments);
      }

      return getTasks;
    }()
  },
  Mutation: {
    createUserWithTask: function () {
      var _createUserWithTask = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_, _ref2) {
        var name, completed, notes, newUser;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                name = _ref2.name, completed = _ref2.completed, notes = _ref2.notes;
                _context2.next = 3;
                return _User["default"].create({
                  tasks: [{
                    name: name,
                    completed: completed,
                    notes: notes
                  }],
                  sessionData: []
                });

              case 3:
                newUser = _context2.sent;

                if (!newUser) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", newUser);

              case 6:
                ;

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function createUserWithTask(_x3, _x4) {
        return _createUserWithTask.apply(this, arguments);
      }

      return createUserWithTask;
    }(),
    createUserWithSession: function () {
      var _createUserWithSession = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_, _ref3) {
        var workTime, breakRatio, datetimeCompleted, newUser;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                workTime = _ref3.workTime, breakRatio = _ref3.breakRatio, datetimeCompleted = _ref3.datetimeCompleted;
                _context3.next = 3;
                return _User["default"].create({
                  sessionData: [{
                    workTime: workTime,
                    breakRatio: breakRatio,
                    datetimeCompleted: new Date(datetimeCompleted)
                  }],
                  tasks: []
                });

              case 3:
                newUser = _context3.sent;

                if (!newUser) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", newUser);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createUserWithSession(_x5, _x6) {
        return _createUserWithSession.apply(this, arguments);
      }

      return createUserWithSession;
    }(),
    addSessionData: function () {
      var _addSessionData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_, _ref4) {
        var id, workTime, breakRatio, datetimeCompleted, user;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = _ref4.id, workTime = _ref4.workTime, breakRatio = _ref4.breakRatio, datetimeCompleted = _ref4.datetimeCompleted;
                _context4.next = 3;
                return _User["default"].findById(id);

              case 3:
                user = _context4.sent;

                if (!user) {
                  _context4.next = 9;
                  break;
                }

                user.sessionData.push({
                  workTime: workTime,
                  breakRatio: breakRatio,
                  datetimeCompleted: datetimeCompleted
                });
                _context4.next = 8;
                return user.save();

              case 8:
                return _context4.abrupt("return", user);

              case 9:
                throw new _apolloServerExpress.UserInputError("User not found", {
                  id: id
                });

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function addSessionData(_x7, _x8) {
        return _addSessionData.apply(this, arguments);
      }

      return addSessionData;
    }(),
    addTask: function () {
      var _addTask = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_, _ref5) {
        var id, name, completed, notes, user;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = _ref5.id, name = _ref5.name, completed = _ref5.completed, notes = _ref5.notes;
                _context5.next = 3;
                return _User["default"].findById(id);

              case 3:
                user = _context5.sent;

                if (!user) {
                  _context5.next = 9;
                  break;
                }

                user.tasks.push({
                  name: name,
                  completed: completed,
                  notes: notes
                });
                _context5.next = 8;
                return user.save();

              case 8:
                return _context5.abrupt("return", user);

              case 9:
                throw new _apolloServerExpress.UserInputError("User not found", {
                  id: id
                });

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function addTask(_x9, _x10) {
        return _addTask.apply(this, arguments);
      }

      return addTask;
    }(),
    deleteTask: function () {
      var _deleteTask = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_, _ref6) {
        var id, taskId, user;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                id = _ref6.id, taskId = _ref6.taskId;
                _context6.next = 3;
                return _User["default"].findById(id);

              case 3:
                user = _context6.sent;

                if (!user) {
                  _context6.next = 9;
                  break;
                }

                user.deleteTask(taskId);
                _context6.next = 8;
                return user.save();

              case 8:
                return _context6.abrupt("return", user);

              case 9:
                throw new _apolloServerExpress.UserInputError("User not found", {
                  id: id
                });

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function deleteTask(_x11, _x12) {
        return _deleteTask.apply(this, arguments);
      }

      return deleteTask;
    }()
  }
};
var _default = resolvers;
exports["default"] = _default;