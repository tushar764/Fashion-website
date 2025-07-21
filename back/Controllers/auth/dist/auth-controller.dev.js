"use strict";

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var User = require('../../Models/User'); // Register


var registerUser = function registerUser(req, res) {
  var _req$body, userName, email, password, checkUser, hashPassword, newUser;

  return regeneratorRuntime.async(function registerUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, userName = _req$body.userName, email = _req$body.email, password = _req$body.password;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          checkUser = _context.sent;

          if (!checkUser) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.json({
            success: false,
            message: 'User with this email already exists. Try another email.'
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 12));

        case 9:
          hashPassword = _context.sent;
          newUser = new User({
            userName: userName,
            email: email,
            password: hashPassword
          });
          _context.next = 13;
          return regeneratorRuntime.awrap(newUser.save());

        case 13:
          res.status(200).json({
            success: true,
            message: "User registration successful"
          });
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json({
            success: false,
            message: "Some error occurred"
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
}; // Login 


var loginUser = function loginUser(req, res) {
  var _req$body2, email, password, checkUser, checkPasswordMatch, token;

  return regeneratorRuntime.async(function loginUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          checkUser = _context2.sent;

          if (checkUser) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            success: false,
            message: "User doesn't exist. Please register first."
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, checkUser.password));

        case 9:
          checkPasswordMatch = _context2.sent;

          if (checkPasswordMatch) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(401).json({
            success: false,
            message: "Incorrect Password. Please try again."
          }));

        case 12:
          token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            userName: checkUser.userName
          }, 'CLIENT_SECRET_KEY', {
            expiresIn: '60mins'
          });
          res.cookie('token', token, {
            httpOnly: true,
            secure: false
          }).json({
            success: true,
            message: 'Logged in successfully',
            user: {
              email: checkUser.email,
              role: checkUser.role,
              id: checkUser._id,
              userName: checkUser.userName
            }
          });
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](1);
          console.error("Login error:", _context2.t0);
          res.status(500).json({
            success: false,
            message: "Internal Server Error"
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 16]]);
}; // logout 


var logoutUser = function logoutUser(req, res) {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!"
  });
}; // auth Middleware


var authMiddleware = function authMiddleware(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function authMiddleware$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          token = req.cookies.token;

          if (token) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(401).json({
            success: false,
            message: 'unauthorised user!'
          }));

        case 3:
          try {
            decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
            req.user = decoded;
            next();
          } catch (error) {
            res.status(401).json({
              success: false,
              message: 'unauthorised user!'
            });
          }

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
  logoutUser: logoutUser,
  authMiddleware: authMiddleware
};