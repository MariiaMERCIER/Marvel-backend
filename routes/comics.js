const express = require("express");
const router = express.Router();
const axios = require("axios");

require("dotenv").config();

// const Comics = require("../models/Comics");
// console.log(Comics);

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

    // console.log(response.data.results);
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
    console.log(req.params.characterId);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.API_KEY_MARVEL}`
    );
    // console.log(req.params);
    res.status(200).json(response.data);
  } catch (error) {
    console.log("catch>>>:", error);
  }
});

module.exports = router;
