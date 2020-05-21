const express = require('express')
const fs = require("fs")
const router = express.Router()

const students = JSON.parse(fs.readFileSync("students.JSON"))

router.get('/:studentId', (req, res) => res.send(students[req.params.studentId]))

router.get('/',(req,res) => {
    
    if (req.query.search){
        const query = decodeURIComponent(req.query.search)
        
        const filteredStudents = students.filter(student => student.name.includes(query))

        res.send(filteredStudents)
    }else{
        res.json(students)
    }
})

module.exports = router;