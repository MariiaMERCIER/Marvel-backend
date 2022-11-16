const express = require("express");
const router = express.Router();
const axios = require("axios");
const { response } = require("express");

// const Comics = require("../models/Comics");
// console.log(Comics);

router.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY_MARVEL}`,
      {
        params: {
          title: req.query.title,
          limit: req.query.limit,
          skip: req.query.skip,
        },
      }
    );

    // console.log(response.data.results);
    res.status(200).json(response.data.results);

    let pageRequired = 1;

    if (req.query.page) {
      pageRequired = Number(req.query.page);
    }
  } catch (error) {
    console.log("catch>>>:", error);
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
