const express = require("express");
const { getAllOrdersOfAllUser,getOrdersDetailsForAdmin,updateOrderStatus } = require("../../Controllers/admin/order-controller"); // ✅ assuming correct path

const router = express.Router();

router.get("/get", getAllOrdersOfAllUser);
router.get("/details/:id", getOrdersDetailsForAdmin);
router.put("/update/:id", updateOrderStatus);


module.exports = router;
