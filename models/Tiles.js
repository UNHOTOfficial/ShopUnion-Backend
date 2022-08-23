const mongoose = require("mongoose");

const tilesSchema = mongoose.Schema({
  title: { type: String, unique: true },
  products: {
    type: [mongoose.Types.ObjectId],
    validate: (v) => Array.isArray(v) && v.length > 0,
    unique: true,
  },
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

module.exports = mongoose.model("Tiles", tilesSchema);
