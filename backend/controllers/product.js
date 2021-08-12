const Product = require("../models/product");

const registerProduct = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.price ||
    !req.body.code ||
    !req.body.description
  )
    return res.status(400).send("Process failes: Incomplete data");

  const existing = await Product.findOne({ name: req.body.name });
  if (existing)
    return res
      .status(400)
      .send("Process failed: The product is already registered");

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    code: req.body.code,
    desciption: req.body.description,
  });

  const result = await product.save();
  if (!result) return res.status(400).send("Failed to register product");
  return res.status(200).send({ product });
};

const listProduct = async (req, res) => {
  const product = await Product.find();
  if (!product || product.length === 0)
    return res.status(400).send("No product find");
  return res.status(200).send({ product });
};

module.exports = { registerProduct, listProduct };
