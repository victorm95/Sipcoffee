var express = require('express');
var routes = express.Router();
var db = require('../../conf/db');

routes.get('/install', function(req, res) {
	res.render('install/index');
})

.post('/install', function(req, res) {
	var blocksArea = 0;
	var land = {
		name: req.body.name,
		area: parseFloat(req.body.area),
		blocks: []
	};

	for(i=0; i<parseInt(req.body.blocks); i++) {
		blocksArea += parseFloat(req.body.blockArea[i]);
		var block = {
			name: req.body.blockName[i],
			area: parseFloat(req.body.blockArea[i]),
		};
		land.blocks.push(block);
	}

	if(blocksArea <= land.area) {
		db.land.insert(land, function(error, data) {
			for(i=0; i<parseInt(req.body.blocks); i++) {
				var plotsNum = parseInt(req.body.blockPlots[i]);
				var plotArea = parseFloat(req.body.blockArea[i]) / parseFloat(req.body.blockPlots[i]);

				var plots = [];
				for(j=1; j<=plotsNum; j++) {
					var plot = {
						name: 'Parcela '+j,
						area: plotArea,
						block_id: i
					};
					plots.push(plot);
				}
				db.plots.insert(plots, function(error, data) { });
			}
			res.redirect('/');
		});
	} else {
		res.send('Error, el area de los bloques exede el area el terreno.');
	}
})

;

module.exports = routes;
