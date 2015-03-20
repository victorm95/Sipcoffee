land = { // Terreno
	name: 'string',
	area: 'float',
	blocks: [{ // Bloques
		name: 'string',
		area: 'float',
		plots: 'Array[ObjectId]' // Arreglo de Parcelas
	}]
};

plots = { // Parcelas
	block_id: 'ObjectId', // Relacion a Bloque
	name: 'string',
	area: 'float',
	active: 'boolean'
};

harvests = { // Cosechas
	plot_id: 'ObjectId', // Relacion a Parcela
	amount: 'float',
	date: 'date'
};

sowings = { // Siembras
	plot_id: 'ObjectId', // Relacion a Parcela
	seed: 'ObjectId', // Relacion a Cafeto
	amount: 'float',
	date: 'date'
};

seeds = { // Cafetos
	name: 'string',
	fertilizerAmount: 'float',
	pesticideAmount: 'float',
	grooveDistance: 'float', // Distancia de surco
	seedDistance: 'float',
	seedbedTime: 'integer',	// Tiempo en Semillero
	masticTime: 'integer', // Tiempo en Almacigo
	grainingTime: 'integer', // Tiempo de Graneo
	socaTime: 'integer',
	supplier: 'string',
	harves: 'integer'
};
