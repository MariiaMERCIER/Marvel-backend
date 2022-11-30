const express = require("express");
const router = express.Router();

const isAuthentificated = require("../middlewares/isAuthentificated");

const User = require("../models/User");

router.put("/favorites/new", isAuthentificated, async (req, res) => {
  try {
    const userUpdate = await User.findOne({ email: req.body.email });

    // On verifie si notre user est bien connecté

    if (!userUpdate) {
      return res.status(400).json("You are not connected");
    }
    if (req.body.title) {
      const newChoiceComics = {
        title: req.body.title,
        description: req.body.description || "",
        avatar: req.body.avatar || "",
      };
      userUpdate.favoriteComics.push(newChoiceComics);
    }

    if (req.body.name) {
      const newChoiceCharacter = {
        name: req.body.name,
        description: req.body.description || "",
        avatar: req.body.avatar || "",
      };
      userUpdate.favoriteCharacter.push(newChoiceCharacter);
    }

    // On rajoute un nouveau comics-favoris à l'user

    userUpdate.save();

    res.status(200).json("You have successefully added new favorite");
  } catch (error) {
    console.log({ massage: error.message });
  }
});

router.get("/favorites", isAuthentificated, async (req, res) => {
  try {
    // On verifier si mon user est bien connécté

    const user = await User.find();

    // On présent des résultats au user

    res.status(200).json({
      comics: user[0].favoriteComics,
      character: user[0].favoriteCharacter,
    });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
