const express = require("express");
const controller = require("../controllers/products-controller.js");

const router = express.Router();

router.get("/", controller.getData, controller.show);
router.get("/:id", controller.getData, controller.showDetails);

module.exports = router;