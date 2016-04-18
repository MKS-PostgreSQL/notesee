var express = require('express')
var router = express.Router()
var db = require('../db.js')
var AWS = require('aws-sdk')
var credentials = require('../credentials.js')
var auth = require('../auth.js')

function pseudoRandomString() {
    return Math.round((Math.pow(36, 6) - Math.random() * Math.pow(36, 5))).toString(36).slice(1);
}

//var base64image = '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'

AWS.config.update({accessKeyId: credentials.accessKeyId, secretAccessKey: credentials.secretAccessKey, region: 'us-west-1'});

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
	var username req.header.username
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
