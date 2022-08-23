const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/Products");
const ProductsRoutes = require("./routes/Products");
const UsersRoutes = require("./routes/Users");
const NewsletterSubsRoutes = require("./routes/NewsletterSubs");
const ConfigsRoutes = require("./routes/Configs");
const TilesRoutes = require("./routes/Tiles");
const app = express();
app.disable('x-powered-by');  

const cors = require("cors");
const NewsletterSubs = require("./models/NewsletterSubs");
app.use(cors());

app.use("/api/products", ProductsRoutes);
app.use("/api/users", UsersRoutes);
app.use("/api/newsletter", NewsletterSubsRoutes);
app.use("/api/configs", ConfigsRoutes);
app.use("/api/tiles", TilesRoutes);



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
