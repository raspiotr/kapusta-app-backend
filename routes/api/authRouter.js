const express = require("express");
const { check } = require("express-validator");
const {registerUser,} = require("../../controllers/authentication/registerControllers");
const { loginUser, } = require("../../controllers/authentication/loginControllers");

const router = express.Router();

// walidacja danych rejestracji 
const validateRegister = [
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Please enter a password with 5 or more characters").isLength({ min: 5 }),
];

// walidacja danych logowania 
const validateLogin = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").notEmpty(),
];

// endpoint rejestracji 
router.post("/register", validateRegister, registerUser);

// endpoint logowania 
router.post("/login", validateLogin, loginUser);

module.exports = router;
