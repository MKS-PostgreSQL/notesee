var express = require('express')
var router = express.Router()
var db = require('../db.js')

// users/ -> return all users and their data
// users/:id -> return user information (name, data joined, etcetera)
// users/:id/classrooms -> return all classrooms user is in
// users/:id/saved -> return all saved notes user has


// retrieve user informaiton details such as full name, username, date of registration given: user id
router.get('/user/:id', function (req, res) {
	var id = req.params.id
	db.query('SELECT `full_name`, `username`, `createdAt` FROM USERS WHERE `id` = ?;',
	 [id], 
	 function (err, rows) {
		if (err) {
			console.error(err)
			res.status(404).json({success: false})
		} else {
			res.json(rows)
		}
	})
})

// retrieve list of classrooms a user has joined given: user id
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