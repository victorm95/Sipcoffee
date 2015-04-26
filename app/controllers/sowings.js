var express = require('express');
var routes = express.Router();
var db = require('../../conf/db');

routes.get('/plots/:plot_id/sowing/new', function(req, res) {	
	db.seeds.find({}, function(error, data){
		res.render('sowings/new',{seeds: data, page: '/plots/'+req.params.plot_id});
	});
})

.post('/plots/:plot_id/sowing/new', function(req, res) {
	var sowing = req.body;
	sowing.plot_id = req.params.plot_id;
	sowing.date = now();

	db.sowings.insert(sowing, function(error, data) {
		res.redirect('/plots/'+req.params.plot_id);
	});
})

/*.get('/sowings/:id', function(req, res) {
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
})*/

;

module.exports = routes;

function now() {
	var date = new Date();
	return date.getDate() + '/' + date.getMonth()+1 + '/' + date.getFullYear();
}
