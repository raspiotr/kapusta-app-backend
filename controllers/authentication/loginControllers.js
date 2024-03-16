const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { User } = require("../../models/user");

const generateAuthToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    };

    const loginUser = async (req, res) => {
    // Sprawdzenie błędów walidacji
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateAuthToken(user._id);

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
    
const logoutUser = async (req, res) => {
  // kod usuwający token z lokalnego storage'u 
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

    module.exports = {
      loginUser,
      logoutUser,
    };
