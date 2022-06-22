const express = require('express')
const { ensureAuthenticated } = require('../config/auth')
const passport = require('passport');

const router = express.Router();
const User = require("../models/User")


router.get('/home', ensureAuthenticated, (req, res) => {
    res.render("home.ejs", {
        user: req.user.username,
        highscore: req.user.highscore
    })
})

router.post('/home', (req, res) => {
    let username = req.body.username;
    let highscore = req.body.highscore;
    User.updateOne({username:username},{highscore: highscore},
        function (err, res) {
            if (err) throw err;
            console.log("score updated");
        });
        User.findOne({username: username})
            .then(user => {
                if (user) {
                   console.log(user.highscore);
                } else {
                 console.log("user not found");
            }
        });
})

module.exports = router