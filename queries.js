const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const getStudents = (request, response) => {
    if (request.query.search){
        const query = decodeURIComponent(request.query.search)

        console.log(query)

        pool.query('SELECT * FROM students WHERE name LIKE $1', ['%'+query+'%'], (error, results) => {
            if (error) {
              throw error
            }
            response.status(200).json(results.rows)
        })
    }else{
        pool.query('SELECT * FROM students ORDER BY studentId ASC', (error, results) => {
            if (error) {
              throw error
            }
            response.status(200).json(results.rows)
        })
    }
}

const getStudentsById = (request, response) => {

    pool.query('SELECT * FROM students WHERE studentid = $1', [request.params.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getGrades = (request, response) => {

    pool.query('SELECT grades FROM students WHERE studentid = $1', [request.params.id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const postGrades = (request, response) => {
    const review = request.body

    console.log(review)
    
    if(review.studentid && review.grade){
        const id = parseInt(request.body.studentid)
        const grade = parseInt(request.body.grade)

        console.log(id)
        console.log(grade)
        
        pool.query(
            'UPDATE students SET grades = grades || $1 WHERE studentid = $2',
            [grade], [id],
            (error, review) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Student modified with ID: ${review.studentId}`)
            }
        )
    }else{
        response.status(400)
    }

}

const postStudent = (request, response) => {
    const review = request.body

    console.log(review)
    
    if(review.email && review.username){

        pool.query(
            'INSERT INTO students (email, username) VALUES ($1, $2)',
            [review.email], [review.username],
            (error, review) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Student Added with username: ${review.username}`)
            }
        )
    }else{
        response.status(400)
    }
}

  module.exports = {
    getStudents,
    getStudentsById,
    getGrades,
    postGrades,
    postStudent,
  }