const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');
console.log('started entries');


// entries
router.get('/', async function (req, res, next) {
    let entries = await Advertisement.find({}, { category: 1, _id: 0 });
  let uniqueEntries = [];
  entries.map(obj => {
    if (!uniqueEntries.includes(obj.category)) {
      uniqueEntries.push(obj.category);
    }
  });
  console.log("entries", entries);
  console.log("uniqueEntries", uniqueEntries);
    if (typeof req.cookies.user!=="undefined"){
        console.log(req.cookies.user);
        
        res.render('entries/index', {
            //  entries, 
             Logger: "Sign out", 
        loginout:"/signout",
        yourprofile:"/yourprofile",
        yourname:req.cookies.user });
    }
   else{
    res.render('entries/index', {
        //  entries,
          Logger: "Register", 
    loginout:"/registration",
    yourprofile:"/signin",
    yourname:"Sign in"}); 
   }
    
});



// router.post('/', async function (req, res, next) {
//     newEntry = new Entry({ title: req.body.title, body: req.body.body });
//     res.redirect(`/entries/${newEntry.id}`);
// });

//new entries
router.get('/new', function (req, res, next) {
    res.render('entries/new');
});

//detail entry
router.get('/:id', async function (req, res, next) {
    let entry = await Entry.findById(req.params.id);
    res.render('entries/show', { entry });
});

router.put('/:id', async function (req, res, next) {
    let entry = await Entry.findById(req.params.id);
 
    entry.title = req.body.title;
    entry.body = req.body.body;
    await entry.save();

    res.redirect(`/entries/${entry.id}`);

});

router.delete('/:id', async function (req, res, next) {
    await Entry.deleteOne({'_id': req.params.id});
    res.redirect('/');
});

router.get('/:id/edit', async function (req, res, next) {
    let entry = await Entry.findById(req.params.id);
    res.render('entries/edit', { entry });
});
module.exports = router;


