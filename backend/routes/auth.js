const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const { body, validationResult } = require('express-validator');

// Middleware to parse incoming JSON requests
router.use(express.json());

//json web token secret
const JWT_SECRET = "sujithmakam$joshnareddy"

// Creating user using POST "api/auth/createuser". No login requires
router.post('/createuser', [
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 6 })
], async (req, res) => {
    //If there are errors, return Bad Request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check whether the email exist already
    try{
    let user = await User.findOne({email : req.body.email});
    if(user){
        return res.status(400).json({error : "sorry a user with this email already exists"});
    }
    //creating a salt
    const salt = await bcrypt.genSalt(10);
    
    secPassword = await bcrypt.hash(req.body.password,salt);

    //create new user
    user = await User.create({
        name : req.body.name,
        password : secPassword,
        email : req.body.email
    })
    
    // .then(user => res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({error:'please enter a unique value for email', message:err.message})})

    //data
    const Data = {
         // we will use id for faster retrival of information
        user:{
            id :user.id
        }
    }

   
    const authToken = jwt.sign(Data,JWT_SECRET);
    //console.log(jwtData);

    res.json({authToken});
}
    catch(error){
        console.log(error.message);
        res.status(500).send("some error occured");
    }
});

module.exports = router;
