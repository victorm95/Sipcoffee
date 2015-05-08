var express = require('express');
var routes = express.Router();
var db = require('../../conf/db');

routes.get('/inventory', function(req, res) {
	db.inventory.find({}, function(error, data) {
		res.render('inventory/index', {inventory: data});
	});
});

module.exports = routes;
