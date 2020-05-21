const express = require('express')
const fs = require("fs")
const router = express.Router()

const students = JSON.parse(fs.readFileSync("students.JSON"))


router.get('/:studentId', (req, res) => res.send(students[req.params.studentId].grades))

router.post('/', function(req,res) {
    let result
    const review = req.body;
    if(review.studentId && review.grade){
        result = {
            "status": "success",
            "message": "The grade has been successfully added"
        }
    }else{
        result = {
            "status": "failed",
            "message": "The grade has not been added"
        }
        res.status(400);
    }

    res.json(result);
});

module.exports = router;