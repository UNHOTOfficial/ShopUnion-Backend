const express = require("express");
const router = express.Router();
const Tiles = require("../models/Tiles");

router.use(express.json());

//Post Tile Method
router.post("/", async (req, res) => {
  try {
    const tiles = new Tiles({
      title: req.body.title,
      products: req.body.products,
    });
    const dataToSave = await tiles.save();
    const responseToSend = {
      message: "Tile Added Successfully!",
      data: dataToSave,
    };
    res.status(200).json(responseToSend);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get All Tiles Method
router.get("/", async (req, res) => {
  try {
    const data = await Tiles.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/:id", async (req, res) => {
  try {
    let result = await Tiles.findById(req.params.id);
    if (result === null) {
      const notExitError = `Tile Doesn't Exists!`;
      res.status(404).send(notExitError);
    } else {
      result.title = req.body.title;
      result.products.push(req.body.products);
      result.updateDate = Date.now();

      const duplicateTile = await Tiles.exists({
        title: req.body.title,
      });

      //disabled duplicate check temporarily.
      if (duplicateTile !== null) {
        const dataToSave = await result.save();
        const responseToSend = {
          message: "Tile Updated Successfully!",
          Email: dataToSave,
        };
        res.status(200).json(responseToSend);
      } else {
        res.status(409).send("Tile Already Exists.");
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/:id", async (req, res) => {
  try {
    const data = await Tiles.findByIdAndDelete(req.params.id);
    if (data === null) {
      const notExitError = `Tile Doesn't Exists!`;
      res.status(404).send(notExitError);
    } else {
      const responseToSend = {
        message: `Tile (${data.email}) Removed Successfully!`,
        Email: data,
      };
      res.send(responseToSend);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
