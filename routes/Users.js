const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
router.use(express.json());

//Post Method
router.post("/", async (req, res) => {
  try {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        country: req.body.country,
        birthday: req.body.birthday,
        email: req.body.email,
        password: hashedPassword,
      });
      const userToSave = await user.save();
      const responseToSend = {
        message: "User Saved Successfully!",
        User: userToSave,
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
    const data = await Users.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/:id", async (req, res) => {
  try {
    const data = await Users.findById(req.params.id);
    if (data === null) {
      const notExitError = `User Doesn't Exists!`;
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
    let result = await Users.findById(req.params.id);
    if (result === null) {
      const notExitError = `User Doesn't Exists!`;
      res.status(404).send(notExitError);
    } else {
      result.firstName = req.body.firstName;
      result.lastName = req.body.lastName;
      result.country = req.body.country;
      result.birthday = req.body.birthday;
      result.email = req.body.email;
      result.password = req.body.password;
      result.updateDate = Date.now();

      const duplicateEmail = await Users.exists({ email: req.body.email });

      if (duplicateEmail === null) {
        const dataToSave = await result.save();
        const responseToSend = {
          message: "User Updated Successfully!",
          Product: dataToSave,
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
    const data = await Users.findByIdAndDelete(req.params.id);
    if (data === null) {
      const notExitError = `User Doesn't Exists!`;
      res.status(404).send(notExitError);
    } else {
      const responseToSend = {
        message: `User (${data.email}) Removed Successfully!`,
        user: data,
      };
      res.send(responseToSend);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
