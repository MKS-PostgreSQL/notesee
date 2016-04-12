var express = require('express')
var router = express.Router()
var db = require('../db.js')

router.post('/', function(req, res) {
	var note = req.body.note.attachment;
	db.query('INSERT INTO NOTES SET `attachment` = ?;'
		[note],
		function(err, rows) {
			if(err) {
				console.error(err)
				res.status(500).json({success:false})
			} else {
				res.status(201).json({success:true})
			}
		})
})

module.exports = router

// example post 
// api.post('/groups', util.checkToken, function(req, res){
//   var name = req.body.group_name;
//   if(name !== null){
//     db.query('INSERT INTO GROUPS SET `name` = ?, `owner` = ?;',
//     [name, req.user.id],
//     function(err, result){
//       if(err){
//         console.error(err);
//         res.sendStatus(500);
//       } else {
//         db.query('INSERT INTO MEMBERSHIPS SET `group` = ?, `user` = ?;',
//         [result.insertId, req.user.id], function(err, result){
//           if(err){
//             console.error(err);
//             // res.sendStatus(500);
//           } else {
//             console.log(result);
//           }
//         })
//         res.sendStatus(201);
//       }
//     });
//   } else {
//     res.sendStatus(400);
//   }
// });

// router.post('/classroom/:id/notes', function (req, res) {
// 	var id = req.params.id;
// 	var photo = req.body.photo;  //string of binary
// 	//upload photo to storage (S3)
// 		//return image URL
// 			//insert URL into DB, attaching it to specific classroom
// 				//return to client error/success

// 				function uploadToStorage(photo) {
// 					//promise upload function 
// 					  // usually you will have a options parameter where you can 
// 					  // dictate what you want the promise to return
// 					  // i.e. just the image url
// 					promiseUpload(photo, options)
// 					  .then(function(url) {
// 					  	// store the url in the DB attaching it to the specified classroom
// 					  	db.query('INSERT url into classrooms where classroom_id = ?'), 
// 					  	[url, id], 
// 					  	function (err, row) {
// 					  		// if error
// 					  		// respond with error to client
// 					  		// on success
// 					  		// respond success to client
// 					  	}
// 					})
// 				}
// })

// module.exports = router
