const express = require('express');
const router = express.Router();
// const User = require('../models/users');



// registration
router.get('/', function (req, res) {
    
    res.render('yourprofile');
});

router.post('/redir', async function (req, res, next) {

    res.redirect(`../yourorders`);
});

module.exports = router;