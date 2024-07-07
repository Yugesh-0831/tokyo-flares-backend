const express = require("express");
const server = express();
const mongoose = require("mongoose");
const { createProduct } = require("./controller/Product");
const productsRouter = require("./routes/Products");

//middleware
server.use(express.json()); //to parse req.body
server.use("/products", productsRouter);

main();

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
}

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.post("/products", createProduct);

server.listen(8080, () => {
  console.log("server started successfully");
});
