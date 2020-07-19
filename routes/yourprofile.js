const express = require("express");
const router = express.Router();
const User = require("../models/users");
const ResponseCollection = require("../models/responses");
const moment = require("moment");

// registration
router.get("/", async function(req, res) {
  // console.log('here in profile page')
  let username = req.cookies["user"];
  let user = await User.findOne({ login: username });

  res.render("yourprofile", {
    companyname: user.info.companyname,
    phone: user.info.phone,
    email: user.info.email,
    inn: user.info.inn
  });
});

router.post("/redir", async function(req, res, next) {
  res.redirect(`../yourorders`);
});

router.post("/upload", async function(req, res, next) {
  // console.log("in upload post");
  // res.redirect(`../yourorders`);
});

router.get("/yourresponses", async function(req, res) {
  let username = req.cookies["user"];
  let userFound = await User.findOne({ login: username }).populate("responses");
  let userResponses = userFound.responses;
  let fullUserResponses = [];
  let approveObjByIterObject = {};
  for (let i = 0; i < userResponses.length; i++) {
    let fullreponse = await ResponseCollection.findById(
      userResponses[i].id
    ).populate("advertisement");
    let addId = fullreponse.advertisement.id;
    let valueBoolean = false;

    // console.log("userFound.approvedAds", userFound.approvedAds);
    // console.log("addId", addId);
    userFound.approvedAds.map(idobj => {
      if ("" + idobj === "" + addId) {
        // console.log("Юзер исполнитель по объявлению", addId);
        valueBoolean = true;
      }
    });

    fullreponse = fullreponse.toObject();
    fullreponse.isChosen = valueBoolean;

    // покажем только те которые по времени походят или была договоренност
    // если был выбран исполнитель - то сделка останется висеть в кабинете
    if (fullreponse.advertisement.executor !== null) {
      console.log("found add that will not be removed after expiration");
     fullUserResponses.push(fullreponse);
    } else {
      // проверка на время - показываем только свежие объявления
      let timetoCheck = fullreponse.advertisement.expdate;

      // time comparasion
      const todayTime = moment();
      const dateExpiry = moment(timetoCheck);
      // будущее время больше чем время сейчас
      // если дата окончания < чем время сейчас, значит не выводим объявление
      // console.log("Актуально ли обновление:", dateExpiry >= todayTime);

      if (dateExpiry >= todayTime) {
        // timeToDisplay = moment(timetoCheck).format("MMMM DD YYYY, h:mm");
        // objectMongo["expdate"] = timeToDisplay;
        fullUserResponses.push(fullreponse);
      }
    }
    // fullUserResponses.push(fullreponse);
  }

  res.render("yourresponses", {
    fullUserResponses
    // iterObject: approveObjByIterObject
  });
});

router.get("/addorder", async function(req, res) {
  res.render("addorder", {});
});

module.exports = router;
