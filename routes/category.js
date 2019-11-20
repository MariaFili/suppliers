const express = require("express");
const router = express.Router();
// const Category = require('../models/category');



// const category = articlesModels.carsModel;
// const estateModel = articlesModels.estateModel;
// const petsModel = articlesModels.petsModel;

/* GET home page. */
router.get("/", function(req, res) {
  // let currentCategory = await Category.find();
  res.render("category");
});

// router.get("/estate", async function(req, res) {
//   let currentArticle = await estateModel.find();
//   res.render("articles", { article: currentArticle });
// });
// router.get("/pets", async function(req, res) {
//   let currentArticle = await petsModel.find();
//   res.render("articles", { article: currentArticle });
// });



module.exports = router;