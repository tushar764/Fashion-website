const express = require('express');
const {handleImageUpload,
    addProduct,
    fetchAllProducts,
    editProduct,
    deleteProduct,


}=require('../../Controllers/admin/product-controller')
const {upload}=require('../../helpers/cloud');
const router = express.Router();

router.post('/upload-image',upload.single('my_file'),handleImageUpload)
router.post('/add',addProduct)
router.put('/edit/:id',editProduct)
router.delete('/delete/:id',deleteProduct)
router.get('/get',fetchAllProducts)

module.exports = router;