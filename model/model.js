const { number } = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 1 },
  hasDiscount: { type: Boolean, required: true },
  discount: { type: Number, required: true, min: 0 },
  rating: {
    rate: { type: Number, required: true, min: 0, max: 5 },
    count: { type: Number, required: true },
  },
  createDate: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
