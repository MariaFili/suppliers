const express = require("express");
const router = express.Router();
const Advertisement = require("../models/ads");
const ResponseCollection = require("../models/responses");
const User = require("../models/users");

router.get("/:id/respond", async function(req, res) {
  res.render("respondToAd", { addId: req.params.id });
});

router.post("/:id/respond", async function(req, res, next) {
  // console.log("in repond to id POST mode");
  let adId = req.params.id;
  let username = req.cookies["user"];
  let userFound = await User.findOne({ login: username });
  await userFound.addResponse(req.body.price, adId);

  res.redirect(`/ad/${adId}`);
});

router.get("/:id", async function(req, res) {
  let advertisement = await Advertisement.findById(req.params.id).populate(
    "author"
  );
  let isAuthor = false;
  let canResponse = true;
  let isChosen = false;
  // если cookie есть то не показываем кнопку "зарегестрируйтесь"
  let loggedout = false;
  if (typeof req.cookies["user"] === "undefined") {
    loggedout = true;
  } else {
    // ищем - может ли юзер откликнуться на заказ или он уже откликался на него
    let username = req.cookies["user"];
    if (username === advertisement.author.login) {
      // console.log("Автор просматривает свое объявление");
      isAuthor = true;
    }
    let userFound = await User.findOne({ login: username });
    let userResponses = userFound.responses;
    let userApprovedAds = userFound.approvedAds;

    userApprovedAds.forEach(approve => {
      isChosen = true;
    });

    for (let i = 0; i < userResponses.length; i++) {
      responseId = userResponses[i];
      let addToWhichResponded = await ResponseCollection.findById(responseId);
      if (req.params.id === "" + addToWhichResponded.advertisement) {
        canResponse = false;
      }
    }
  }

  res.render("ad", {
    advertisement,
    loggedout,
    canResponse,
    isAuthor,
    isChosen
  });
});

router.post("/:id", async function(req, res) {
  let responseFound = await ResponseCollection.findById(req.params.id);

  let adId = responseFound.advertisement;
  let authorId = responseFound.author;
  await User.chooseSupplier(adId, authorId);

  // console.log("Deal Made////////////////////////");

  res.redirect("/yourorders");
});

router.post("/redir", async function(req, res, next) {
  res.redirect(`../registration`);
});

module.exports = router;
