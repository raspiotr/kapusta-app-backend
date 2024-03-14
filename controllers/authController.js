const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { User } = require("../models/user");

const registerUser = async (req, res) => {
  // Sprawdzenie błędów walidacji
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email }); // Sprawdzenie, czy użytkownik o podanym adresie e-mail już istnieje w bazie danych
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Użytkownik o podanym adresie e-mail już istnieje" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Haszowanie hasła użytkownika,

    // Zapisanie nowego użytkownika do bazy danych
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Tutaj można  wysłać e-mail z linkiem potwierdzającym - do uzupełnienia potem

    res
      .status(201)
      .json({ message: "Użytkownik został pomyślnie zarejestrowany" });
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
