var express = require('express')
var app = express()
var mongo = require('mongodb')
var routes = require('./app/routes/index.js');
var api = require('./app/api/redirect.js');

var MongoClient = mongo.MongoClient;
var url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/data'; 


MongoClient.connect(url, function (err, db) {
  	if (err) {
    	console.log('Unable to connect to the mongoDB server. Error:', err);
  	} else {
    	console.log('Connection established to', url);
  	}
  	db.createCollection("sites")

  	routes(app);
	api(app, db);

	var port = process.env.PORT || 8080; 
	app.listen(port, function() {
    	console.log("ShorterUrl App listening on port "+ port);
	});

});




