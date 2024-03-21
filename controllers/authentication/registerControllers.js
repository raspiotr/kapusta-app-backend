const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { User } = require("../../models/user");

const generateAuthToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
  // Sprawdzenie błędów walidacji
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message:
          "A user with the provided email address is already registered.",
      });
    }

    const avatarUrl = gravatar.url(name, {
      protocol: "https",
      s: "100",
      default: "robohash",
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const balance = 0;

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      balance,
      avatarUrl,
    });

    const token = generateAuthToken(newUser._id);
    newUser.token = token;

    await newUser.save();

    res.status(201).json({
      message: "The user has been successfully registered.",
      token,
      user: {
        name,
        email,
        balance,
        avatarUrl,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "User registration failed." });
  }
};

module.exports = {
  registerUser,
};
