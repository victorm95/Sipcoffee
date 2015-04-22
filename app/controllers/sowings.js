var express = require('express');
var routes = express.Router();
var db = require('../../conf/db');

routes.get('/sowings', function(req, res) {
	db.sowings.find({}, function(error, data) {
		res.render('sowings/index', {sowings: data});
	});
})

.get('/sowings/new', function(req, res) {	
	db.seeds.find({}, function(error,data){
		res.render('sowings/new',{sowings:data});
	});	
})

.post('/sowings/new', function(req, res) {
	db.sowings.insert(req.body, function(error, data) {
		res.redirect('/sowings');
	});
})

.get('/sowings/:id', function(req, res) {
	db.sowings.findOne({_id: req.params.id}, function(error, data) {
		res.render('sowings/show', {sowings: data});
	});
})

.get('/sowings/:id/delete', function(req, res) {
	db.sowings.remove({_id: req.params.id}, {}, function(error, num) {
		if(error) {
			res.send('Error');
		} else {
			res.redirect('/sowings');
		}
	});
})

.get('/sowings/:id/edit', function(req, res) {
	posts.findOne({_id: req.params.id}, function(error, data) {
		res.render('sowings/edit', {sowings: data});
	});
})

.post('/sowings/:id/edit', function(req, res) {
	db.sowings.findOne({_id: req.params.id}, function(error, data) {
		db.sowings.update({_id: req.params.id}, {$set: req.body}, {}, function(error, num) {
			if(error) {
				res.send('Error');
			} else {
				res.redirect('/sowings/'+req.params.id);
			}
		});
	});
})

;

module.exports = routes;
