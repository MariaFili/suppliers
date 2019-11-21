const express = require("express");
const router = express.Router();
// const Category = require('../models/category');
const Advertisement = require("../models/ads");

// const category = articlesModels.carsModel;
// const estateModel = articlesModels.estateModel;
// const petsModel = articlesModels.petsModel;

/* GET home page. */
router.get("/:id", async function(req, res) {
  // let currentCategory = await Category.find();
  console.log("category here");
  let id = req.params.id;
  console.log("category id", id);
  let oneCategory = await Advertisement.findById(id);
  let catName = oneCategory.category;
  let allCategories = await Advertisement.find({ category: catName }).populate("author");
  console.log(allCategories);
  res.render("category", {
    name: catName,
    allCategories
  });
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
