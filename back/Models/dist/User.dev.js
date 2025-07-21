"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    "default": 'user'
  }
});
var User = mongoose.model('User', UserSchema);
module.exports = User;