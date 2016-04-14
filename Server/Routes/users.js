var express = require('express')
var router = express.Router()
var db = require('../db.js')

// users/ -> return all users and their data
// users/:id -> return user information (name, data joined, etcetera)
// users/:id/classrooms -> return all classrooms user is in
// users/:id/saved -> return all saved notes user has


// retrieve user informaiton details such as full name, username, date of registration given: user id
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
	var username = req.params.name
	db.query('SELECT `full_name`, `id`, `username`, `createdAt`, `email` FROM USERS WHERE `username` = ?;',
	 [username], 
	 function (err, rows) {
		if (err) {
			console.error(err)
			res.status(404).json({success: false})
		} else {
			res.json(rows)
		}
	})
})

// retrieve an array of classrooms a user has joined given: user id

/*
	GET /api/users/user/2/classrooms

	[
	  {
	    "name": "Driving School"
	  }
	]

*/

router.get('/user/:id/classrooms', function (req, res) {
	var id = req.params.id;
	db.query('SELECT CLASSROOMS.name FROM CLASSROOMS INNER JOIN CLASSUSERS ON CLASSROOMS.id = CLASSUSERS.classroom_id WHERE CLASSUSERS.user_id = ?;',
	 [id],
	 function (err, rows) {
		if (err) {
			console.error(err) 
			res.status(404).json({success: false})
		} else {
			res.status(200).json(rows)
		}
	})
})



module.exports = router