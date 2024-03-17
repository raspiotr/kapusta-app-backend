const cors = require("cors");
const express = require("express");
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");

const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
require("dotenv").config();

const authRouter = require("./routes/api/authRouter");
const transactionsRouter = require("./routes/api/transactions");
const categoriesRouter = require("./routes/api/transactionCategories");
const reportsRouter = require("./routes/api/reports");
const userRouter = require("./routes/api/user");
const authenticateToken = require("./middlewares/authenticateToken");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.get("/", (_, res) => {
  res.send("Server running on Heroku page :)");
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Konfiguracja sesji
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Inicjalizacja sesji Passport
app.use(passport.initialize());
app.use(passport.session());

// Serializacja i deserializacja użytkownika
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// konfiguracja logowania przez Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // dane profilu użytkownika:
      return done(null, profile);
    }
  )
);

// routing dla logowania przez google
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // przekierowanie na stronę główną  - po udanym uwierzytelnieniu
    res.redirect("/");
  }
);

app.use("/api/transactions", authenticateToken, transactionsRouter);
app.use(
  "/api/categories",
  // authenticateToken,
  categoriesRouter
);
app.use("/api/auth", authRouter);
app.use(
  "/api/reports",
  // authenticateToken,
  reportsRouter
);
app.use("/api/user", authenticateToken, userRouter);

app.use((_, res, __) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.use((err, _, res, __) => {
  res.status(500).json({
    message: err.message,
  });
});

module.exports = app;
