const express = require("express");
const router = express.Router();

const isAuthentificated = require("../middlewares/isAuthentificated");

const User = require("../models/User");

router.put("/favorites/new", isAuthentificated, async (req, res) => {
  try {
    const userUpdate = await User.findOne({ email: req.body.email });

    const comicsSearch = userUpdate.favoriteComics;

    if (req.body.title) {
      // On verifie si le comics n'est pas déjà dans les favoris
      for (let i = 0; i < comicsSearch.length; i++) {
        if (comicsSearch[i].title === req.body.title) {
          return res.status(400).json({
            message: "This comics has already been in your favorites",
          });
        }
      }

      const newChoiceComics = {
        title: req.body.title,
        description: req.body.description || "",
        avatar: req.body.avatar || "",
      };
      userUpdate.favoriteComics.push(newChoiceComics);
    }

    const charachterSearch = userUpdate.favoriteCharacter;

    if (req.body.name) {
      // On verifie si le personnage n'est pas déjà dans les favoris

      for (let i = 0; i < charachterSearch.length; i++) {
        if (charachterSearch[i].name === req.body.name) {
          return res.status(400).json({
            message: "This character has already been in your favorites",
          });
        }
      }
      const newChoiceCharacter = {
        name: req.body.name,
        description: req.body.description || "",
        avatar: req.body.avatar || "",
      };
      userUpdate.favoriteCharacter.push(newChoiceCharacter);
    }

    // On rajoute un nouveau comics-favoris à l'user

    await userUpdate.save();

    res.status(200).json("You have successefully added new favorite");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/favorite/delete", isAuthentificated, async (req, res) => {
  const userUpdate = req.user;

  if (req.body.title) {
    try {
      const newFavorites = userUpdate.favoriteComics.filter((favorite) => {
        return favorite.title !== req.body.title;
      });

      userUpdate.favoriteComics = newFavorites;

      await userUpdate.save();
      res
        .status(200)
        .json(
          `The comics ${req.body.title} has been deleted successfully from your favorite`
        );
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  if (req.body.name) {
    try {
      const newFavorites = await userUpdate.favoriteCharacter.filter(
        (favorite) => {
          return favorite.name !== req.body.name;
        }
      );

      userUpdate.favoriteCharacter = newFavorites;

      await userUpdate.save();
      res
        .status(200)
        .json(
          `The character ${req.body.name} has been deleted successfully from your favorite`
        );
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
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
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
