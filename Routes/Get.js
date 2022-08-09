const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("ShopUnion™ Api v1.0");
  });
  router.get("/api", (req, res) => {
    res.send("ShopUnion™ Api v1.0");
  });

  module.exports = router;