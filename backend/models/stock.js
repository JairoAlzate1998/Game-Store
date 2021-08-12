const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  quantity: Number,
  direction: String,
  date: {
    type: Date,
    default: Date.now,
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "product",
  },
});

const stock = mongoose.model("stock", stockSchema);
module.exports = stock;
