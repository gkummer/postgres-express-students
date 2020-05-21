const express = require('express')
const router = express.Router()

router.post('/', function(req,res){
    let result
    const user = req.body;
    if(user.email && user.username){
        result = {
            "status": "success",
            "message": "The account has been successfully created"
        }
        
    }else{
        result = {
            "status": "failed",
            "message": "The account has not been created"
        }
        res.status(400);
    }
    res.json(result);
});

module.exports = router;

