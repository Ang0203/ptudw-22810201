const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth-controller.js");
const { body, getErrorMessage } = require("../controllers/validator.js");

router.get("/login", controller.show);
router.post("/login",
    body("email").trim().notEmpty().withMessage("Email is required!").isEmail().withMessage("Invalid email address!"),
    body("password").trim().notEmpty().withMessage("Password is required!"),
    (req, res, next) => {
        let message = getErrorMessage(req);
        if (message) {
            return res.render("login", { loginMessage: message });
        };
        next();
    },
    controller.login
);
router.post("/register",
    body("firstName").trim().notEmpty().withMessage("First name is required!"),
    body("lastName").trim().notEmpty().withMessage("Last name is required!"),
    body("email").trim().notEmpty().withMessage("Email is required!").isEmail().withMessage("Invalid email address!"),
    body("password").trim().notEmpty().withMessage("Password is required!"),
    body("confirmPassword").custom((confirmPassword, { req }) => {
        if (confirmPassword != req.body.password) {
            throw new Error("Password not match!");
        }
        return true;
    }),
    (req, res, next) => {
        let message = getErrorMessage(req);
        if (message) {
            return res.render("login", { registerMessage: message });
        };
        next();
    },
    controller.register
);

router.get("/logout", controller.logout);

module.exports = router;