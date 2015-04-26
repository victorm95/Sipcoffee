var express = require('express');
var routes = express.Router();
var db = require('../../conf/db');

routes.get('/blocks/:block_id/plots/new', function(req, res) {
	res.render('plots/new', {plot: {block_id: parseInt(req.params.block_id)}});
})
.post('/blocks/:block_id/plots/new', function(req, res) {
	var plot = req.body;
	plot.block_id = parseInt(req.params.block_id);

	db.land.findOne({}, function(error, land) {
		var blockArea = land.blocks[plot.block_id].area;
		
		db.plots.find({block_id: plot.block_id}, function(error, plots) {
			var plotsArea = plot.area;
			for(i=0; i<plots.length; i++) plotsArea += plots[i].area;

			if(plotsArea <= blockArea) {
				db.plots.insert(plot, function(error, data){
					res.redirect('/blocks/'+plot.block_id);
				});
			} else {
				res.render('error', {error: 'El area de las parcelas es mayor al area del bloque.', page: req.originalUrl});
			}
		});
	});
})


.get('/plots/:id/edit', function(req, res) {
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

.get('/plots/:id/delete', function(req, res) {
	db.plots.findOne({_id: req.params.id}, function(error, plot) {
		db.plots.remove({_id: req.params.id}, function(error, num) {
			if(!error) res.redirect('/blocks/'+plot.block_id);
		});
	});
})

.get('/plots/:id', function(req, res) {
	db.plots.findOne({_id: req.params.id}, function(error, plot) {
		db.land.findOne({}, function(error, land) {
			db.sowings.find({plot_id: plot._id}, function(error, sowings) {
				var jobs = [];
				for(i=0; i<sowings.length; i++) {
					var job = sowings[i];
					job.type = 'Siembra';
					jobs.push(job);
				}

				db.harvests.find({plot_id: plot._id}, function(error, harvests) {
					for(i=0; i<harvests.length; i++) {
						var job = harvests[i];
						job.type = 'Cosecha';
						jobs.push(job);
					}
					res.render('plots/show', {plot: plot, block: land.blocks[plot.block_id], jobs: jobs});
				});
			});
		});
	});
})

;

module.exports = routes;
