const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const student = require('./routes/student')
const grade = require('./routes/grade')
const register = require('./routes/register')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/student', student)
app.use('/students', student)
app.use('/grade', grade)
app.use('/grades', grade)
app.use('/register', register)

module.exports = app;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))



