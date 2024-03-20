const express = require("express");
const { check } = require("express-validator");
const passport = require("passport");
const {
  registerUser,
} = require("../../controllers/authentication/registerControllers");
const {
  loginUser,
  logoutUser,
} = require("../../controllers/authentication/loginControllers");
const authenticateToken = require("../../middlewares/authenticateToken");
const currentUser = require("../../controllers/authentication/current");
const googleAuth = require("../../controllers/authentication/googleAuth");

const router = express.Router();

// walidacja danych rejestracji
const validateRegister = [
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 5 or more characters"
  ).isLength({ min: 5 }),
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

// endpoint wylogowania
router.post("/logout", authenticateToken, logoutUser);

// pobranie info o aktualnie zalogowanym użytkowniku
router.get("/current", authenticateToken, currentUser);

// endpoint logowania za pomocą konta Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// callback endpoint dla uwierzytelnienia Google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleAuth
);

// Przykładowa chroniona ścieżka, dostępna tylko dla uwierzytelnionych użytkowników
router.get("/protected", authenticateToken, (req, res) => {
  res.send("This path is only accessible to logged-in users.");
});

module.exports = router;
