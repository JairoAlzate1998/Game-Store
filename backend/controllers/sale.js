const Sale = require("../models/sale");
const Product = require("../models/product");
const User = require("../models/user");

const registerSale = async (req, res) => {
  if (!req.body.product || !req.body.user)
    return res.status(400).send("Process failes: Incomplete data");

  const product = await Product.findOne({ name: req.body.product });
  if(!product) return res.status(400).send("Product not found");

  const user = await User.findOne({ name: req.body.user });
  if(!user) return res.status(400).send("User not found");

  const sale = new Sale({
    price: product.price,
    productId: product._id,
    userId: user._id,
  });

  const result = await sale.save();
  if(!result) return res.status(400).send("Failed to save sale");
  return res.status(200).send({ sale });
};

const listSale = async (req, res) => {
  const sale = await Sale.find().populate("productId").populate("userId").exec();
  if(!sale || sale === 0) return res.status(400).send("Sale not found");
  return res.status(200).send({ sale });
};

module.exports = { registerSale, listSale };
