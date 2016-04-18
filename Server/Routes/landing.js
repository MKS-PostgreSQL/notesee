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
	var username = req.headers.username
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

router.post('/login', function (req, res) {
	var username = req.headers.username
	var password = req.body.user.password
	var userid;
	db.query('SELECT `username`, `id` FROM USERS WHERE `username` = ?;',
		[username],
		function (err, result1) {
			if (err) {
				console.error(err)
				res.status(500).json({success: false})
			} else {
				console.log('array result1: ', result1)
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


// Refactor in progress

// router.post('/register', function (req, res) {
// 	var username = req.body.user.username
// 	var password = req.body.user.password
// 	var email = req.body.user.email
// 	var fullname = req.body.user.name
// 	var regUser = 'INSERT INTO USERS SET `username` = ?, `password` = ?, `email` = ?, `fullName` = ?;'
// 	var createSave = 'INSERT INTO SAVED SET `user_id` = ?;'
// 	var sendToken = res.status(201).json({success: true, token: auth.generateToken(result1.insertId, username)})
// 	query.send(regUser, [username, password, email, fullname], query.send(createSave, [result1.insertId], sendToken))
// })



module.exports = router