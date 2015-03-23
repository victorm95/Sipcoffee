land = { // Terreno
	name: 'string',
	area: 'float',
	blocks: [{ // Bloques
		name: 'string',
		area: 'float'
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

employees = { // Empleados
	name: 'string',
	cedula: 'int',
	telefono: 'int', 
	celular: 'int'
};

io = { // Empleados
	inventory_id: 'ObjectId'
	amount: 'string',
	date: 'date',
	type: 'in-out'
};

inventory = { // Empleados
	name: 'string',
	amount: 'string',
	unit: 'int' //gramos, litros
};

job = { // Empleados
	user_id: 'ObjectId',
	type: 'string', //siembra, cosecha, fumigacion
	time: 'int',
	date: 'date', //gramos, litros
	cost: 'float',
	io_id: 'Array[ObjectId]'
};