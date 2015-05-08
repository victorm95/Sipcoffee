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
	cc: 'int',
	telephone: 'int', 
	mobile: 'int'
};

io = { // Entrada y salidas
	inventory_id: 'ObjectId'
	amount: 'string',
	date: 'date',
	cost: 'float',
	type: 'string'
};

inventory = { // Inventario
	name: 'string',
};

job = { // Trabajos
	employee_id: 'ObjectId',
	type: 'string', // Siembra, Cosecha, Fumigacion
	time: 'int',
	date: 'date', 
	cost: 'float',
	io_id: 'Array[ObjectId]'
};
