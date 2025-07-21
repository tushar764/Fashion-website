const { imageUploadUtil } = require("../../helpers/cloud");
const Product = require('../../Models/Product');

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);

        res.json({
            success: true,
            result,
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error occured",
        })
    }

}
/// Add a new product
const addProduct = async (req, res) => {
    try {
        const {
            image, title,
            description, brand,
            salePrice,
            category, price,
            totalStock
        } = req.body;

        const newlyCreatedProduct = new Product({
            image, title,
            description, brand,
            salePrice,
            category, price,
            totalStock
        });

        await newlyCreatedProduct.save();

        res.status(201).json({
            success: true,
            data: newlyCreatedProduct,
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occurred",
        });
    }
};

// Fetch all products
const fetchAllProducts = async (req, res) => {
    try {
        const listOfProducts = await Product.find({});
        res.status(200).json({
            success: true,
            data: listOfProducts
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occurred",
        });
    }
};

// Edit a product
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            image, title,
            description, brand,
            salePrice,
            category, price,
            totalStock
        } = req.body;

        let  findProduct = await Product.findById(id);

        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.brand = brand || findProduct.brand;
        findProduct.category = category || findProduct.category;
        findProduct.salePrice = salePrice === ''? 0 : salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;
        findProduct.price  = price === ''? 0 :price || findProduct.price;
        findProduct.image = image || findProduct.image;

        await findProduct.save();

        res.status(200).json({
            success: true,
            data: findProduct
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occurred",
        });
    }
};

// You can use find by id in it
// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occurred",
        });
    }
};

module.exports = {
    handleImageUpload,
    addProduct,
    fetchAllProducts,
    editProduct,
    deleteProduct
};


