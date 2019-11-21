const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  res.render("signout");
});

router.post("/redir", async function(req, res, next) {
  res.clearCookie("user");
  // res.cookie('user', undefined);
  // if (typeof req.cookies.user!=="undefined"){}
  res.redirect(`../entries`);
});

module.exports = router;
