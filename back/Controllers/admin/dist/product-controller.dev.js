"use strict";

var _require = require("../../helpers/cloud"),
    imageUploadUtil = _require.imageUploadUtil;

var Product = require('../../Models/Product');

var handleImageUpload = function handleImageUpload(req, res) {
  var b64, url, result;
  return regeneratorRuntime.async(function handleImageUpload$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          b64 = Buffer.from(req.file.buffer).toString('base64');
          url = "data:" + req.file.mimetype + ";base64," + b64;
          _context.next = 5;
          return regeneratorRuntime.awrap(imageUploadUtil(url));

        case 5:
          result = _context.sent;
          res.json({
            success: true,
            result: result
          });
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.json({
            success: false,
            message: "Error occured"
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; /// Add a new product


var addProduct = function addProduct(req, res) {
  var _req$body, image, title, description, brand, salePrice, category, price, totalStock, newlyCreatedProduct;

  return regeneratorRuntime.async(function addProduct$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, image = _req$body.image, title = _req$body.title, description = _req$body.description, brand = _req$body.brand, salePrice = _req$body.salePrice, category = _req$body.category, price = _req$body.price, totalStock = _req$body.totalStock;
          newlyCreatedProduct = new Product({
            image: image,
            title: title,
            description: description,
            brand: brand,
            salePrice: salePrice,
            category: category,
            price: price,
            totalStock: totalStock
          });
          _context2.next = 5;
          return regeneratorRuntime.awrap(newlyCreatedProduct.save());

        case 5:
          res.status(201).json({
            success: true,
            data: newlyCreatedProduct
          });
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).json({
            success: false,
            message: "Error occurred"
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Fetch all products


var fetchAllProducts = function fetchAllProducts(req, res) {
  var listOfProducts;
  return regeneratorRuntime.async(function fetchAllProducts$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Product.find({}));

        case 3:
          listOfProducts = _context3.sent;
          res.status(200).json({
            success: true,
            data: listOfProducts
          });
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).json({
            success: false,
            message: "Error occurred"
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Edit a product


var editProduct = function editProduct(req, res) {
  var id, _req$body2, image, title, description, brand, salePrice, category, price, totalStock, findProduct;

  return regeneratorRuntime.async(function editProduct$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _req$body2 = req.body, image = _req$body2.image, title = _req$body2.title, description = _req$body2.description, brand = _req$body2.brand, salePrice = _req$body2.salePrice, category = _req$body2.category, price = _req$body2.price, totalStock = _req$body2.totalStock;
          _context4.next = 5;
          return regeneratorRuntime.awrap(Product.findById(id));

        case 5:
          findProduct = _context4.sent;

          if (findProduct) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            success: false,
            message: "Product not found"
          }));

        case 8:
          findProduct.title = title || findProduct.title;
          findProduct.description = description || findProduct.description;
          findProduct.brand = brand || findProduct.brand;
          findProduct.category = category || findProduct.category;
          findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;
          findProduct.totalStock = totalStock || findProduct.totalStock;
          findProduct.price = price === '' ? 0 : price || findProduct.price;
          findProduct.image = image || findProduct.image;
          _context4.next = 18;
          return regeneratorRuntime.awrap(findProduct.save());

        case 18:
          res.status(200).json({
            success: true,
            data: findProduct
          });
          _context4.next = 25;
          break;

        case 21:
          _context4.prev = 21;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).json({
            success: false,
            message: "Error occurred"
          });

        case 25:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 21]]);
}; // You can use find by id in it
// Delete a product


var deleteProduct = function deleteProduct(req, res) {
  var id, product;
  return regeneratorRuntime.async(function deleteProduct$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Product.findByIdAndDelete(id));

        case 4:
          product = _context5.sent;

          if (product) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            success: false,
            message: "Product not found"
          }));

        case 7:
          res.status(200).json({
            success: true,
            message: "Product deleted successfully"
          });
          _context5.next = 14;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(500).json({
            success: false,
            message: "Error occurred"
          });

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

module.exports = {
  handleImageUpload: handleImageUpload,
  addProduct: addProduct,
  fetchAllProducts: fetchAllProducts,
  editProduct: editProduct,
  deleteProduct: deleteProduct
};