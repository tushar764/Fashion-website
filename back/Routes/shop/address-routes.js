const express = require('express');
const {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} = require('../../Controllers/shop/address-controller');

const router = express.Router();

// Add a new address
router.post('/add', addAddress);

// Edit an address
router.put('/update/:userId/:addressId', editAddress);

// Fetch all addresses for a user
router.get('/get/:userId', fetchAllAddress);

// Delete an address
router.delete('/delete/:userId/:addressId', deleteAddress);

module.exports = router;
