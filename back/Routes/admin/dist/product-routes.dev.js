"use strict";

var express = require('express');

var _require = require('../../Controllers/admin/product-controller'),
    handleImageUpload = _require.handleImageUpload,
    addProduct = _require.addProduct,
    fetchAllProducts = _require.fetchAllProducts,
    editProduct = _require.editProduct,
    deleteProduct = _require.deleteProduct;

var _require2 = require('../../helpers/cloud'),
    upload = _require2.upload;

var router = express.Router();
router.post('/upload-image', upload.single('my_file'), handleImageUpload);
router.post('/add', addProduct);
router.put('/edit/:id', editProduct);
router["delete"]('/delete/:id', deleteProduct);
router.get('/get', fetchAllProducts);
module.exports = router;