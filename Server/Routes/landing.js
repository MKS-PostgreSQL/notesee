var express = require('express')
var router = express.Router()
var db = require('../db.js')

// register a new user given: username, password, e-mail, full name
/*
	POST /api/landing/register

	provide for req.body:
		{
		    "user": {
		        "name": "Squidward Tentacles",
		        "email": "squidward@gmail.com",
		        "username": "squidster420",
		        "password": "clarinet"
		        }
		}

	receive back:
		{
			"success": true
		}
*/
router.post('/register', function (req, res) {
	var username = req.body.user.username
	var password = req.body.user.password
	var email = req.body.user.email
	var fullname = req.body.user.name
	console.log(req.body)
	db.query('INSERT INTO USERS SET `username` = ?, `password` = ?, `email` = ?, `full_name` = ?;',
		[username, password, email, fullname],
		function (err, result1) {
			if (err) {
				console.error(err)
				res.status(500).json({success: false})
			} else {
				db.query('INSERT INTO SAVED SET `user_id` = ?;',
					[result1.insertId],
					function (err, result) {
						if(err) {
							console.error(err)
							res.status(500).json({success: false})
						} else {
							console.log(result1.insertId)
							res.status(201).json({success: true})
						}
					})
			}
		})
})

module.exports = router