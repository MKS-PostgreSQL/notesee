var express = require('express')
var router = express.Router()
var auth = require('../auth.js')
var query = require('../helpers.js')
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

	db.query('SELECT `username` FROM USERS WHERE `username` = ?;',
		[username],
		function (err, result) {
			if (err) {
				console.error(err)
				res.status(500).json({success: false})
			} else {
				if(!result.length) {
					// create user if not found
					db.query('INSERT INTO USERS SET `username` = ?, `password` = ?, `email` = ?, `fullName` = ?;',
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
											res.status(201).json({success: true, token: auth.generateToken(username), username: username})
										}
									})
							}
						})
				} else {
					// otherwise return false if user exists
					res.json({success: false, userAlreadyExists: true})
				}
			}
		})
})

//login - given: username, password
/*
  POST /api/landing/register

  provide for req.body:
    {
        "user": {
            "username": "squidster420",
            "password": "clarinet"
            }
    }

  receive back:
    {
      "success": true
      "token": [long string]
    }
*/

router.post('/login', function (req, res) {
	var username = req.body.user.username
	var password = req.body.user.password
	db.query('SELECT `username`, `id` FROM USERS WHERE `username` = ?;',
		[username],
		function (err, result1) {
			if (err) {
				console.error(err)
				res.status(500).json({success: false})
			} else {
				if(!result1.length) {
					res.json({success: false})
				} else {
					db.query('SELECT `password` FROM USERS WHERE `password` = ?;',
						[password],
						function (err, result2) {
							if(err) {
								console.error(err)
								res.status(500).json({success: false})
							} else {
								if(result2.length) {
									res.json({success: true, token: auth.generateToken(username), username: username})
								} else {
									res.json({success: false})
								}
							}
						})
				}
			}
		})
})

module.exports = router