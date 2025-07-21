// const paypal = require("paypal-rest-sdk");

// paypal.configure({
//     mode: "sandbox", // or 'live'
//     client_id: "Ab4VRjcRq7dwLKjVD76wSQrK65rhkGapmEylr7OC1lRQADbLy3fp1xPtDYXm-OxeDVH3Qrzg74A5Begh",
//     client_secret: "EPBJnS4aOMKdAjv2oJwryEtut-HRPfbsuTXtEHULAZIOLkzBJ3dWiLsRewB_y0uw-b2A1GeyedGwePKv"
// });

// module.exports = paypal;

const paypal = require("paypal-rest-sdk");
require("dotenv").config(); // Load environment variables

paypal.configure({
  mode: process.env.PAYPAL_MODE, // 'sandbox' or 'live'
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

module.exports = paypal;

