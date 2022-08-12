const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Products");
const ProductsRoutes = require("./routes/Products");
const UsersRoutes = require("./routes/Users");
const app = express();

const cors = require("cors");
app.use(cors());

app.use("/api/products", ProductsRoutes);
app.use("/api/users", UsersRoutes);

mongoose.connect(
  "mongodb+srv://ShopUnionAdmin:ErM3BEIdyaz71PuT@cluster0.9yswveu.mongodb.net/test"
);

const dataBase = mongoose.connection;

dataBase.on("error", (error) => {
  console.log(error);
});

dataBase.once("connected", () => {
  console.log("Database Connected");
});

app.listen(3001, () => {
  console.log(`Server Started at ${3001}`);
});

//main get
app.get("/", (req, res) => {
  res.send("ShopUnion Api");
});
