var express = require('express')
var router = express.Router()
var db = require('../db.js')

// return ALL classrooms
router.get('/', function (req, res) {
	db.query('SELECT `className`, `createdAt` FROM CLASSROOMS;', 
		function (err, rows) {
		if(err) {
			console.error(err)
			res.status(404).json({success:false})
		} else {
			res.json(rows)
		}
	})
})

// return classroom information based on classroom name
router.get('/classroom/:className', function (req, res) {
	var name = req.params.className
	db.query('SELECT `className`, `createdAt` FROM CLASSROOMS WHERE `className` = ?;', 
		[name], 
		function (err, rows) {
		if(err) {
			console.error(err)
			res.status(404).json({success:false})
		} else {
			res.json(rows)
		}
	})
})

// return all users in that classroom based on classroom name
router.get('/classroom/:className/users', function (req, res) {
	var name = req.params.className
	db.query('SELECT USERS.username, USERS.full_name FROM USERS INNER JOIN CLASSUSERS ON USERS.id = CLASSUSERS.user_id INNER JOIN CLASSROOMS ON CLASSUSERS.classroom_id = CLASSROOMS.id WHERE CLASSROOMS.className = ?;', 
		[name], 
		function (err, rows) {
		if(err) {
			console.error(err)
			res.status(404).json({success:false})
		} else {
			res.json(rows)
		}
	})
})

// return all notes in that classrooom based on classroom name
router.get('/classroom/:className/notes', function (req, res) {
	var name = req.params.className
	db.query('SELECT NOTES.attachment, NOTES.creatAt FROM NOTES INNER JOIN CLASSROOMS ON NOTES.classroom_id = CLASSROOMS.id WHERE CLASSROOMS.className = ?;', 
		[name], 
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
	var name = req.body.classroom.className
	db.query('INSERT INTO CLASSROOMS SET `className` = ?;', 
		[name], 
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

/* POST:
{
    "classroom" : {
        "id" : 2
    }, 
    "user" : {
        "id" : 12
    }
}
receive back: 
{
  "success": true
}

 */
 
router.post('/classroom/adduser', function (req, res) {
	var classroom = req.body.classroom.id
	var user = req.body.user.id
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





