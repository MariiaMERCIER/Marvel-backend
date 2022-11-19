const mongoose = require("mongoose");

const Comics = mongoose.model("Comics", {
  title: String,
  description: String,
  image: String,
});

module.exports = Comics;
