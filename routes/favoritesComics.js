const express = require("express");
const router = express.Router();

const isAuthentificated = require("../middlewares/isAuthentificated");

const Comics = require("../models/Comics");

router.post("/favorites/comics", isAuthentificated, async (req, res) => {
  try {
    console.log(req.body);

    if (await User.findOne({ id: req.body.id })) {
      return res
        .status(400)
        .json("This character has already been in your favoris");
    }

    if (req.body.title) {
      const newComics = new Comics({
        title: req.body.title,
        description: req.body.description,
        // image: req.body.image,
      });

      newComics.save();
      res.status(200).json({ newComics });
    }
  } catch (error) {
    console.log({ massage: error.message });
  }
});

router.get("/favoritescomics", async (req, res) => {
  try {
    const comics = await Comics.find();
    res.status(200).json(comics);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
