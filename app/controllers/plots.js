var express = require('express');
var routes = express.Router();
var db = require('../../conf/db');

routes.get('/plots/:id/edit', function(req, res) {
	db.plots.findOne({_id: req.params.id}, function(error, data) {
		if(error) res.render('error', {error: error, page: req.originalUrl});
		else res.render('plots/edit', {plot: data});
	});
})
.post('/plots/:id/edit', function(req, res) {
	db.land.findOne({}, function(error, land) {
		db.plots.findOne({_id: req.params.id}, function(error, plot) {
			var block = land.blocks[plot.block_id];
			db.plots.find({block_id: plot.block_id}, function(error, plots) {
				var plotsArea = parseFloat(req.body.area);
				for(i=0; i<plots.length; i++) plotsArea += plots[i].area;
				plotsArea -= plot.area;

				console.log('[Plots Area]: '+plotsArea);
				console.log('[Block Area]: '+block.area);

				if(plotsArea <= block.area) {
					req.body.area = parseFloat(req.body.area);
					db.plots.update({_id: plot._id}, {$set: req.body}, {}, function(error, num) {
						res.redirect('/blocks/'+block._id);
					});	
				} else {
					res.render('error', {error: 'El area de las parcelas supera el area del bloque.', page: req.originalUrl});
				}
			});
		});
	});
})

;

module.exports = routes;
