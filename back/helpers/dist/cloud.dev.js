"use strict";

var cloudinary = require("cloudinary").v2;

var multer = require("multer");

cloudinary.config({
  cloud_name: 'dwb8ktgnk',
  api_key: '951329893331124',
  api_secret: "FrhPZJlZmmdoLd9x2oiN4AwmPUc" // Click 'View API Keys' above to copy your API secret

});
var storage = new multer.memoryStorage();

function imageUploadUtil(file) {
  var result;
  return regeneratorRuntime.async(function imageUploadUtil$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(cloudinary.uploader.upload(file, {
            resource_type: 'auto'
          }));

        case 2:
          result = _context.sent;
          return _context.abrupt("return", result);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

var upload = multer({
  storage: storage
});
module.exports = {
  upload: upload,
  imageUploadUtil: imageUploadUtil
};