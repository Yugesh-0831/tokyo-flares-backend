const express = require("express");
const { createProduct } = require("../controller/Product");

const router = express.Router();
// /products is already added in index.js
router.post("/", createProduct);

module.exports = router;
