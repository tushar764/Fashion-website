"use strict";

var connectToMongo = require('./db');

var authRouter = require('./Routes/auth-routes');

var cookieParser = require('cookie-parser');

var express = require('express');

require('dotenv').config({
  path: '.env.local'
}); // Load environment variables


var adminProductsRouter = require('./Routes/admin/product-routes');

var shopProductsRouter = require('./Routes/shop/product-routes');

var app = express();

var cors = require('cors'); // Correctly configure CORS middleware


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ["Content-Type", 'Authorization', 'Cache-Control', 'Expires', 'Pragma'],
  credentials: true
}));
app.use(cookieParser());
var port = 5000;
app.use(express.json());
app.use('/api/auth', authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use('/api/shop/products', shopProductsRouter);
app.get('/', function (req, res) {
  res.send('fashion backend is here');
});
app.listen(port, function () {
  console.log("Fashion backend is running on port ".concat(port));
});
connectToMongo();