const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config({ path: '.env.local' });

const connectToMongo = require('./db');
const authRouter = require('./Routes/auth-routes');
const adminProductsRouter = require('./Routes/admin/product-routes');
const adminOrderRouter = require('./Routes/admin/order-routes');
const shopProductsRouter = require('./Routes/shop/product-routes');
const shopCartRouter = require('./Routes/shop/cart-routes');
const shopAddressRouter = require('./Routes/shop/address-routes');
const shopOrderRouter = require('./Routes/shop/order-routes');
const shopSearchRouter = require('./Routes/shop/search-routes');
const shopReviewRouter = require('./Routes/shop/review-routes');
const commonFeautreRouter = require('./Routes/common/feature-routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://fashion-website-6zmg.onrender.com'
  ],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/admin/orders', adminOrderRouter);
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/order', shopOrderRouter);
app.use('/api/shop/search', shopSearchRouter);
app.use('/api/shop/review', shopReviewRouter);
app.use('/api/common/feature', commonFeautreRouter);

// Health check route
app.get('/', (req, res) => {
  res.send('Fashion backend is here');
});

app.listen(port, () => {
  console.log(`Fashion backend is running on port ${port}`);
});

connectToMongo();
