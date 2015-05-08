var express = require('express');
var routes = express.Router();
var db = require('../../conf/db');

routes.get('/io', function(req, res) {
	db.io.find({}, function(error, data) {
		res.render('io/index', {io: data});
	});
})

.get('/io/new/:type', function(req, res) {
	db.inventory.find({}, function(error, data){
		res.render('io/new',{io: data, type: req.params.type});
	});
})

.post('/io/new/:type', function(req, res) {
	var io = req.body;
	io.date = now();
	
	db.inventory.findOne({name:io.name},function(error, data){
		var inventory=data;
		
		if(inventory){
			if(req.params.type=="in"){
				inventory.amount=parseInt(inventory.amount,10)+parseInt(io.amount,10);
			}else{
				inventory.amount=parseInt(inventory.amount,10)-parseInt(io.amount,10);
			}
			
			db.inventory.update({name:inventory.name},{$set:inventory},{}, function(error, data){
				db.io.insert(io, function(error, data) {
					res.redirect('/io');
				});
			});
		}else{			
			if(req.params.type=="in"){
				inventory={"name":io.name, "amount":io.amount, "measure":io.measure};
				db.inventory.insert(inventory, function(error, data) {
					io.inventory_id=data._id;
					db.io.insert(io, function(error, data) {
						res.redirect('/io');
					});
				});
			}else{
				res.redirect('/io');
			}
		}
		
	});
	
	
})

;

module.exports = routes;

function now() {
	var date = new Date();
	return date.getDate() + '/' + (date.getMonth()+1).toString() + '/' + date.getFullYear();
}