// plik konfiguracji "strategii" Passport.js
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const { User } = require("../models/user");

const generateAuthToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          "https://kapusta-app-eafad5d610ef.herokuapp.com/api/auth/google/callback",
      },
      async (_, __, profile, done) => {
        try {
          //console.log(profile);
          // sprawdzenie czy użytkownik już istnieje w bazie danych  - po mailu
          let user = await User.findOne({ email: profile._json.email });
          if (user) {
            const token = generateAuthToken(user._id);
            user.token = token;
            await User.findByIdAndUpdate(user._id, { token });
            // jak istnieje to zwracamy jego dane:
            return done(null, user);
          } else {
            // jak nie istnieje to  rejestracja :
            const hashedPassword = await bcrypt.hash(profile._json.sub, 10);
            const balance = 0;

            const newUser = new User({
              name: profile._json.name,
              email: profile._json.email,
              password: hashedPassword,
              balance,
              avatarUrl: profile._json.picture,
            });

            const token = generateAuthToken(newUser._id);
            newUser.token = token;

            await newUser.save();
            // nowy użytkownik jest zwracany:
            user = newUser;
            return done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // serializacja użytkownika
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // deserializacja użytkownika
  passport.deserializeUser(async (id, done) => {
    try {
      // wysz. usera w bazie po jego id
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
