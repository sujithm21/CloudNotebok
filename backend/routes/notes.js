const express = require('express')
const router = express.Router()

router.get('/',(req,res) =>{
    obj ={
        te : 'buwqb',
        nu : 5
    }
    res.json(obj)
})

module.exports = router