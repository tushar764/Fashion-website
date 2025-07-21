const mongoose = require('mongoose');

const ProductReviewSchema = new mongoose.Schema({
  productId: String,
  userId: String,
  userName: String,
  reviewMessage: String,
  reviewValue: Number,
}, {
  timestamps: true
});

// ✅ Safe export to avoid OverwriteModelError
module.exports = mongoose.models.ProductReview || mongoose.model("ProductReview", ProductReviewSchema);
