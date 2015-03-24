var express = require('express');
var routes = express.Router();
var db = require('../../conf/db');

routes.get('/land', function(req, res) {
	db.land.findOne({}, function(error, data) {
		res.render('land/index', {land: data});
	});
});

module.exports = routes;
