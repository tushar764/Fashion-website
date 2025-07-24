const paypal = require('../../helpers/paypal');
const Order = require('../../Models/Order');
const Cart = require('../../Models/Cart');
const Product = require('../../Models/Product');

// ✅ CREATE ORDER AND INITIATE PAYPAL
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
      orderDate
    } = req.body;

    // ✅ 1. Create order in MongoDB first
    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
    });

    const savedOrder = await newOrder.save();

    // ✅ 2. Setup PayPal payment
    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        // ✅ Use production client URL (not localhost)
        return_url: 'https://fashion-client.vercel.app/shop/paypal-return',
        cancel_url: 'https://fashion-client.vercel.app/shop/payment-cancel'
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
          description: 'Fashion Order',
          custom: savedOrder._id.toString() // optional, for advanced usage
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
        savedOrder.paymentId = paymentInfo.id;
        await savedOrder.save();

        const approvalURL = paymentInfo.links.find(link => link.rel === 'approval_url')?.href;

        res.status(201).json({
          success: true,
          approvedURL: approvalURL,
          orderId: savedOrder._id
        });
      }
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Some Error occurred'
    });
  }
};

// ✅ CAPTURE PAYMENT AFTER PAYPAL REDIRECT
const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Update order status
    order.paymentStatus = 'paid';
    order.orderStatus = 'confirmed';
    order.paymentId = paymentId;
    order.payerId = payerId;

    // Deduct product stock
    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.title}`
        });
      }
      product.totalStock -= item.quantity;
      await product.save();
    }

    await Cart.deleteOne({ userId: order.userId });
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
