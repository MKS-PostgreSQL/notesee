var express = require('express')
var router = express.Router()
var db = require('../db.js')

// users/ -> return all users and their data
// users/:id -> return user information (name, data joined, etcetera)
// users/:id/classrooms -> return all classrooms user is in
// users/:id/saved -> return all saved notes user has


// grab user information by specifying username
// ex. /users/user/danny => grab all user information for Danny from users table
router.get('/user/:id', function (req, res) {
	var id = req.params.id;
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

router.get('/user/:id/classrooms', function (req, res) {
	var id = req.params.id;
	db.query('SELECT `classroom_id` FROM CLASSUSERS WHERE `user_id` = ?;',
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