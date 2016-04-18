var express = require('express')
var router = express.Router()
var db = require('../db.js')
var auth = require('../auth.js')

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
	var token = req.headers.token
	var grabAllClasses = function () {
		db.query('SELECT `className`, `createdAt` FROM CLASSROOMS;', 
			function (err, rows) {
			if(err) {
				console.error(err)
				res.status(404).json({success:false})
			} else {
				res.json(rows)
			}
		})
	}
	var error = function () {
		res.status(404).json({success: false, tokenValid: false})
	}
	auth.verifyToken(token, grabAllClasses, error)
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
	var token = req.headers.token
	var name = req.params.className
	var getClassInfo = function () {
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
	}
	var error = function () {
		res.status(404).json({success: false, tokenValid: false})
	}
	auth.verifyToken(token, getClassInfo, error)
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
	var token = req.headers.token
	var name = req.params.className
	var query = 'SELECT USERS.username, USERS.fullName FROM USERS ' + 
	'INNER JOIN CLASSUSERS ON USERS.id = CLASSUSERS.user_id ' + 
	'INNER JOIN CLASSROOMS ON CLASSUSERS.classroom_id = CLASSROOMS.id ' + 
	'WHERE CLASSROOMS.className = ?;'
	var grabUsersInClass = function () {
		db.query(query, [name], 
			function (err, rows) {
			if(err) {
				console.error(err)
				res.status(404).json({success:false})
			} else {
				res.json(rows)
			}
		})
	}
	var error = function () {
		res.status(404).json({success: false, tokenValid: false})
	}
	auth.verifyToken(token, grabUsersInClass, error)
})

// return all notes in that classrooom based on classroom name
router.get('/classroom/:className/notes', function (req, res) {
	var token = req.headers.token
	var username = req.headers.username
	var name = req.params.className
	var errorSent = false;
	var arrSaved;
	var classroomNotes;
	var query = 'SELECT NOTES.id, NOTES.attachment, NOTES.createdAt, CLASSROOMS.code, USERS.username AS `author`, TAGS.name AS `tags` FROM NOTES ' + 
	'INNER JOIN TAGNOTES ON TAGNOTES.note_id = NOTES.id ' +
	'INNER JOIN TAGS ON TAGNOTES.tag_id = TAGS.id ' +
	'INNER JOIN USERS ON NOTES.user_id = USERS.id ' + 
	'INNER JOIN CLASSROOMS ON NOTES.classroom_id = CLASSROOMS.id ' +
	'WHERE CLASSROOMS.className = ? ORDER BY NOTES.createdAt DESC;'
	var query2 = 'SELECT SAVEDNOTES.note_id FROM SAVEDNOTES INNER JOIN SAVED ON SAVED.id = SAVEDNOTES.saved_id INNER JOIN USERS ON USERS.id = SAVED.user_id WHERE USERS.username = ?;'

	// grab user's saved notes [{notesID 1}, {notesID 2}]
	db.query(query2,
		[username],
	  function (err, result) {
	  	if (err) {
	  		if(!errorSent) {
	  			console.error(err)
	  			res.status(404).json({success:false})
	  		}
	  	} else {
	  		arrSaved = result;
	  	}
	})

	var getAllNotesInClass = function () {
		db.query(query, 
			[name], 
			function (err, rows) {
			if(err) {
				if(!errorSent) {
					console.error(err)
					res.status(404).json({success:false})
				}
			} else {
				classroomNotes = rows
				for (var i = 0; i < classroomNotes.length; i++) {
					var cnoteID = classroomNotes[i].id 
					for (var j = 0; j < arrSaved.length; j++) {
						if (cnoteID === arrSaved[i].note_id) {
							classroomNotes[i].saved = true
							break;
						} else {
							classroomNotes[i].saved = false
						}
					}
				}
				res.json(classroomNotes)
			}
		})
	}
	var error = function () {
		res.status(404).json({success: false, tokenValid: false})
	}
	auth.verifyToken(token, getAllNotesInClass, error)
})

