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
