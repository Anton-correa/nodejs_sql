const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

//This application is used to test the connection of a mysql database with the use of the REST API

app.use(morgan('short'))

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from root")
})

const router = require('./routes/user.js')

app.use(router)

app.listen(3003, () => {
    console.log("Server is up and running on 3003...")
})