function pseudoRandomString() {
    return Math.round((Math.pow(36, 6) - Math.random() * Math.pow(36, 5))).toString(36).slice(1);
}

// create a classroom
/* POST:
{
    "classroom" : {
        "className": "RecycleCorps"
    }, 
    "user" : {
        "username" : "sponge69"
    }
}
receive back:
{
  "code": "xaf4a"
}
*/
router.post('/', function (req, res) {
	var token = req.headers.token
	var code = pseudoRandomString()
	var name = req.body.classroom.className
	var username = req.headers.username
	var createClass = function () {
		db.query('INSERT INTO CLASSROOMS SET `className` = ?, `code` = ?;',
			[name, code],
			function (err, result1) {
				if(err) {
					console.error(err)
				} else {
					db.query('SELECT `id` FROM USERS WHERE `username` = ?;',
						[username],
						function (err, result2) {
							if(err) {
								console.error(err)
							} else {
								db.query('INSERT INTO CLASSUSERS SET `user_id` = ?, `classroom_id` = ?;', 
									[result2[0].id, result1.insertId],
									function (err, rows) {
										if(err) {
											console.error(err)
											res.status(500).json({success:false})
										} else {
											res.status(201).json({code:code})
										}
									})
							}
						})
				}
			})
	}
	var error = function () {
		res.status(404).json({success: false, tokenValid: false})
	}
	auth.verifyToken(token, createClass, error)
})

// adds user to a classroom
/* POST:
{
    "classroom" : {
        "className": "GreenCorps", 
        "code" : "rwhkq"
    }, 
    "user" : {
        "username" : "dthai92"
    }
}
receive back: 
{
  "success": true
}
 */ 
router.post('/classroom/adduser', function (req, res) {
	var token = req.headers.token
	var code = req.body.classroom.code
	var classroom = req.body.classroom.className
	var username = req.headers.username
	var addUserToClass = function () {
		db.query('SELECT `id` FROM USERS WHERE `username` = ?;', 
			[username], 
			function (err, result1) {
				if(err) {
					console.error(err)
				} else {
					db.query('SELECT `id`, `code` FROM CLASSROOMS WHERE `className` = ?;', 
						[classroom], 
						function (err, result2) {
							if (err) {
								console.error(err)
							} else {
								if (result2[0].code === code) {
									db.query('INSERT INTO CLASSUSERS SET user_id = ?, classroom_id = ?;', 
										[result1[0].id, result2[0].id],
										function (err, rows) {
											if(err) {
												console.error(err)
											} else {
												res.status(201).json({success:true})
											}
										})
								} else {
									res.status(500).json({success:false})
								}
							}
						})
				}
			})
	}
	var error = function () {
		res.status(404).json({success: false, tokenValid: false})
	}
	auth.verifyToken(token, addUserToClass, error)
})

// removes user from a classroom
/* POST
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
router.post('/classroom/removeuser', function (req, res) {
	var token = req.headers.token
	var classroom = req.body.classroom.className
	var username = req.headers.username
	var removeUserFromClass = function () {
		db.query('SELECT `id` FROM USERS WHERE `username` = ?;', 
			[username], 
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
								if (result1[0] === undefined || result2[0] === undefined) {
								res.status(500).json({success:false});
							} else {
									db.query('DELETE FROM CLASSUSERS WHERE classroom_id = ? AND user_id = ?;',
										[result2[0].id, result1[0].id], 
										function (err, rows) {
											if(err) {
												console.error(err)
											} else {
												res.status(201).json({success:true})
											}
										})
								}
							}
						})
				}
			})
	}
	var error = function () {
		res.status(404).json({success: false, tokenValid: false})
	}
	auth.verifyToken(token, removeUserFromClass, error)
})

module.exports = router
