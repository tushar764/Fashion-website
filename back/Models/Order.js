const mongoose=require('mongoose')
const OrderSchema=new mongoose.Schema({
    userId: String,
    cartId:String,
    cartItems:[
        {
            productId: String,
            title: String,
            image: String,
           
            price: String,
            // SalePrice: String,
            quantity: Number,
        }
    ],

     addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    notes: String,
    phone: String, // ✅ ADD THIS LINE
  },
    orderStatus:String,
    paymentMethod:String,
    paymentStatus:String,
    totalAmount:Number,
    orderDate:Date,
    paymentId:String,
    payerId:String
})

// module.exports=mongoose.model("Order",OrderSchema)
module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema);
