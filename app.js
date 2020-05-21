const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const db = require('./queries')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/student', db.getStudents)
app.get('/students', db.getStudents)
app.get('/student/:id', db.getStudentsById)
app.get('/students/:id', db.getStudentsById)
app.get('/grade/:id', db.getGrades)
app.get('/grades/:id', db.getGrades)
app.post('/grade', db.postGrades)
app.post('/grades', db.postGrades)
app.post('/register', db.postStudent)

module.exports = app;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))



