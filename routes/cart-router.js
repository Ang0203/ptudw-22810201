const express = require("express");
const router = express.Router();
const controller = require("../controllers/cart-controller.js");

router.get("/", controller.show);
router.post("/", controller.add);
router.put("/", controller.update);
router.delete("/", controller.remove);
router.delete("/all", controller.clear);

module.exports = router;