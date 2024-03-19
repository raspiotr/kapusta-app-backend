const cors = require("cors");
const express = require("express");
const logger = require("morgan");
const session = require("express-session");
const passport = require("./middlewares/passport-config");

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



// Serializacja i deserializacja użytkownika
//passport.serializeUser((user, done) => {
//  done(null, user);
//});

//passport.deserializeUser((obj, done) => {
//  done(null, obj);
//});

// konfiguracja logowania przez Google
//passport.use(
//  new GoogleStrategy(
//    {
//      clientID: process.env.GOOGLE_CLIENT_ID,
//      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//      callbackURL: process.env.GOOGLE_CALLBACK_URL,
//    },
//    (accessToken, refreshToken, profile, done) => {
//      // dane profilu użytkownika:
//      return done(null, profile);
//    }
//  )
//);

// Inicjalizacja sesji Passport
app.use(passport.initialize());
app.use(passport.session());

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
      //obsł. ścieżek dla api:
app.use("/api/transactions", authenticateToken, transactionsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/auth", authRouter);
app.use("/api/reports", authenticateToken, reportsRouter);
app.use("/api/user", authenticateToken, userRouter);
      //obsł. błędnych ścieżek
app.use((_, res, __) => {
  res.status(404).json({
    message: "Not found",
  });
});
      //obsł.błedów
app.use((err, _, res, __) => {
  res.status(500).json({
    message: err.message,
  });
});

module.exports = app;
