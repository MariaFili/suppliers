const express = require("express");
const router = express.Router();
const Advertisement = require("../models/ads");

router.get("/:id", async function (req, res) {
  // let id = req.params.id;
  // console.log("category id", id);
  let advertisement = await Advertisement.findById(req.params.id).populate(
    "author"
  );
  
  
  res.render("ad", {
    advertisement
  });
});

router.post("/redir", async function(req, res, next) {
  res.redirect(`../registration`);
});

module.exports = router;
