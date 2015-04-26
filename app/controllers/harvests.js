var express = require('express');
var routes = express.Router();
var db = require('../../conf/db');

routes.get('/plots/:plot_id/harvest/new', function(req, res) {	
	db.employees.find({}, function(error, data){
		res.render('harvests/new',{employees: data});
	});
})

.post('/plots/:plot_id/harvest/new', function(req, res) {
	var harvest = req.body;
	harvest.plot_id = req.params.plot_id;
	harvest.date = now();

	db.harvests.insert(harvest, function(error, data) {
		res.redirect('/plots/'+req.params.plot_id);
	});
})

/*.get('/harvests/:id', function(req, res) {
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
		db.harvests.update({_id: req.params.id}, {$set: req.body}, {}, function(error, num) {
			if(error) {
				res.send('Error');
			} else {
				res.redirect('/harvests/'+req.params.id);
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
