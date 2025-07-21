"use strict";

var Product = require('../../Models/Product');

var getFilteredProducts = function getFilteredProducts(req, res) {
  var products;
  return regeneratorRuntime.async(function getFilteredProducts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Product.find({}));

        case 3:
          products = _context.sent;
          res.status(200).json({
            success: true,
            data: products
          });
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0); // corrected from "error" to "e"

          res.status(500).json({
            success: false,
            message: 'Some error occurred'
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports = {
  getFilteredProducts: getFilteredProducts
};