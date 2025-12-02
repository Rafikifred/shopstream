const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 1 },
  description: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  sku: { type: String, index: true },
  stock: { type: Number, default: 0, min: 0 },
  categories: { type: [String], default: [] },
  images: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
