const express = require("express");
const router = express.Router();



router.get("/", function(req, res) {
 
  res.render("article");
});

router.post('/redir', async function (req, res, next) {

    res.redirect(`../registration`);
});


module.exports = router;