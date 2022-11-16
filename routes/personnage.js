const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY_MARVEL}`,
      {
        params: {
          name: req.query.name,
          limit: req.query.limit,
          skip: req.query.skip,
        },
      }
    );
    res.status(200).json(response.data.results);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    console.log(req.params.characterId);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.API_KEY_MARVEL}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
