const express = require("express");
const router = express.Router();
const controller = require("../controllers/products-controller.js");

router.get("/", controller.getData, controller.show);
router.get("/:id", controller.getData, controller.showDetails);

module.exports = router;