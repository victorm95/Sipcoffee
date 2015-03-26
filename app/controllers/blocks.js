var express = require('express');
var routes = express.Router();
var db = require('../../conf/db');

routes.get('/blocks/:id', function(req, res) {
	db.land.findOne({}, function(error, land) {
		db.plots.find({block_id: parseInt(req.params.id)}).sort({name: 1}).exec(function(error, data) {
			var block = land.blocks[parseInt(req.params.id)];
			block.plots = data;
			res.render('blocks/index', {block: block});
		});
	});
})

.get('/blocks/:id/edit', function(req, res) {
	db.land.findOne({}, function(error, land) {
		var block = land.blocks[parseInt(req.params.id)];
		res.render('blocks/edit', {block: block});
	});
})
.post('/blocks/:id/edit', function(req, res) {
	db.land.findOne({}, function(error, land) {
		var block = land.blocks[parseInt(req.params.id)];

		var blocksArea = parseFloat(req.body.area);
		for(i=0; i<land.blocks.length; i++) blocksArea += land.blocks[i].area;
		blocksArea-=block.area;

		db.plots.find({block_id: block._id}, function(error, plots) {
			var plotsArea = 0;
			for(i=0; i<plots.length; i++) plotsArea+=plots[i].area;

			if(plotsArea <= req.body.area && blocksArea <= land.area) {
				block.name = req.body.name;
				block.area = parseFloat(req.body.area);
				land.blocks[block._id] = block;

				db.land.update({_id: land._id}, {$set: {'blocks': land.blocks}}, {}, function(error, num) {
					if(error) res.send(error);
					else res.redirect('/land');
				});
			} else {
				res.render('error', {error: 'No se puede redimensionar el bloque.', page: '/blocks/'+block._id+'/edit'});
			}
		});
	});
})

;

module.exports = routes;
