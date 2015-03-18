var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

var app = express();
app.set('port', 3000);
app.set('views', path.join(__dirname+'/../app/views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname+'/../public')));
app.use(morgan('dev'));	 // Logging DEV
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Cargar los controlladores dinamicamente
var controllers = fs.readdirSync(path.join(__dirname+'/../app/controllers'));
controllers.forEach(function (ctrl) {
	app.use(require('../app/controllers/'+ctrl));
});

module.exports = app;
