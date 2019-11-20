const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/', function (req, res) {
    
    res.render('signin');
    console.log (User.find())
});

// router.post('/redir', async function (req, res, next) {
//    console.log (User.find())
//     // res.cookie('signuser', req.body.name);
//     // signUser = new User({ name: req.body.name, password: req.body.password }).save();
//     // res.redirect(`../entries`);
// });

module.exports = router;