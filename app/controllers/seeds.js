var express = require('express');
var routes = express.Router();
var db = require('../../conf/db');

routes.get('/seeds', function(req, res) {
	db.seeds.find({}, function(error, data) {
		res.render('seeds/index', {seeds: data});
	});
})

.get('/seeds/new', function(req, res) {
	res.render('seeds/new');
})

.post('/seeds/new', function(req, res) {
	db.seeds.insert(req.body, function(error, data) {
		res.redirect('/seeds');
	});
})

.get('/seeds/:id', function(req, res) {
	db.seeds.findOne({_id: req.params.id}, function(error, data) {
		res.render('seeds/show', {employee: data});
	});
})

.get('/seeds/:id/delete', function(req, res) {
	db.seeds.remove({_id: req.params.id}, {}, function(error, num) {
		if(error) {
			res.send('Error');
		} else {
			res.redirect('/seeds');
		}
	});
})

.get('/seeds/:id/edit', function(req, res) {
	db.seeds.findOne({_id: req.params.id},function(error, data) {
		res.render('seeds/edit', {seed: data});
	});
})

.post('/seeds/:id/edit', function(req, res) {
	db.seeds.findOne({_id: req.params.id}, function(error, data) {
		db.seeds.update({_id: req.params.id}, {$set: req.body}, {}, function(error, data) {
			if(error) {
				res.send('Error');
			} else {
				res.redirect('/seeds');
			}
		});
	});
})

;

module.exports = routes;
