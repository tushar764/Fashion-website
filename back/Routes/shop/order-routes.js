const express = require("express");
const {
  createOrder,
  capturePayment,
  getAllOrdersByUser, // ✅ matches usage below
  getOrdersDetails
} = require("../../Controllers/shop/order-controller");

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/list/:userId", getAllOrdersByUser); // ✅ fixed
router.get("/details/:id", getOrdersDetails);

module.exports = router;
