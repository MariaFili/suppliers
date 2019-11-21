const express = require("express");
const router = express.Router();
// const Category = require('../models/category');
const Advertisement = require("../models/ads");

/* GET home page. */
router.get("/:id", async function (req, res) {
  
  let id = req.params.id;
  let oneCategory = await Advertisement.findById(id);
  let catName = oneCategory.category;
  let allCategories = await Advertisement.find({ category: catName }).populate("author");
  res.render("category", {
    name: catName,
    allCategories
  });
});


module.exports = router;
