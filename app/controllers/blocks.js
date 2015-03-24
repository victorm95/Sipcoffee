var express = require('express');
var routes = express.Router();
var db = require('../../conf/db');

routes.get('/blocks/:id', function(req, res) {
	db.land.findOne({}, function(error, land) {
		db.plots.find({block_id: parseInt(req.params.id)}, function(error, data) {
			var block = land.blocks[parseInt(req.params.id)];
			block.plots = data;
			res.render('blocks/index', {block: block});
		});
	});
});

module.exports = routes;
