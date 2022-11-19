const { stringify } = require("crypto-js/enc-base64");
const mongoose = require("mongoose");

const Character = mongoose.model("User", {
  title: String,
  description: String,
  image: String,
});

module.exports = Character;
