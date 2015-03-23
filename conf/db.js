var Datastore = require('nedb');

module.exports = {
	land: new Datastore({filename: 'db/land.db', autoload: true}), // Terreno
	blocks: new Datastore({filename: 'db/blocks.db', autoload: true}), // Bloques
	plots: new Datastore({filename: 'db/plots.db', autoload: true}), // Parcelas
	harvests: new Datastore({filename: 'db/harvests.db', autoload: true}), // Cosechas
	sowings: new Datastore({filename: 'db/sowings.db', autoload: true}), // Siembras
	seeds: new Datastore({filename: 'db/seeds.db', autoload: true}), // Cafetos (Semillas)
	processes: new Datastore({filename: 'db/processes', autoload: true}), // Procesos
	entries: new Datastore({filename: 'db/entries', autoload: true}), // Entradas
	outputs: new Datastore({filename: 'db/outputs', autoload: true}), // Salidas
	products: new Datastore({filename: 'db/products', autoload: true}) // Productos	
};
