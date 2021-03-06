var express = require('express');
var routes = express.Router();
var db = require('../../conf/db');

routes.get('/job/new/:type', function(req, res) {
	var data = {};
	db.employees.find({}, function(error, employees) {
		data.employees = employees;
		db.seeds.find({}, function(error, seeds) {
			data.seeds = seeds;
			db.land.findOne({}, function(error, land) {
				db.plots.find({}, function(error, plots) {
					var blocks = land.blocks;
					for(i=0; i<plots.length; i++) {
						if(!blocks[plots[i].block_id].plots) blocks[plots[i].block_id].plots = [];
						blocks[plots[i].block_id].plots.push(plots[i]);
					}
					data.blocks = blocks;
					res.render('jobs/new', {type: req.params.type, data: data});
				});
			});
		});
	})
})

.post('/job/new/:type', function(req, res) {
	var data = req.body;
	data.type = req.params.type;

	db.jobs.insert(data, function(error, data) {
		res.redirect('/land');
	});
})

.get('/job/history', function(req, res) {
	db.jobs.find({}, function(error, data) {
		res.render('jobs/history', {jobs: data});
	});
})

.get('/jobs/:id', function(req, res) {
	db.jobs.findOne({_id: req.params.id}, function(error, job) {
		db.employees.findOne({_id: job.employee_id}, function(error, employee) {
			db.seeds.findOne({_id: job.seed_id}, function(error, seed) {
				res.render('jobs/show', {job: job, employee: employee, seed: seed});
			});
		});
	});
})

;

module.exports = routes;
