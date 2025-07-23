const connectToMongo = require('./db');
const authRouter = require('./Routes/auth-routes');
const cookieParser = require('cookie-parser');
const express = require('express');
require('dotenv').config({ path: '.env.local' });  // Load environment variables

// Admin routes
const adminProductsRouter = require('./Routes/admin/product-routes');
const adminOrderRouter = require('./Routes/admin/order-routes');

// Shop routes
const shopProductsRouter = require('./Routes/shop/product-routes');
const shopCartRouter = require('./Routes/shop/cart-routes');
const shopAddressRouter = require('./Routes/shop/address-routes');
const shopOrderRouter = require('./Routes/shop/order-routes');
const shopSearchRouter = require('./Routes/shop/search-routes');
const shopReviewRouter = require('./Routes/shop/review-routes');

// Common features
const commonFeatureRouter = require('./Routes/common/feature-routes');

const app = express();
const cors = require('cors');

// ✅ CORS config for local + deployed frontend
app.use(cors({
  origin: [
    'http://localhost:3000', // local dev
    'https://fashion-website-frontend.onrender.com' // deployed frontend
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

app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT || 5000;

// Routes
app.use('/api/auth', authRouter);

// Admin
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

// Customer / Shop
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/order', shopOrderRouter);
app.use('/api/shop/search', shopSearchRouter);
app.use('/api/shop/review', shopReviewRouter);

// Common
app.use('/api/common/feature', commonFeatureRouter);

// Default route
app.get('/', (req, res) => {
  res.send('fashion backend is here');
});

// Start server
app.listen(port, () => {
  console.log(`Fashion backend is running on port ${port}`);
});

// Connect to MongoDB
connectToMongo();
