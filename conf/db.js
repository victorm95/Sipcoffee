var Datastore = require('nedb');

module.exports = {
	land: new Datastore({filename: 'db/land.db', autoload: true}), // Terreno
	//blocks: new Datastore({filename: 'db/blocks.db', autoload: true}), // Bloques
	plots: new Datastore({filename: 'db/plots.db', autoload: true}), // Parcelas
	harvests: new Datastore({filename: 'db/harvests.db', autoload: true}), // Cosechas
	sowings: new Datastore({filename: 'db/sowings.db', autoload: true}), // Siembras
	seeds: new Datastore({filename: 'db/seeds.db', autoload: true}) // Cafetos (Semillas)
};
