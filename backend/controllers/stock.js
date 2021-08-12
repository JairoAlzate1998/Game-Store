const Stock = require("../models/stock");
const Product = require("../models/product");

const registerStock = async (req, res) => {
  if (!req.body.quantity || !req.body.direction || !req.body.product)
    return res.status.status(400).send("Process failes: Incomplete data");

  const product = await Product.findOne({ name: req.body.product });
  if (!product) return res.status(400).send("Product not found");

  const existing = await Stock.findOne({ productId: product._id });
  if (existing)
    return res.status(400).send("This product already has a warehouse");

  const stock = new Stock({
    quantity: req.body.quantity,
    direction: req.body.direction,
    productId: product._id,
  });

  const result = await stock.save();
  if (!result) return res.status(400).send("Error to register stock");
  return res.status(200).send({ stock });
};

const listStock = async (req, res) => {
  const stock = await Stock.find().populate("productId").exec();
  if (!stock || stock.length === 0)
    return res.status(400).send("Stock not found");
  return res.status(200).send({ stock });
};

module.exports = { registerStock, listStock };
