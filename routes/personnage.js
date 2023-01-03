const express = require("express");
const router = express.Router();
require("dotenv").config();
const axios = require("axios");

router.get("/characters", async (req, res) => {
  try {
    const name = req.query.name || "";
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;

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
    res.status(200).json(response.data);

    let pageRequired = 1;

    if (req.query.page) {
      pageRequired = Number(req.query.page);
    }
    // const skip = (Number(req.query.page) - 1) * limit;
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.API_KEY_MARVEL}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
