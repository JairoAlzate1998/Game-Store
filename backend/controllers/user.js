const User = require("../models/user");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Process failes: Incomplete data");

  const existing = await User.findOne({ email: req.body.email });
  if (existing)
    return res
      .status(400)
      .send("Process failed: The email user is already registered");

  let hash = await bcrypt.hash(req.body.password, 10);

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    dbStatus: true,
  });

  let result = await user.save();
  if (!result) return res.status(400).send("Failed to register user");
  try {
    let jwt = user.generateJWT();
    return res.status(200).send({ jwt });
  } catch (e) {
    return res.status(400).send("Failed to generate jwt");
  }
};

const listUser = async (req, res) => {
  let user = await User.find({ name: new RegExp(req.params["name"], "i") });
  if (!user || user.length === 0) return res.status(400).send("No user find");
  return res.status(200).send({ user });
};

module.exports = { registerUser, listUser };
