var express = require('express');
var app = express();
var db = require('./models');

var Hashids = require('hashids');
var hashids = new Hashids('jurgen klopp over brendan rodgers');

var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
	res.render('index');
});

app.post('/links/', function(req, res) {
	var data = req.body.url;
	db.link.create({url: data}).then(function(link) {
		var hashKey = hashids.encode(link.id);
		link.hash = hashKey;
		link.save().then(function() {
			res.redirect('/links/' + link.id);
		});
	});
});

app.get('/links/', function(req, res) {
	db.link.findAll({order: 'count DESC'}).then(function(results) {
		// res.send(results);
		res.render('links/list', {results: results});
	});
});

app.get('/links/:item', function(req, res) {
	var item = parseInt(req.params.item);
	db.link.findById(item).then(function(item) {
		res.render('links/show', {item: item});
	});
});

app.get('/:hash', function(req, res) {
	var website = req.params.hash;
	db.link.find({where: {hash: website}}).then(function(foundWebsite) {
		foundWebsite.count++;
		foundWebsite.save().then(function() {
			if (foundWebsite.url.substring(0, 4) === 'http') {
				res.redirect(foundWebsite.url)
			} else {
				res.redirect('http://' + foundWebsite.url);
			}
		});
	});
});

app.listen(3000);