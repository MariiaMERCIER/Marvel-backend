const express = require("express");
const router = express.Router();

const isAuthentificated = require("../middlewares/isAuthentificated");

const Character = require("../models/Character");

router.post("/favorites/character", isAuthentificated, async (req, res) => {
  try {
    console.log(req.body);
    console.log(token);
    if (await User.findOne({ id: req.body.id })) {
      return res
        .status(400)
        .json("This comics has already been  in your favoris");
    }

    if (req.body.name) {
      const newCharacter = new Character({
        name: req.body.name,
        description: req.body.description,
        // image: req.body.image,
      });

      newCharacter.save();
      res.status(200).json({ newCharacter });
    }
  } catch (error) {
    console.log({ massage: error.message });
  }
});

router.get("/favoritescharacter", async (req, res) => {
  try {
    const character = await Character.find();
    res.status(200).json(character);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
