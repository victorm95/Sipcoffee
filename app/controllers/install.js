var express = require('express');
var routes = express.Router();

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
			plots: []
		};
		land.blocks.push(block);
	}

	if(blocksArea <= land.area) {
		for(i=0; i<parseInt(req.body.blocks); i++) {
			var plotsNum = parseInt(req.body.blockPlots[i]);
			var plotArea = parseFloat(req.body.blockArea[i]) / parseFloat(req.body.blockPlots[i]);

			for(j=1; j<=plotsNum; j++) {
				var plot = {
					name: 'Parcela '+j,
					area: plotArea
				};
				land.blocks[i].plots.push(plot);
			}
		}

		res.json(land);
	} else {
		res.send('Error, el area de los bloques exede el area el terreno.');
	}
})

;

module.exports = routes;
