var express = require('express');
var routes = express.Router();
var db = require('../../conf/db');

routes.get('/harvests', function(req, res) {
	db.harvests.find({}, function(error, data) {
		res.render('harvests/index', {harvests: data});
	});
})

.get('/harvests/new', function(req, res) {
	res.render('harvests/new');
})

.post('/harvests/new', function(req, res) {
	db.harvests.insert(req.body, function(error, data) {
		res.redirect('/harvest');
	});
})

.get('/harvests/:id', function(req, res) {
	db.harvests.findOne({_id: req.params.id}, function(error, data) {
		res.render('harvests/show', {harvest: data});
	});
})

.get('/harvests/:id/delete', function(req, res) {
	db.harvests.remove({_id: req.params.id}, {}, function(error, num) {
		if(error) {
			res.send('Error');
		} else {
			res.redirect('/harvests');
		}
	});
})

.get('/harvests/:id/edit', function(req, res) {
	posts.findOne({_id: req.params.id}, function(error, data) {
		res.render('harvests/edit', {harvest: data});
	});
})

.post('/harvests/:id/edit', function(req, res) {
	db.harvests.findOne({_id: req.params.id}, function(error, data) {
		harvests.update({_id: req.params.id}, {$set: req.body}, {}, function(error, data) {
			if(error) {
				res.send('Error');
			} else {
				res.redirect('/harvests/'+req.params.id);
			}
		});
	});
})

;

module.exports = routes;
