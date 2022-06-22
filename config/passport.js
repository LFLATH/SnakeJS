const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongodb");
const bcrypt = require("bcrypt");

const User = require("../models/User");

module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: 'username'}, (username, password, done) => {
            User.findOne({username:username})
            .then(user => {
                if(!user){
                    return done(null, false, {message : "This username isn't registered"});
                }
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                }
                else{
                    return done(null, false, {message : "This password isn't correct"})
                }
            })
            })
            .catch(err => console.log(err));

        }))

        passport.serializeUser((user, done) => {
            done(null, user.id); 
           // where is this user.id going? Are we supposed to access this anywhere?
        });
        
        // used to deserialize the user
        passport.deserializeUser((id, done) => {
            User.findById(id, (err, user) => {
                done(err, user);
            });
        });

}