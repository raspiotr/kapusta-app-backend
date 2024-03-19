// plik konfiguracji "strategii" Passport.js

require("dotenv").config();
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const User = require("../models/user");

passport.use(
    new GoogleStrategy(
        {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
        try {
            // sprawdzenie czy użytkownik już istnieje w bazie danych  - po mailu
            let user = await User.findOne({ email: profile.email });

            if (user) {
            // jak istnieje to zwracamy jego dane:
            return done(null, user);
            } else {
            // jak nie istnieje to  rejestracja :
            user = new User({
                name: profile.displayName,
                email: profile.email,
                //ewent. można dodać jeszcze jakieś potrzebne informacje
            });

// zapis nowego użytkownika do bazy:
            await user.save();

// nowy użytkownik jest zwracany:
            return done(null, user);
            }
        } catch (error) {
            return done(error);
        }
        }
    )
);

// serializacja użytkownika                    - mechanizm utrzymujący id użykownika pomiędzy zapytaniami http (!)
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

module.exports = passport;