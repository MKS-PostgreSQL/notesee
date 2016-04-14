var express = require('express')
var router = express.Router()
var db = require('../db.js')

// users/ -> return all users and their data
// users/:id -> return user information (name, data joined, etcetera)
// users/:id/classrooms -> return all classrooms user is in
// users/:id/saved -> return all saved notes user has



// retrieve information on all users registered
/*
	GET /api/users/

	[
	  {
	    "full_name": null,
	    "id": 2,
	    "username": "merktassel",
	    "createdAt": "2016-04-13T22:36:35.000Z",
	    "email": "merk@tassel.com"
	  },
	  {
	    "full_name": null,
	    "id": 5,
	    "username": "spongeypants",
	    "createdAt": "2016-04-13T23:15:43.000Z",
	    "email": "crabbypatty@gmail.com"
	  },
	  {
	    "full_name": "Squidward Tentacles",
	    "id": 8,
	    "username": "squidster420",
	    "createdAt": "2016-04-14T21:26:14.000Z",
	    "email": "squidward@gmail.com"
	  }
	]
*/
router.get('/', function (req, res) {
	db.query('SELECT `full_name`, `id`, `username`, `createdAt`, `email` FROM USERS;',
		function (err, rows) {
			if (err) {
				console.error(err)
				res.status(404).json({success: false})
			} else {
				res.json(rows)
			}
		})
})





// retrieve user information details such as full name, username, date of registration given: user id
/* 

	GET /api/users/user/merktassel

	[
	  {
	    "full_name": null,
	    "id": 2,
	    "username": "merktassel",
	    "createdAt": "2016-04-13T22:36:35.000Z",
	    "email": "merk@tassel.com"
	  }
	]

*/

router.get('/user/:name', function (req, res) {
	var username = req.params.name
	db.query('SELECT `full_name`, `id`, `username`, `createdAt`, `email` FROM USERS WHERE `username` = ?;',
	 [username], 
	 function (err, rows) {
		if (err) {
			console.error(err)
			res.status(404).json({success: false})
		} else {
			res.json(rows)
		}
	})
})

// retrieve an array of classrooms a user has joined given: user id

/*
	GET /api/users/user/merktassel/classrooms

	[
	  {
	    "name": "Driving School"
	  }
	]

*/


router.get('/user/:name/classrooms', function (req, res) {
	var username = req.params.name;
	db.query('SELECT CLASSROOMS.name FROM CLASSROOMS INNER JOIN CLASSUSERS ON CLASSROOMS.id = CLASSUSERS.classroom_id INNER JOIN USERS ON CLASSUSERS.user_id = USERS.id WHERE USERS.username = ?;',
	 [username],
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