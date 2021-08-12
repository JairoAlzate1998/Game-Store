const mongoose = require("mongoose");

const saleSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "product",
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
    },
    date: {
        type: Date,
        default: Date.now
    },
    price: Number,
});

const sale = mongoose.model("sale", saleSchema);
module.exports = sale;