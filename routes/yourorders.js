const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Advertisement = require("../models/ads");



// registration
router.get('/', async function (req, res) {
    // console.log('orders ');
    let username = req.cookies["user"];
    // console.log("username", username);

    let userinfo = await User.findOne({ login: username })
      .populate("advertisements")
    ads = userinfo.advertisements

    ads.forEach(element => {
      console.log(element.title);
      console.log(element.distrcit);
      console.log(element.city);
      console.log(element.responses);
    });



    let addsinfo = []
    for (let i = 0; i < ads.length; i++) {
        let eachaddinfo = await Advertisement.findById(ads[i].id).populate(
          "responses"
        );
        // console.log("eachaddinfo", eachaddinfo);
        
        addsinfo.push(eachaddinfo);                   
    }
    // console.log("addsinfo", addsinfo);
    console.log("//////////////////////////");
    
    addsinfo.forEach(element => {
      console.log(element.title);
      console.log(element.distrcit);
      console.log(element.city);
      console.log(element.responses);
    });


    
    // let addsinfo = await User.findOne({ login: username }).populate(
    //   "advertisements"
    // );
    // ads = userinfo.advertisements;

    // console.log("user", userinfo);
    // console.log("ads", ads);
    
    
    res.render("yourorders", { addsinfo });
});

// router.post('/redir', async function (req, res, next) {

//     res.redirect(`../yourorders`);
// });

module.exports = router;