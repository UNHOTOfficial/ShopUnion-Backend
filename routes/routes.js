const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../model/model");
const app = express();

router.use("/", express.json());

const Model = require("../model/model");

//main get
router.get("/", (req, res) => {
  res.send("ShopUnion Api");
});

//Post Method
router.post("/products", async (req, res) => {
  try {
    const product = new Product({
      image: req.body.image,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      hasDiscount: req.body.hasDiscount,
      discount: req.body.discount,
      rating: {
        rate: req.body.rating.rate,
        count: req.body.rating.count,
      },
    });

    const checkProduct = await Model.exists({ title: product.title });
    if (checkProduct !== null) {
      const duplicateError = `Another Product With (${product.title}) Already Exists!\n Can't Save Duplicate Products.`;
      res.status(409).send(duplicateError);
    } else {
      const dataToSave = await product.save();
      const responseToSend = {
        message: "Product Saved Successfully!",
        Product: dataToSave,
      };
      res.status(200).json(responseToSend);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/products", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Get by ID Method
router.get("/products/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/products/:id", async (req, res) => {
  try {
    let result = await Model.findById(req.params.id);

    result.image = req.body.image;
    result.title = req.body.title;
    result.description = req.body.description;
    result.price = req.body.price;
    result.hasDiscount = req.body.hasDiscount;
    result.discount = req.body.discount;
    result.rating.rate = req.body.rating.rate;
    result.rating.count = req.body.rating.count;
    result.updateDate = Date.now();

    const checkProduct = await Model.exists({ title: result.title });
    if (checkProduct !== null) {
      const duplicateError = `Another Product With (${result.title}) Already Exists!\n Can't Save Duplicate Products.`;
      res.status(409).send(duplicateError);
    } else {
      const dataToSave = await result.save();
      const responseToSend = {
        message: "Product Updated Successfully!",
        Product: dataToSave,
      };
      res.status(200).json(responseToSend);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/products/:id", async (req, res) => {
  try {
    const data = await Model.findByIdAndDelete(req.params.id);
    const responseToSend = {
      message: `Product (${data.title}) Removed Successfully!`,
      Product: data,
    };
    res.send(responseToSend);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
