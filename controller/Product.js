const { Product } = require("../model/product");

exports.createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const response = await newProduct.save();
    res.status(201).json(response);
  } catch (e) {
    res.status(400).json(e);
  }
};
