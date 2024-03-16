const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { User } = require("../../models/user");

const generateAuthToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    };

    const registerUser = async (req, res) => {
    // Sprawdzenie błędów walidacji
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
        return res
            .status(400)
            .json({ message: "Użytkownik o podanym adresie e-mail już istnieje" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
        name,
        email,
        password: hashedPassword,
        });

        await newUser.save();

        const token = generateAuthToken(newUser._id);

        res
        .status(201)
        .json({ message: "Użytkownik został pomyślnie zarejestrowany", token });
    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({ message: "Wystąpił błąd podczas rejestracji użytkownika" });
    }
    };

    module.exports = {
    registerUser,
};
