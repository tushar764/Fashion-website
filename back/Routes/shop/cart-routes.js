const express = require("express");
const {
  addToCart,
  fetchCartItems,
  deleteCartItem,
  updateCartItemsQty,
} = require("../../Controllers/shop/cart-controller");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/user/:userId", fetchCartItems); 
router.post("/update-cart", updateCartItemsQty);
router.delete("/:userId/:productId", deleteCartItem); 

module.exports = router;
