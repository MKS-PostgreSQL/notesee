var dotenv = require('dotenv').config()

var credentials = {
	accessKeyId: process.env.AWS_KEY,
	secretAccessKey: process.env.AWS_SECRET
}

module.exports = credentials
