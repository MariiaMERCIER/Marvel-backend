const express = require("express");
const router = express.Router();
require("dotenv").config();
const axios = require("axios");

router.get("/comics", async (req, res) => {
  try {
    const title = req.query.title || "";
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY_MARVEL}`,
      {
        params: {
          title: title,
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
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.API_KEY_MARVEL}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
