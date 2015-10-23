var express = require('express');
var app = express();
var db = require('./models');

var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index');
});

app.post('/links/', function(req, res) {
	var data = req.body.q;
	db.link.create({url: data, hash: ''}).then(function(link) {
		res.redirect('/links/' + link.id);
	});
});

app.get('/links/:item', function(req, res) {
	var item = parseInt(req.params.item);
	db.link.findById(item).then(function(item) {
		res.render('links/show', {item: item});
	});
});

app.listen(3000);