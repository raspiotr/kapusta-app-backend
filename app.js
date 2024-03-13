const express = require("express");
require("dotenv").config();
require("colors");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`.green);
});

app.use((_, res) => {
  res.status(404).json({ message: "Not found".red });
});

app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message.red });
});

module.exports = app;
