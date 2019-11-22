const express = require("express");
const router = express.Router();
const User = require("../models/users");

router.get("/", function(req, res) {
  res.render("signin");
});

router.post("/redir", async function(req, res, next) {
  console.log(req.body);
  let usernameInput = req.body.username;
  let passwordInput = req.body.password;
  let founduser = await User.findOne({ login: usernameInput });

  if (founduser !== null) {
    if (passwordInput === founduser.password) {
      console.log("User password matches DB record");
      //   let key = Math.random();
      //   sessionsobj[key] = req.body.username;
      res.cookie("user", usernameInput);
      res.redirect("/");
    } else {
      console.log("User password does not matches DB record");
      res.clearCookie("user");
      res.redirect("/signin");
    }
  } else {
    console.log("No user found");
    res.clearCookie("user");
    res.redirect("/registration");
  }
});

module.exports = router;
