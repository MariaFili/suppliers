const express = require("express");
const router = express.Router();
const Advertisement = require("../models/ads");
const ResponseCollection = require("../models/responses");
const User = require("../models/users");

router.get("/:id", async function(req, res) {
  let advertisement = await Advertisement.findById(req.params.id).populate(
    "author"
  );

  // если cookie есть то не показываем кнопку "зарегестрируйтесь"
  let loggedout = false;
  if (typeof req.cookies["user"] === "undefined") {
    loggedout = true;
  }
  // console.log("are we logged out", loggedout);
  res.render("ad", {
    advertisement,
    loggedout
  });
});

router.post("/:id", async function(req, res) {
  let responseFound = await ResponseCollection.findById(req.params.id);

  let adId = responseFound.advertisement;
  let authorId = responseFound.author;
  await User.chooseSupplier(adId, authorId);

  console.log("Deal Made////////////////////////");

  res.redirect("/yourorders");
});

router.post("/redir", async function(req, res, next) {
  res.redirect(`../registration`);
});

module.exports = router;
