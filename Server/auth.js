var jwt = require('jsonwebtoken')
var dotenv = require('dotenv').config()

var auth = {}

// creates a token string
auth.generateToken = function (username) {
	return jwt.sign({ username: username}, process.env.NTS_SECRET, "12h")
}

// checks to see if token is valid
auth.verifyToken = function (token, successCb, errorCb) {
	return jwt.verify(token, process.env.NTS_SECRET, function (err, decoded) {
		if (err) {
			errorCb()
		} else {
			successCb()
		}
	})
}

module.exports = auth