const paypal = require('../../helpers/paypal');
const Order = require('../../Models/Order');
const Cart = require('../../Models/Cart');
const Product = require('../../Models/Product');

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      paymentId,
      payerId,

    } = req.body;



    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: 'http://localhost:3000/shop/paypal-return',
        cancel_url: 'http://localhost:3000/shop/paypal-cancel'
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map(item => ({
              name: item.title,
              sku: item.productId,
              price: Number(item.price).toFixed(2),

              currency: 'USD',
              quantity: String(item.quantity)        
            }))
          },
          amount: {
            currency: 'USD',
            total: totalAmount.toFixed(2)
          },
          description: 'description'
        }
      ]
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: 'Error while creating PayPal Payment'
        });
      } else {
        const newlyCreatedOrder = new Order({
          userId,
          cartId,

          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          paymentId,
          payerId,
        });

        await newlyCreatedOrder.save();

        const approvalURL = paymentInfo.links.find(link => link.rel === 'approval_url')?.href;

        res.status(201).json({
          success: true,
          approvedURL: approvalURL,
          orderId: newlyCreatedOrder._id
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some Error occurred"
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order cannot be found',
      });
    }

    // Update order status
    order.paymentStatus = 'paid';
    order.orderStatus = 'confirmed';
    order.paymentId = paymentId;
    order.payerId = payerId;

    for(let item of order.cartItems){
      // let product = await Product.findByid(item.productId)
      let product = await Product.findById(item.productId)

      if(!product){
        return res.status(404).json({
          success:false,
          message:`Not enough stock for this product ${product.title}`
        })

      }
      product.totalStock -=item.quantity;
      await product.save();

    }

    const userId = order.userId;

    // ✅ Delete user's cart by userId (Fix!)
    await Cart.deleteOne({ userId });

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order confirmed',
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Some Error occurred',
    });
  }
};




const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: 'No orders found!',
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const getOrdersDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order Not found',
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};



module.exports = { createOrder, capturePayment, getAllOrdersByUser, getOrdersDetails };
