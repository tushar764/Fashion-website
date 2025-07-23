const connectToMongo = require('./db');
const authRouter =require('./Routes/auth-routes')
const cookieParser = require('cookie-parser');
const express = require('express');
require('dotenv').config({ path: '.env.local' });  // Load environment variables
const adminProductsRouter=require('./Routes/admin/product-routes')
const adminOrderRouter=require('./Routes/admin/order-routes')
const shopProductsRouter=require('./Routes/shop/product-routes')
const shopCartRouter=require('./Routes/shop/cart-routes')
const shopAddressRouter=require('./Routes/shop/address-routes')
const shopOrderRouter=require('./Routes/shop/order-routes')
const shopSearchRouter=require('./Routes/shop/search-routes')
const shopReviewRouter=require('./Routes/shop/review-routes')
const commonFeautreRouter=require('./Routes/common/feature-routes')
const app = express();
const cors = require('cors');

// Correctly configure CORS middleware
app.use(cors({
  origin: 'http://localhost:3000',
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

const port = 5000;

app.use(express.json());


// this is one for admin
app.use('/api/auth',authRouter);
app.use("/api/admin/products", adminProductsRouter)
app.use("/api/admin/orders", adminOrderRouter)

// this is one for customers 
app.use('/api/shop/products',shopProductsRouter)
app.use('/api/shop/cart',shopCartRouter)
app.use('/api/shop/address',shopAddressRouter)
app.use('/api/shop/order',shopOrderRouter)
app.use('/api/shop/search',shopSearchRouter)
app.use('/api/shop/review',shopReviewRouter)
app.use('/api/common/feature',commonFeautreRouter)

app.get('/', (req, res) => {
  res.send('fashion backend is here');
});

app.listen(port, () => {
  console.log(`Fashion backend is running on port ${port}`);
});

connectToMongo(); 
