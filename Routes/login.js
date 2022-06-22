const express = require('express')
const passport = require('passport')

const router = express.Router();


router.get('/login', (req, res) => {
    res.render("login.ejs")
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login'
    })(req, res, next);
});
module.exports = router