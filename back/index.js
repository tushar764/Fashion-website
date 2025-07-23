// ✅ fashion-backend/index.js

const connectToMongo = require('./db');
const authRouter = require('./Routes/auth-routes');
const cookieParser = require('cookie-parser');
const express = require('express');
require('dotenv').config({ path: '.env.local' });
const cors = require('cors');

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

// ✅ Updated CORS config
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://fashion-website-frontend.onrender.com'
  ],
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: [
    "Content-Type",
    'Authorization',
    'Cache-Control',
    'Expires',
    'Pragma'
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use('/api/auth', authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/order', shopOrderRouter);
app.use('/api/shop/search', shopSearchRouter);
app.use('/api/shop/review', shopReviewRouter);
app.use('/api/common/feature', commonFeautreRouter);

app.get('/', (req, res) => {
  res.send('fashion backend is here');
});

app.listen(port, () => {
  console.log(`Fashion backend is running on port ${port}`);
});

connectToMongo();
