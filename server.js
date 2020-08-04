const express = require("express");
const mongoose = require("mongoose");

const connectDb = require("./api/database/connectToDb");
const auth = require("./api/routes/auth");

const app = express();

app.use("/api/auth", auth);

connectDb();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});

process.on("SIGINT", () => {
  mongoose.connection.close();
  server.close();
});