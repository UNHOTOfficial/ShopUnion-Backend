const express = require("express");
const mongoose = require("mongoose");
const Product = require("./model/model");
const routes = require("./routes/routes");
const app = express();

app.use("/api", routes);

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

//creating an async function
const run = async () => {
  try {
    //creating local product
    const product = new Product({
      image: "http://placeimg.com/640/480/sports",
      title: "First Product",
      description: "good product",
      price: 50,
      hasDiscount: true,
      discount: 10,
      rating: {
        rate: 4.5,
        count: 120,
      },
    });
    //sending local product to database
    //await product.save();

    //log to console if successful
    console.log(`Product Saved Successfully! : ${product}`);
  } catch (error) {
    console.log(error.message);
  }
};

//calling async function
run();
