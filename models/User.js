const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  email: String,
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
