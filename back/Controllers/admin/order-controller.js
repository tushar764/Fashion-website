const Order = require("../../Models/Order");

const getAllOrdersOfAllUser = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (!orders.length) {
      return res.status(404).json({ success: false, message: "No orders found!" });
    }
    res.status(200).json({ success: true, data: orders });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Some error occurred!" });
  }
};

const getOrdersDetailsForAdmin = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order Not found" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Some error occurred!" });
  }
};


const updateOrderStatus=async(req,res)=>{
  try {
    const {id}=req.params;
    const{orderStatus}=req.body;
     const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, 
        message: "Order Not found" });
    }
    
    await Order.findByIdAndUpdate(id,{orderStatus})
    res.status(200).json({
      success:true,
      message:'Order status is updated successfully'
    })
  } catch (e) {
    console.error(e);
    res.status(500).json
    ({ success: false, message: "Some error occurred!" });
  }
}


module.exports = { getAllOrdersOfAllUser, getOrdersDetailsForAdmin,updateOrderStatus };
