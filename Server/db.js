var fs = require('fs')
var mysql = require('mysql')
var db = mysql.createConnection({
  host: 'mysqlcluster16.registeredsite.com',
  user: 'notesee',
  password: '!Qaz2wsx',
  database: 'notesee'
})

db.connect(function (err) {
  if(!err) {
    console.log('Database is connected')
  } else {
    console.log('Error connecting to database')
  }
})

db.on('error', function(){
  console.error("ERROR in database")
})

fs.readFile(__dirname + '/schema.sql', 'utf-8', function(err, data){
  var commands = data.split(";");
  commands.pop();
  commands.forEach(function(command){
    db.query(command, function(err, results){
      if (err){
        console.error(err);
      }
    })
  })
})

// setInterval(function () { db.query('SELECT 1') }, 5000)

module.exports = db

