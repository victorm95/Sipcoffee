var express = require('express');
var routes = express.Router();

routes.get('/install', function(req, res) {
	res.render('install/index');
})

.post('/install/land', function(req, res) {
	var land = req.body;
	land.blocks = parseInt(land.blocks);
	land.area = parseInt(land.area);
	res.json(land);
})

;

module.exports = routes;
