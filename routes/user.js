//contains all my user related routes
const express = require('express')
const router = express.Router()
const mysql = require('mysql')

router.get('/messages', (req, res) => {
    console.log("Show some messages")
    res.end()
})

router.post('/user_create', (req, res) => {
    console.log("trying to create new user...")
    console.log("First name: " + req.body.create_first_name)
    const firstName = req.body.create_first_name
    const department = req.body.create_department

    const queryString = "INSERT INTO users (Nombre, Departamento) VALUE (?, ?)"
    getConnection().query(queryString, [firstName, department], (err, results, fields) => {
        if(err){
            console.log("Failed to insert new user: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Inserted a new user with id: ", results.insertId)
        res.end()
    })

    
})

router.get('/user/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = getConnection()

    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE id = ?"

    connection.query(queryString, [userId], (err, rows, fields) => {
        if(err){
            console.log("Failed to query users: " + err)
            res.sendStatus(500)
            return
        }
        console.log("Fetched users succesfully")

        const users = rows.map((row) => {
            return{Nombre: row.Nombre}
        })
        res.json(users)
    })

})

router.get("/users", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM users"
    connection.query(queryString, (err, rows, fields) => {
        if(err){
            console.log("Failed to query for users: " + err)
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb'
})

function getConnection() {
    return pool
}

module.exports = router