var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('customerlist',['customerlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/customerlist', function(req, res) {
     console.log("I have received a GET Request")

     db.customerlist.find(function (err, docs) {
     	console.log(docs);
     	res.json(docs);
     });
});

app.post('/customerlist', function(req, res) {
	console.log(req.body);
	db.customerlist.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.delete('/customerlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.customerlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
        res.json(doc);       
	});
});

app.get('/customerlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.customerlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.put('/customerlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(req.body.number);
	db.customerlist.findAndModify({query: {_id: mongojs.ObjectId(Id)},
        update: {$set: {number: req.body.number, name: req.body.name, phone: req.body.phone}},
        new: true}, function(err, doc) {
        	res.json(doc);
        });
});
	
app.listen(3000);
console.log("Server is running on port 3000");