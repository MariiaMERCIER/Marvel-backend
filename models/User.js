const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  email: String,
  token: String,
  hash: String,
  salt: String,
  favoriteComics: [
    {
      title: String,
      description: String,
      avatar: String,
    },
  ],
  favoriteCharacter: [
    {
      name: String,
      description: String,
      avatar: String,
    },
  ],
});

module.exports = User;
