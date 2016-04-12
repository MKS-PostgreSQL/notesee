var express = require('express')
var router = express.Router()
var db = require('../db.js')

// register user
router.post('/register', function (req, res) {
	var username = req.body.user.username
	var password = req.body.user.password
	db.query('INSERT INTO USERS SET `username` = ?, `password` = ?;',
		[username, password],
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