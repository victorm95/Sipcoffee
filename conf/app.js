var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.set('port', 3000);
app.set('views', path.join(__dirname+'/app/views'));
app.set('view engine', 'jade');
app.use(morgan('dev'));	 // Logging DEV
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

module.exports = app;
