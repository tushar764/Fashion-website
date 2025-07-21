"use strict";

var express = require('express');

var _require = require('../../Controllers/shop/products-controller'),
    getFilteredProducts = _require.getFilteredProducts;

var router = express.Router();
router.get('/get', getFilteredProducts);
module.exports = router;