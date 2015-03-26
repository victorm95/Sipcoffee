var express = require('express');
var routes = express.Router();
var db = require('../../conf/db');

routes.get('/land', function(req, res) {
	db.land.findOne({}, function(error, data) {
		res.render('land/index', {land: data});
	});
})

.get('/land/edit', function(req, res) {
	db.land.findOne({}, function(error, data) {
		res.render('land/edit', {land: data});
	});
})
.post('/land/edit', function(req, res) {
	res.json(req.body);
})

;

module.exports = routes;
