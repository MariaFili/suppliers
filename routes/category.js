const express = require("express");
const router = express.Router();
const moment = require("moment");
// const Category = require('../models/category');
const Advertisement = require("../models/ads");

/* GET home page. */
router.get("/:id", async function(req, res) {
  let id = req.params.id;
  let oneCategory = await Advertisement.findById(id);
  let catName = oneCategory.category;
  let allCategories = await Advertisement.find({ category: catName }).populate(
    "author"
  );
  let allCategoriesUpdated = [];
  allCategories.map(objectMongo => {
    objectMongo = objectMongo.toObject();
    let timetoCheck = objectMongo.expdate;
    
    // time comparasion
    const todayTime = moment();
    const dateExpiry = moment(timetoCheck);
    // будущее время больше чем время сейчас
    // если дата окончания < чем время сейчас, значит не выводим объявление
    // console.log("Актуально ли обновление:", dateExpiry >= todayTime);

    if (dateExpiry >= todayTime) {
      timeToDisplay = moment(timetoCheck).format("MMMM DD YYYY, h:mm");
      objectMongo["expdate"] = timeToDisplay;
      allCategoriesUpdated.push(objectMongo);
    }

  });

  res.render("category", {
    name: catName,
    allCategories: allCategoriesUpdated
  });
});

module.exports = router;
