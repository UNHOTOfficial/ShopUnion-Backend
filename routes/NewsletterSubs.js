const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const NewsletterSubs = require("../models/NewsletterSubs");

router.use(express.json());

//Post Method
router.post("/", async (req, res) => {
  try {
    try {
      const newsletterSubs = new NewsletterSubs({
        email: req.body.email,
      });
      const emailToSave = await newsletterSubs.save();
      const responseToSend = {
        message: "Subscribed Successfully!",
        Email: emailToSave,
      };
      res.status(200).json(responseToSend);
    } catch (error) {
      res.status(500).send(error.message);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/", async (req, res) => {
  try {
    const data = await NewsletterSubs.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/:id", async (req, res) => {
  try {
    const data = await NewsletterSubs.findById(req.params.id);
    if (data === null) {
      const notExitError = `Email Doesn't Exists!`;
      res.status(404).send(notExitError);
    } else {
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/:id", async (req, res) => {
  try {
    let result = await NewsletterSubs.findById(req.params.id);
    if (result === null) {
      const notExitError = `Email Doesn't Exists!`;
      res.status(404).send(notExitError);
    } else {
      result.email = req.body.email;
      result.updateDate = Date.now();

      const duplicateEmail = await NewsletterSubs.exists({
        email: req.body.email,
      });

      if (duplicateEmail === null) {
        const dataToSave = await result.save();
        const responseToSend = {
          message: "Email Updated Successfully!",
          Email: dataToSave,
        };
        res.status(200).json(responseToSend);
      } else {
        res.status(409).send("Email Already Exists.");
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/:id", async (req, res) => {
  try {
    const data = await NewsletterSubs.findByIdAndDelete(req.params.id);
    if (data === null) {
      const notExitError = `Email Doesn't Exists!`;
      res.status(404).send(notExitError);
    } else {
      const responseToSend = {
        message: `Email (${data.email}) Removed Successfully!`,
        Email: data,
      };
      res.send(responseToSend);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
