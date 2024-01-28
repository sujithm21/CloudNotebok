const express = require('express');
const router = express.Router();
const User = require('../models/User');

//creating user using : Post "api/auth". doesn't requitre auth
router.post('/',(req,res) =>{
    console.log(req.body);
    const user = User(req.body);
    user.save()
    res.send(req.body);
})

module.exports = router;