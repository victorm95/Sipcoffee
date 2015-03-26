// Elements
var form = document.querySelector('form');
var blocks =  form.querySelector('#blocks');

// Events
form.onreset = function(e) {
	clearBlockForms();
};

blocks.oninput = function(e) {
	clearBlockForms();
	var numBlocks = parseInt(blocks.value);
	for(i=1; i<=numBlocks; i++) {
		var divForm = document.createElement('div');
		divForm.className = 'form-block';

		var divName = document.createElement('div');
		divName.className = 'form-group';

		var divArea = document.createElement('div');
		divArea.className = 'form-group';

		var divPlots = document.createElement('div');
		divPlots.className = 'form-group';

		var nameLabel = document.createElement('label');
		nameLabel.setAttribute('for', 'blockName'+i);
		nameLabel.appendChild(document.createTextNode('Nombre del bloque ' + i));

		var nameInput = document.createElement('input');
		nameInput.type = 'text';
		nameInput.className = 'form-control';
		nameInput.id = 'blockName'+i;
		nameInput.name = 'blockName';
		nameInput.required = true;

		var areaLabel = document.createElement('label');
		areaLabel.setAttribute('for', 'blockArea'+i);
		areaLabel.appendChild(document.createTextNode('Area del bloque ' + i));

		var areaInput = document.createElement('input');
		areaInput.type = 'number';
		areaInput.className = 'form-control';
		areaInput.id = 'blockArea'+i;
		areaInput.name = 'blockArea';
		areaInput.required = true;

		var plotsLabel = document.createElement('label');
		plotsLabel.setAttribute('for', 'blockArea'+i);
		plotsLabel.appendChild(document.createTextNode('Cantidad de parcelas en bloque ' + i));

		var plotsInput = document.createElement('input');
		plotsInput.type = 'number';
		plotsInput.className = 'form-control';
		plotsInput.id = 'blockPlots'+i;
		plotsInput.name = 'blockPlots';
		plotsInput.required = true;

		divName.appendChild(nameLabel);
		divName.appendChild(nameInput);
		divArea.appendChild(areaLabel);
		divArea.appendChild(areaInput);
		divPlots.appendChild(plotsLabel);
		divPlots.appendChild(plotsInput);
		divForm.appendChild(divName);
		divForm.appendChild(divArea);
		divForm.appendChild(divPlots);
		form.insertBefore(divForm, form.lastChild);
	}
};

function clearBlockForms() {
	var blockForms = form.querySelectorAll('.form-block');
	for(i=0; i<blockForms.length; i++) blockForms[i].remove();
}
