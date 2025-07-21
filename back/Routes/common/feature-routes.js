const express = require('express');
const {
  addFeatureImage,
  getFeatureImages,
} = require('../../Controllers/common/feature-controller');

const router = express.Router();

// ✅ Add a new feature image
router.post('/add', addFeatureImage);

// ✅ Get all feature images
router.get('/get', getFeatureImages);

module.exports = router;
