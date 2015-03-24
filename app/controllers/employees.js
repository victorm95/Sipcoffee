var express = require('express');
var routes = express.Router();
var db = require('../../conf/db');

routes.get('/employees', function(req, res) {
	db.employees.find({}, function(error, data) {
		res.render('employees/index', {employees: data});
	});
})

.get('/employees/new', function(req, res) {
	res.render('employees/new');
})

.post('/employees/new', function(req, res) {
	db.employees.insert(req.body, function(error, data) {
		res.redirect('/employees');
	});
})

.get('/employees/:id', function(req, res) {
	db.employees.findOne({_id: req.params.id}, function(error, data) {
		res.render('employees/show', {employee: data});
	});
})

.get('/employees/:id/delete', function(req, res) {
	db.employees.remove({_id: req.params.id}, {}, function(error, num) {
		if(error) {
			res.send('Error');
		} else {
			res.redirect('/employees');
		}
	});
})

.get('/employees/:id/edit', function(req, res) {
	db.employees.findOne({_id: req.params.id},function(error, data) {
		res.render('employees/edit', {employee: data});
	});
})

.post('/employees/:id/edit', function(req, res) {
	db.employees.findOne({_id: req.params.id}, function(error, data) {
		db.employees.update({_id: req.params.id}, {$set: req.body}, {}, function(error, data) {
			if(error) {
				res.send('Error');
			} else {
				res.redirect('/employees');
			}
		});
	});
})

;

module.exports = routes;
