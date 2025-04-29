const express = require("express");
const router = express.Router();
const controller = require("../controllers/index-controller.js");

router.get("/", controller.showHomePage);
router.get("/:page", controller.showPage);

module.exports = router;