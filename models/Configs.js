const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
  logo: { type: String },
  sliders: [],
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

module.exports = mongoose.model("Configs", configSchema);
