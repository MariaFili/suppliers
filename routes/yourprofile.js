const express = require("express");
const router = express.Router();
const User = require("../models/users");
const ResponseCollection = require("../models/responses");

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

    console.log("userFound.approvedAds", userFound.approvedAds);
    console.log("addId", addId);
    userFound.approvedAds.map(idobj => {
      if ("" + idobj === "" + addId) {
        // console.log("Юзер исполнитель по объявлению", addId);
        valueBoolean = true;
      }
    });

    fullreponse = fullreponse.toObject();
    fullreponse.isChosen = valueBoolean;
    fullUserResponses.push(fullreponse);
  }

  res.render("yourresponses", {
    fullUserResponses
    // iterObject: approveObjByIterObject
  });
});

module.exports = router;
