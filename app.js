const cors = require("cors");
const express = require("express");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./openapi.yaml');


const authRouter = require("./routes/api/authRouter");
const transactionsRouter = require("./routes/api/transactions");
const categoriesRouter = require("./routes/api/transactionCategories");
const reportsRouter = require("./routes/api/reports");
const userRouter = require("./routes/api/user");
const authenticateToken = require("./middlewares/authenticateToken");

require("./middlewares/passport-config")(passport);

const app = express();



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
