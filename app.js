const cors = require("cors");
const express = require("express");
const logger = require("morgan");

const transactionsRouter = require("./routes/api/transactions");

require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/transactions", transactionsRouter);

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
