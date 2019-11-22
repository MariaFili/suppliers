const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Advertisement = require("../models/ads");

// registration
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
    addsinfo.push(eachaddinfo);
  }

  res.render("yourorders", { addsinfo });
});

module.exports = router;
