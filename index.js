const express = require("express");
const app = express();
app.use(express.json());
app.use(express.json());

const ComicsRoutes = require("./routes/comics");
app.use(ComicsRoutes);
const PersonnageRoutes = require("./routes/personnage");
app.use(PersonnageRoutes);

app.listen(4000, () => {
  console.log("Server started");
});
