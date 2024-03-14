const express = require("express");
const { check } = require("express-validator");
const { registerUser } = require("../../controllers/authController");

const router = express.Router();

router.post(
  "/register",

  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 5 or more characters"
    ).isLength({ min: 5 }),
  ],
  registerUser
);

module.exports = router;
