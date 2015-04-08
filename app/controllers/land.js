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
	db.land.findOne({}, function(error, land) {
		var blocksArea = 0;
		for(i=0; i<land.blocks.length; i++) blocksArea += land.blocks[i].area;

		if(blocksArea <= parseFloat(req.body.area)) {
			db.land.update({_id: land._id}, {$set: req.body}, {}, function(error, num) {
				res.redirect('/land');
			});
		} else {
			res.render('error', {error: 'El area del terreno es menor al area de los bloques.', page: req.originalUrl});
		}
	});
})

;

module.exports = routes;
