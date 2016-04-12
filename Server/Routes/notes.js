var express = require('express')
var router = express.Router()
var db = require('../db.js')


router.post('/notes/upload/:id', function (req, res) {

})

router.get('/user/:id/classrooms', function (req, res) {
	var id = req.params.id;
	db.query('SELECT `classroom_id` FROM `CLASS-USERS-JOIN` WHERE `user_id` = ?;',
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
