var jwt = require('jsonwebtoken')
var dotenv = require('dotenv').config()

// creates a token string
var generateToken = function (userId, username, callback) {
	return jwt.sign({ userId: userId}, process.env.NTS_SECRET, "12h", function (token) {
		callback(token)
	})
}

// checks to see if a token 
var verifyToken = function (token, successCb, errorCb) {
	return jwt.verify(token, process.env.NTS_SECRET, function (err, decoded) {
		if (err) {
			errorCb()
		} else {
			successCb()
		}
	})
}

