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

.get('/land/new/:job', function(req, res) {
	db.plots.find().sort({block_id: 1}).exec(function(error, plots) {
		db.land.findOne({}, function(error, land) {
			var blocks = land.blocks;

			for(i=0; i<plots.length; i++) {
				if(!blocks[plots[i].block_id].plots) blocks[plots[i].block_id].plots = [];
				blocks[plots[i].block_id].plots.push(plots[i])

			}
			res.render('land/job.jade', {blocks: blocks, job: req.params.job});
		});
	});
})
.post('/land/new/:job', function(req, res) {
	res.json(req.body);
})

;

module.exports = routes;
