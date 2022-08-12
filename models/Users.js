const mongoose = require("mongoose");
const isEmail = require("validator/lib/isemail");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, min: 2 },
  lastName: { type: String, required: true, min: 2 },
  country: { type: String, required: true },
  birthday: { type: String, required: true, min: 3 },
  phone: { type: String, required: true, index: { unique: true } },
  email: {
    type: String,
    required: true,
    min: 5,
    validate: [isEmail, "invalid email"],
    index: { unique: true },
  },
  password: { type: String, required: true, min: 6, max: 25 },
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

module.exports = mongoose.model("Users", userSchema);
