"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var UserSchema = new _mongoose["default"].Schema({
  tasks: [{
    name: {
      type: String,
      required: [true, "Please provide task name."]
    },
    completed: {
      type: Boolean,
      required: [true, "Completed value for task must be provided."]
    },
    notes: {
      type: String,
      required: false
    }
  }],
  sessionData: [{
    workTime: {
      type: Number
    },
    breakRatio: {
      type: Number
    },
    datetimeCompleted: {
      type: Date
    }
  }]
});

UserSchema.methods.deleteTask = function (taskId) {
  this.tasks = this.tasks.filter(function (task) {
    return !task._id.equals(taskId);
  });
};

var User = _mongoose["default"].model("User", UserSchema);

var _default = User;
exports["default"] = _default;