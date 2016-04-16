var express = require('express')
var router = express.Router()
var db = require('../db.js')

// return ALL classrooms
/* GET:
[
  {
    "className": "GreenCorps",
    "createdAt": "2016-04-15T02:17:02.000Z"
  },
  {
    "className": "Pineapple Express",
    "createdAt": "2016-04-15T02:26:11.000Z"
  }
]
*/
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
/* GET:
[
  {
    "className": "GreenCorps",
    "createdAt": "2016-04-15T02:17:02.000Z"
  }
]
*/
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
/* GET:
[
  {
    "username": "Plankton11",
    "fullName": "Sheldon Plankton"
  },
  {
    "username": "spongeyboob",
    "fullName": "Spongebob Squarepants"
  },
  {
    "username": "greenmachine",
    "fullName": "The Lorax"
  }
]
*/
router.get('/classroom/:className/users', function (req, res) {
	var name = req.params.className
	var query = 'SELECT USERS.username, USERS.fullName FROM USERS ' + 
	'INNER JOIN CLASSUSERS ON USERS.id = CLASSUSERS.user_id ' + 
	'INNER JOIN CLASSROOMS ON CLASSUSERS.classroom_id = CLASSROOMS.id ' + 
	'WHERE CLASSROOMS.className = ?;'
	db.query(query, [name], 
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
	var query = 'SELECT NOTES.attachment, NOTES.createdAt FROM NOTES ' + 
	'INNER JOIN CLASSROOMS ON NOTES.classroom_id = CLASSROOMS.id ' + 
	'WHERE CLASSROOMS.className = ?;'
	db.query(query, 
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
        "className" : "GreenCorps"
    }, 
    "user" : {
        "username" : "greenmachine"
    }
}
receive back: 
{
  "success": true
}
 */
router.post('/classroom/adduser', function (req, res) {
	var classroom = req.body.classroom.className
	var user = req.body.user.username
	db.query('SELECT `id` FROM USERS WHERE `username` = ?;', 
		[user], 
		function (err, result1) {
			if(err) {
				console.error(err)
			} else {
				db.query('SELECT `id` FROM CLASSROOMS WHERE `className` = ?;', 
					[classroom], 
					function (err, result2) {
						if(err) {
							console.error(err)
						} else {
							db.query('INSERT INTO CLASSUSERS SET classroom_id = ?, user_id = ?;',
								[result2[0].id, result1[0].id], 
								function (err, rows) {
									if(err) {
										console.error(err)
									} else {
										res.status(201).json({success:true})
									}
								})
						}
					})
			}
		})
})
	

module.exports = router





