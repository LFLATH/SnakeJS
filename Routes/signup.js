const express = require('express')

const router = express.Router();


router.get('/signup', (req, res) => {
    res.render("signup.ejs")
})

router.post('/signup', (req, res) => {
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

})


module.exports  = router;