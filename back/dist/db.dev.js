"use strict";

var mongoose = require('mongoose'); // Corrected variable name for MongoDB URI


var mongoURI = "mongodb://127.0.0.1:27017/fashion"; // Ensure MongoDB is running at this address

var connectToMongo = function connectToMongo() {
  return regeneratorRuntime.async(function connectToMongo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }));

        case 3:
          console.log("Connected to MongoDB successfully");
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error("Failed to connect to MongoDB:", _context.t0);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

module.exports = connectToMongo;