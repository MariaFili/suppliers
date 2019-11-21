const express = require("express");
const router = express.Router();
const User = require("../models/users");

// registration
router.get("/", function(req, res) {
  res.render("registration");
});

router.post("/redir", async function(req, res, next) {
  console.log("here in registration/redir");
  console.log("body", req.body);

    res.cookie("user", req.body.login);
   //  чтобы true/false не ломалось 
  let buyerInput = false;
  if (req.body.buyer === true) {
    buyerInput = true;
  }
  await new User({
    login: req.body.login,
    password: req.body.password,
    buyer: buyerInput,
    advertisements: [],
    responses: [],
    info: {
      phone: req.body.phone,
      email: req.body.email,
      inn: req.body.inn,
      companyname: req.body.companyname
    }
  }).save();

  res.redirect(`../entries`);
});

// //new entries
// router.get('/new', function (req, res, next) {
//     res.render('entries/new');
// });

// //detail entry
// router.get('/:id', async function (req, res, next) {
//     let entry = await Entry.findById(req.params.id);
//     res.render('entries/show', { entry });
// });

// router.put('/:id', async function (req, res, next) {
//     let entry = await Entry.findById(req.params.id);

//     entry.title = req.body.title;
//     entry.body = req.body.body;
//     await entry.save();

//     res.redirect(`/entries/${entry.id}`);

// });

// router.delete('/:id', async function (req, res, next) {
//     await Entry.deleteOne({'_id': req.params.id});
//     res.redirect('/');
// });

// router.get('/:id/edit', async function (req, res, next) {
//     let entry = await Entry.findById(req.params.id);
//     res.render('entries/edit', { entry });
// });
module.exports = router;
