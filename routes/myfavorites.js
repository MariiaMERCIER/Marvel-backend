const express = require("express");
const router = express.Router();

const axios = require("axios");

const Comics = require("../models/Comics");
const Character = require("../models/Character");

router.post("/myfavorites", isAuthentificated, async (req, res) => {
  try {
    if (req.body.title) {
      const newComics = new Comics({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
      });

      newComics.save();
      res.status(200).json({ newComics });
    } else if (req.body.name) {
      const newCharacter = new Character({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
      });

      newCharacter.save();
      res.status(200).json({ newCharacter });
    }
  } catch (error) {
    console.log({ massage: error.message });
  }
});

module.exports = router;
