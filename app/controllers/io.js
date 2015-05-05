var express = require('express');
var routes = express.Router();
var db = require('../../conf/db');

routes.get('/io', function(req, res) {
	db.io.find({}, function(error, data) {
		res.render('io/index', {io: data});
	});
})

.get('/io/new', function(req, res) {
	db.io.find({}, function(error, data){
		res.render('io/new',{io: data});
	});
})

.post('/io/new', function(req, res) {
	var io = req.body;
	io.date = now();
	db.io.insert(io, function(error, data) {
		res.redirect('/io');
	});
})

.get('/io/:id/delete', function(req, res) {
	db.io.remove({_id: req.params.id}, {}, function(error, num) {
		if(error) {
			res.send('Error');
		} else {
			res.redirect('/io');
		}
	});
})

.get('/io/:id/edit', function(req, res) {
	db.io.findOne({_id: req.params.id},function(error, data) {
		res.render('io/new', {io: data});
	});
})

.post('/io/:id/edit', function(req, res) {
	db.io.findOne({_id: req.params.id}, function(error, data) {
		var io = req.body;
		io.date = now();
		db.io.update({_id: req.params.id}, {$set: io}, {}, function(error, data) {
			if(error) {
				res.send('Error');
			} else {
				res.redirect('/io');
			}
		});
	});
})

;

module.exports = routes;

function now() {
	var date = new Date();
	return date.getDate() + '/' + (date.getMonth()+1).toString() + '/' + date.getFullYear();
}