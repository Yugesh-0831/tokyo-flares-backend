const express = require("express");
const server = express();
const mongoose = require("mongoose");
const { createProduct } = require("./controller/Product");
const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Categories");
const brandsRouter = require("./routes/Brands");
const userRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const orderRouter = require("./routes/Order");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

//middleware
app.use(express.static(path.join(__dirname, "build")));
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json()); //to parse req.body
server.use("/products", productsRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/brands", brandsRouter.router);
server.use("/users", userRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", orderRouter.router);

main();

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
}

server.get("/*", (req, res) => {
  res.json("Hello");
});

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

server.post("/products", createProduct);

server.listen(process.env.PORT, () => {
  console.log("server started successfully");
});
