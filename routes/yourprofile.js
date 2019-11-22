const express = require("express");
const router = express.Router();
const User = require("../models/users");

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

router.post("/upload", async function (req, res, next) {
  // console.log("in upload post");

  
  // res.redirect(`../yourorders`);
});

router.get("/yourresponses", async function(req, res) {

  res.render("yourresponses", { });
});

module.exports = router;
