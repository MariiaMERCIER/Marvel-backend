const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.get("/characters", async (req, res) => {
  try {
    // console.log(req.query);
    const name = req.query.name || "";
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    // console.log(name);
    // console.log(limit);
    // console.log(skip);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY_MARVEL}`,
      {
        params: {
          name: name,
          limit: limit,
          skip: skip,
        },
      }
    );
    console.log(response.data);
    res.status(200).json(response.data);
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
