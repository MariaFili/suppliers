const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Advertisement = require("../models/ads");
const moment = require("moment");

//
router.get("/", async function(req, res) {
  let username = req.cookies["user"];

  let userinfo = await User.findOne({ login: username }).populate(
    "advertisements"
  );
  ads = userinfo.advertisements;

  let addsinfo = [];
  for (let i = 0; i < ads.length; i++) {
    let eachaddinfo = await Advertisement.findById(ads[i].id).populate(
      "responses"
    );

    // console.log("eachaddinfo", eachaddinfo);
    // если был выбран исполнитель - то сделка останется висеть в кабинете
    if (eachaddinfo.executor !== null) {
      console.log("found add that will not be removed after expiration");
      addsinfo.push(eachaddinfo);
    } else {
      // проверка на время - показываем только свежие объявления
      let timetoCheck = eachaddinfo.expdate;

      // time comparasion
      const todayTime = moment();
      const dateExpiry = moment(timetoCheck);
      // будущее время больше чем время сейчас
      // если дата окончания < чем время сейчас, значит не выводим объявление
      // console.log("Актуально ли обновление:", dateExpiry >= todayTime);

      if (dateExpiry >= todayTime) {
        // timeToDisplay = moment(timetoCheck).format("MMMM DD YYYY, h:mm");
        // objectMongo["expdate"] = timeToDisplay;
        addsinfo.push(eachaddinfo);
      }
    }
  }

  res.render("yourorders", { addsinfo });
});

router.get("/addorder", async function(req, res) {
  res.render("addorder", {});
});

router.post("/", async function(req, res) {
  let userFound = await User.findOne({ login: req.cookies["user"] });
  await userFound.addAdvertisement(
    req.body.title,
    req.body.description,
    req.body.category,
    req.body.district,
    req.body.city
  );
  res.redirect("/yourorders");
});

module.exports = router;
