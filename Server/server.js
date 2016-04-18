var express = require('express')
var app = express()
var cors = require('cors')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var db = require('./db.js')

var dotenv = require('dotenv').config()
  
// your routes requires go here
var users = require('./Routes/users')
var landing = require('./Routes/landing')
var classrooms = require('./Routes/classrooms')
var notes = require('./Routes/notes')

app.use(cors())
app.use(bodyParser.urlencoded({extended: true, limit: '25mb', extended:true}))
app.use(bodyParser.json({limit: '25mb', extended:true}))
app.use(morgan('dev'));

// declare path here 
app.use('/api/users/', users)
app.use('/api/landing/', landing)
app.use('/api/classrooms/', classrooms)
app.use('/api/classrooms/notes/', notes)


var port = process.env.PORT || 8080








app.listen(port, console.log('Magic happens on port', port))

