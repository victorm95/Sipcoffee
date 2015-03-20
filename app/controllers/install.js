var express = require('express');
var routes = express.Router();

routes.get('/install', function(req, res) {
	res.render('install/index');
});

module.exports = routes;
