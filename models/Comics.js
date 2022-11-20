const mongoose = require("mongoose");

const Comics = mongoose.model("Comics", {
  id: String,
  title: String,
  description: String,
  image: String,
});

module.exports = Comics;
