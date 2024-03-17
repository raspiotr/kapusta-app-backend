// plik konfiguracji "strategii" Passport.js

const passport = require("passport");
const GoogleOAuth2Strategy = require("passport-google-oauth2").Strategy;

passport.use(
    new GoogleOAuth2Strategy(
        {
        clientID: GOOGLE_CLIENT_ID, // te info po zarejestrowaniu naszej aplikacji w Google Developer Console
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback", // nie mam pewności czy to ma być na localhost
        },
        function (accessToken, refreshToken, profile, done) {
        // tu będą  przetwarzane dane profilu użytkownika:
        return done(null, profile);
        }
    )
);
