var express = require('express')
var router = express.Router()
var db = require('../db.js')
var AWS = require('aws-sdk')
var credentials = require('../credentials.js')
var auth = require('../auth.js')

function pseudoRandomString() {
    return Math.round((Math.pow(36, 6) - Math.random() * Math.pow(36, 5))).toString(36).slice(1);
}

AWS.config.update({accessKeyId: credentials.accessKeyId, secretAccessKey: credentials.secretAccessKey, region: 'us-west-1'});

//Return all notes
/*
{
    "classroom" : {
        "className" : "Linguistics_101"
    },
    "user": {
        "username" : "Noam_Chomsky"
    },
    "tags": {
        "name": "politics"
    },
    "attachment": {
        "base64": "1f6FkslZLtoW39F92psjFs........."
    }
}
*/    

router.post('/', function (req, res) {
  var token = req.headers.token
  var key = pseudoRandomString();
  var base64image = req.body.attachment.base64
  var postNote = function () {
	  sendToS3(base64image, key)
	  .then(function(data) {
	  	var attachment = data;
	  	var tags = req.body.tags.name
	  	var user = req.headers.username
	  	var classroom = req.body.classroom.className
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
	  							if (result1[0] === undefined || result2[0] === undefined) {
	  							  	res.status(500).json({success:false});
	  							  } else {
	  							  	db.query('INSERT INTO NOTES SET `attachment` = ?, `user_id` = ?, `classroom_id` = ?;',
	  								[attachment, result1[0].id, result2[0].id],
	  								function (err, result3) {
	  									if(err) {
	  										console.error(err)
	  									} else {
	  										db.query('INSERT INTO TAGS SET `name` = ?;', 
	  											[tags], 
	  											function (err, result4) {
	  												if(err) {
	  													console.error(err)
	  												} else {
	  													db.query('INSERT INTO TAGNOTES SET `note_id` = ?, `tag_id` = ?;',
	  														[result3.insertId, result4.insertId],
	  														function (err, rows) {
	  															if(err) {
	  																console.error(err)
	  																res.status()
	  															} else {
	  																res.status(201).json({success:true})
	  															}
	  														})
	  												}
	  											})
	  									}
	  								})
	  							  }
	  							
	  						}
	  					})
	  			}
	  		})
	  })
  }
  var error = function () {
  	res.status(404).json({success: false, tokenValid: false})
  }
  auth.verifyToken(token, postNote, error)
});

router.post('/save', function (req, res) {
	var token = req.headers.token
	var username = req.headers.username
	var noteId = req.body.notes.noteId
	var saveNote = function () {
		db.query('SELECT `id` FROM USERS WHERE `username` = ?;',
			[username],
			function (err, rows) {
				if (err) {
					console.error(err)
					res.status(500).json({success:false})
				} else {
					var userId = rows[0].id
					db.query('SELECT `id` FROM SAVED WHERE `user_id` = ?;',
						[userId],
						function (err, result) {
							if (err) {
								console.error(err)
								res.status(500).json({success:false})
							} else {
								var savedId = result[0].id
								db.query('INSERT INTO SAVEDNOTES SET `note_id` = ?, `saved_id` = ?;',
									[noteId, savedId],
									function (err, result2) {
										if (err) {
											console.error(err)
											res.status(500).json({success:false})
										} else {
											res.status(201).json({success: true})
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
	auth.verifyToken(token, saveNote, error)
})


function sendToS3 (img, key) {
  var s3 = new AWS.S3();
  return new Promise(function(resolve, reject) {
    s3.createBucket({Bucket: 'notesee.bucket'}, function() {
      var buffer = new Buffer(img.replace(/'data:image\/\w+base64,/, ""),'base64')
      var params = {Bucket: 'notesee.bucket', ContentEncoding: 'base64', ContentType:'image/jpg', ACL: 'public-read', Key: key, Body: buffer};
      s3.upload(params, function(err, data) {
      if (err) {  
          console.log('Error: ', err);
          reject(err);   
      } else {    
      	  console.log('Data: ', data);
          resolve(data.Location);
      }
    })
   });
  }).catch(function(err) {
    console.log('Error');
  })
};

module.exports = router
