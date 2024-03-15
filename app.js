const cors = require("cors");
const express = require("express");
const logger = require("morgan");
require("dotenv").config();

const authRouter = require("./routes/api/authRouter");
const transactionsRouter = require("./routes/api/transactions");
const categoriesRouter = require("./routes/api/transactionCategories");
const reportsRouter = require("./routes/api/reports");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.get("/", (_, res) => {
  res.send("Server running on Heroku page :)");
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/transactions", transactionsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/auth", authRouter);
app.use("/api/reports", reportsRouter);

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
