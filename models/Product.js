const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    sku: { type: String, trim: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    categories: { type: [String], default: [] },
    images: { type: [String], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
