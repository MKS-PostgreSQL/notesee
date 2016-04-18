var db = require('./db.js')

// In progress file [not ready for use]

var query = {}

query.send = function (query, array, successCb ) {
		if (!successCb) {
			db.query(query, array, function (err, result) {
				if (err) {
					console.error(err)
					res.status(500).json({success: false})
				} else {
					res.json(result)
				}
			})
		} else {
			db.query(query, array, function (err, result) {
				if (err) {
					console.error(err)
					res.status(500).json({success: false})
				} else {
					successCb
				}
			})
		}
	}
	
module.exports = query
