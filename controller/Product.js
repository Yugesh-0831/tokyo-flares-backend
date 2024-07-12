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

exports.fetchAllProducts = async (req, res) => {
  let query = Product.find({});
  let totalProductsQuery = Product.find({});
  if (req.query.category) {
    query = query.find({ category: req.query.category });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }
  const totalDocs = await totalProductsQuery.count().exec();
  console.log({ totalDocs });
  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    product.discountPrice = Math.round(
      product.price * (1 - product.discountPercentage / 100)
    );
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};
