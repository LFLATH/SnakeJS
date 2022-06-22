const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const User = require("../models/User")

router.get('/signup', (req, res) => {
    res.render("signup.ejs")
})

router.post('/signup', (req, res) => {
    const highscore = 0;
    const {username, password} = req.body;
    let errors = [];
    if(!username || !password){
        errors.push({msg: 'Please fill in all fields '});
    }
    if(errors.length > 0){
        res.render('signup.ejs', {
            errors,
            username,
            password
        });

    }
    else{
        User.findOne({username: username})
            .then(user => {
                if(user){
                    errors.push({msg : "Username is already taken"});
                    res.render('signup.ejs', {
                        errors,
                        username,
                        password
                    });
                }
                else{
                    const newUser = new User({
                        username,
                        password,
                        highscore
                    });
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then(user => {
                            res.redirect('/login');
                        })
                        .catch(err => console.log(err));
                    }) )
                }
            });

    };

})


module.exports  = router;