const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const newsletterSubs = mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [isEmail, "invalid email"],
    index: { unique: true },
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

module.exports = mongoose.model("NewsletterSubs", newsletterSubs);
