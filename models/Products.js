const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 1 },
  hasDiscount: { type: Boolean, required: true },
  discount: { type: Number, required: true, min: 0, default: 0 },
  rating: {
    rate: { type: Number, required: true, min: 0, max: 5 },
    count: { type: Number, required: true },
  },
  category: {
    main: { type: String, required: true },
    type: { type: String, required: true },
  },
  quantity: { type: Number, required: true },
  specifications: { type: Object, required: true },
  createDate: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updateDate: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
