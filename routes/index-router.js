const express = require("express");
const controller = require("../controllers/index-controller.js");

const router = express.Router();

router.get("/", controller.showHomePage);
router.get("/:page", controller.showPage);

module.exports = router;