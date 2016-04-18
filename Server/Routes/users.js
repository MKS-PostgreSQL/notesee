var express = require('express')
var router = express.Router()
var db = require('../db.js')
var auth = require('../auth.js')

// retrieve information on all users registered
/*
  GET /api/users/

  [
    {
      "full_name": null,
      "id": 2,
      "username": "merktassel",
      "createdAt": "2016-04-13T22:36:35.000Z",
      "email": "merk@tassel.com"
    },
    {
      "full_name": null,
      "id": 5,
      "username": "spongeypants",
      "createdAt": "2016-04-13T23:15:43.000Z",
      "email": "crabbypatty@gmail.com"
    },
    {
      "full_name": "Squidward Tentacles",
      "id": 8,
      "username": "squidster420",
      "createdAt": "2016-04-14T21:26:14.000Z",
      "email": "squidward@gmail.com"
    }
  ]
*/

router.get('/', function (req, res) {
  var token = req.headers.token
  var grabUsers = function () {
    db.query('SELECT `fullName`, `id`, `username`, `createdAt`, `email` FROM USERS;',
      function (err, rows) {
        if (err) {
          console.error(err)
          res.status(404).json({success: false})
        } else {
          res.json(rows)
        }
      })
  }
  var error = function () {
    res.status(404).json({success: false, tokenValid: false})
  }
  auth.verifyToken(token, grabUsers, error)
})

// retrieve user information details such as full name, username, date of registration given: user id
/* 

  GET /api/users/user/merktassel

  [
    {
      "full_name": null,
      "id": 2,
      "username": "merktassel",
      "createdAt": "2016-04-13T22:36:35.000Z",
      "email": "merk@tassel.com"
    }
  ]

*/

router.get('/user/:name', function (req, res) {
  var token = req.headers.token
  var username = req.headers.username
  var grabUserInfo = function () {
    db.query('SELECT `fullName`, `id`, `username`, `createdAt`, `email` FROM USERS WHERE `username` = ?;',
     [username], 
     function (err, rows) {
      if (err) {
        console.error(err)
        res.status(404).json({success: false})
      } else {
        res.json(rows)
      }
    })
  }
  var error = function () {
    res.status(404).json({success: false, tokenValid: false})
  }
  auth.verifyToken(token, grabUserInfo, error)
})

// retrieve an array of classrooms a user has joined given: user id

/*
  GET /api/users/user/merktassel/classrooms

  [
    {
      "name": "Driving School"
    }
  ]

*/


router.get('/user/:name/classrooms', function (req, res) {
  var username = req.headers.username
  var token = req.headers.token
  var grabClassrooms = function () {
    db.query('SELECT CLASSROOMS.className, CLASSROOMS.code FROM CLASSROOMS INNER JOIN CLASSUSERS ON CLASSROOMS.id = CLASSUSERS.classroom_id INNER JOIN USERS ON CLASSUSERS.user_id = USERS.id WHERE USERS.username = ?;',
     [username],
     function (err, rows) {
      if (err) {
        console.error(err) 
        res.status(404).json({success: false})
      } else {
        res.status(200).json(rows)
      }
    })
  }
  var error = function () {
    res.status(404).json({success: false, tokenValid: false})
  }
  auth.verifyToken(token, grabClassrooms, error)
})

// retrieve an array of saved notes for a specified user

/*
  GET /api/users/user/merktassel/saved
  
  [
    {
      "attachment": <url>,
      "createdAt": <date>,
      "className": "Driving School"
    }
  ]

*/

router.get('/user/:name/saved', function (req, res) {
  var username = req.headers.username
  var token = req.headers.token
  var getSavedNotes = 'SELECT NOTES.id, NOTES.attachment, NOTES.createdAt, CLASSROOMS.code, USERS.username AS `author`, TAGS.name AS `tags` ' 
  'FROM NOTES ' +
  'INNER JOIN TAGNOTES ON TAGNOTES.note_id = NOTES.id ' +
  'INNER JOIN TAGS ON TAGNOTES.tag_id = TAGS.id ' +
  'INNER JOIN USERS ON NOTES.user_id = USERS.id ' +
  'INNER JOIN USERS ON SAVED.user_id = USERS.id ' +
  'WHERE USERS.username = ?;'

  'SELECT NOTES.id, NOTES.attachment, NOTES.createdAt, CLASSROOMS.code, USERS.username AS `author`, TAGS.name AS `tags` FROM NOTES ' + 
    'INNER JOIN TAGNOTES ON TAGNOTES.note_id = NOTES.id ' +
    'INNER JOIN TAGS ON TAGNOTES.tag_id = TAGS.id ' +
    'INNER JOIN USERS ON NOTES.user_id = USERS.id ' + 
    'INNER JOIN CLASSROOMS ON NOTES.classroom_id = CLASSROOMS.id ' +
    'WHERE CLASSROOMS.className = ? ORDER BY NOTES.createdAt DESC;'

  var grabSaved = function () {
    db.query(getSavedNotes,
      [username],
      function (err, rows) {
        if (err) {
          console.error(err) 
          res.status(404).json({success: false})
        } else {
          res.status(200).json(rows)
        }
    })
  }
  var error = function () {
    res.status(404).json({success: false, tokenValid: false})
  }
  auth.verifyToken(token, grabSaved, error)
})

module.exports = router