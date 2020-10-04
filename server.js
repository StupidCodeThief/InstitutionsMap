const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
var cors = require('cors')

const connectDb = require("./api/database/connectToDb");
const auth = require("./api/routes/auth");
const places = require("./api/routes/places");
const user = require("./api/routes/user");
const errorHandler = require('./api/middlewares/errorHandler');

const app = express();

app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(cors());

connectDb();

app.use("/api/auth", auth);
app.use("/api/places", places);
app.use("/api/user", user);

const PORT = process.env.PORT || 5000;

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});

process.on("SIGINT", () => {
  mongoose.connection.close();
  server.close();
});
