var express = require('express')
var router = express.Router()
var db = require('../db.js')

// register a new user given: username, password, e-mail, full name
router.post('/register', function (req, res) {
	var username = req.body.user.username
	var password = req.body.user.password
	var email = req.body.user.email
	var fullname = req.body.user.name
	console.log(req.body)
	db.query('INSERT INTO USERS SET `username` = ?, `password` = ?, `email` = ?, `full_name` = ?;',
		[username, password, email, fullname],
		function (err, rows) {
			if (err) {
				console.error(err)
				res.status(500).json({success: false})
			} else {
				res.status(201).json({success: true})
			}
		})
})

module.exports = router