var express = require('express');
var routes = express.Router();
var db = require('../../conf/db');

routes.get('/plots/:plot_id/job/new/:type', function(req, res) {
	var data = {};
	db.employees.find({}, function(error, employees) {
		data.employees = employees;
		db.seeds.find({}, function(error, seeds) {
			data.seeds = seeds;
			res.render('jobs/new', {type: req.params.type, data: data});
		});
	})
})

.post('/plots/:plot_id/job/new/:type', function(req, res) {
	var data = req.body;
	data.type = req.params.type;
	data.plot_id = req.params.plot_id;

	db.jobs.insert(data, function(error, data) {
		res.redirect('/plots/'+req.params.plot_id);
	});
})

;

module.exports = routes;
