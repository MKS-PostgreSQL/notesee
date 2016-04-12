var express = require('express')
var router = express.Router()
var db = require('../db.js')

// return ALL classrooms
router.get('/', function (req, res) {
	db.query('SELECT `name`, `createdAt` FROM CLASSROOMS', 
		function (err, rows) {
		if(err) {
			console.error(err)
			res.status(404).json({success:false})
		} else {
			res.json(rows)
		}
	})
})

// return classroom information based on id
router.get('/classroom/:id', function (req, res) {
	var id = req.params.id;
	db.query('SELECT `name`, `createdAt` FROM CLASSROOMS WHERE `id` = ?;', 
		[id], 
		function (err, rows) {
		if(err) {
			console.error(err)
			res.status(404).json({success:false})
		} else {
			res.json(rows)
		}
	})
})

// return all users in that classroom
router.get('/classroom/:id/users', function (req, res) {
	var id = req.params.id;
	db.query('SELECT USERS.username, USERS.full_name FROM CLASSUSERS INNER JOIN USERS ON CLASSUSERS.user_id = USERS.id WHERE CLASSUSERS.classroom_id = ?;', 
		[id], 
		function (err, rows) {
		if(err) {
			console.error(err)
			res.status(404).json({success:false})
		} else {
			res.json(rows)
		}
	})
})

// return all notes in that classrooom
router.get('classroom/:id/notes', function (req, res) {
	var id = req.params.id;
	db.query('SELECT `attachment`, `createdAt`, `user_id` FROM NOTES WHERE `classroom_id` = ?;', 
		[id], 
		function (err, rows) {
		if(err) {
			console.error(err)
			res.status(404).json({success:false})
		} else {
			res.json(rows)
		}
	})
})

// create a classroom
router.post('/', function (req, res) {
	var classname = req.body.classroom.name;
	db.query('INSERT INTO CLASSROOMS SET `name` = ?;', 
		[classname], 
		function (err, rows) {
			if(err) {
				console.error(err)
				res.status(500).json({success:false})
			} else {
				res.status(201).json({success:true})
			}
		})
})

// adds user to a classroom
router.post('/classroom/adduser', function (req, res) {
	var classroom = req.body.classroom.id;
	var user = req.body.user.id;
	db.query('INSERT INTO CLASSUSERS SET `classroom_id` = ?, `user_id` = ?;', 
		[classroom, user], 
		function (err, rows) {
			if(err) {
				console.error(err)
				res.status(500).json({success:false})
			} else {
				res.status(201).json({success:true})
			}
		})
})
	

module.exports = router





