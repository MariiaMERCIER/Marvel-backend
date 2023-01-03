const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const encBase64 = require("crypto-js/enc-base64");
const sha256 = require("crypto-js/sha256");

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json("The element missing");
    }

    if (await User.findOne({ email: req.body.email })) {
      return res.status(400).json("The mail has already used");
    }

    const password = req.body.password;
    const salt = uid2(16);
    const hash = sha256(salt + password).toString(encBase64);
    const token = uid2(64);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      token: token,
      hash: hash,
      salt: salt,
    });
    await newUser.save();

    res
      .status(200)
      .json({ name: newUser.name, email: newUser.email, token: token });
  } catch ({ error }) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "The element missing" });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "There is no account with the email" });
    }

    const newPassword = req.body.password;
    // console.log(newPassword);
    const newSalt = user.salt;
    // console.log(newSalt);
    const newHash = sha256(newSalt + newPassword).toString(encBase64);
    // console.log(newHash);

    if (newHash !== user.hash) {
      return res
        .status(401)
        .json({ message: "The email or password isn't correct" });
    }

    res
      .status(200)
      .json({ name: user.name, email: user.email, token: user.token });
  } catch ({ error }) {
    console.log(error);
  }
});

module.exports = router;
