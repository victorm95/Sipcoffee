var express = require('express');
var routes = express.Router();
var db = require('../../conf/db');

routes.get('/', function(req, res) {
	db.land.findOne({}, function(error, land) {
		if(error) {
			res.render('error', {error: error});
		} else {
			// Identificar la primera ejecucion
			if(land) {
				res.json(land);
			} else {
				res.redirect('/install');
			}
		}
	});
});

module.exports = routes;
