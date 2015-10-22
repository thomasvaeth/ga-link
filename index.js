var express = require('express');
var app = express();

var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index');
});

app.listen(3000);