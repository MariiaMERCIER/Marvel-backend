const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();

const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

const axios = require("axios");
require("dotenv").config();

const ComicsRoutes = require("./routes/comics");
app.use(ComicsRoutes);
const PersonnageRoutes = require("./routes/personnage");
app.use(PersonnageRoutes);

const UserRoutes = require("./routes/user");
app.use(UserRoutes);

app.all("*", (req, res) => {
  res.status(404).send("No page with this name");
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
