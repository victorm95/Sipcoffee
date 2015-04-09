var express = require('express');
var routes = express.Router();
var db = require('../../conf/db');

routes.get('/blocks/new', function(req, res) {
	res.render('blocks/new');
})
.post('/blocks/new', function(req, res) {
	db.land.findOne({}, function(error, land) {
		var blocksArea = parseFloat(req.body.area);
		for(i=0; i<land.blocks.length; i++) blocksArea += land.blocks[i].area;

		if(blocksArea <= land.area) {
			var block = {
				name: req.body.name,
				area: parseFloat(req.body.area),
				_id: land.blocks[(land.blocks.length-1)]._id + 1
			};
			var plotArea = block.area / parseFloat(req.body.plots);
			var plots = [];
			for(i=0; i<parseFloat(req.body.plots); i++) plots.push({ name: 'Parcela '+(i<9?'0':'')+(i+1), area: plotArea, block_id: block._id});

			db.land.update({_id: land._id}, {$push: {blocks: block}}, {}, function(error, num){
				db.plots.insert(plots);			
				res.redirect('/land');
			});
		} else {
			res.render('error', {error: 'El area de los bloques es mayor al area del terreno.', page: req.originalUrl});
		}
	});
})

.get('/blocks/:id', function(req, res) {

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
