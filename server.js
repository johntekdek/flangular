var express = require('express'),
	employees = require('./app/employees.js'),
	fakerton = require('./app/fakerton.js'),
	skills = require('./app/skills.js'),
	port = 8895;


var app = express();
app.configure(function () {
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.static(__dirname + '/public'));
	app.use(express.errorHandler({
		dumpExceptions: true, 
		showStack: true
	}));
  app.use(app.router);
});
app.get('/', function (req, res) {
	res.redirect("/index.html");
})
app.get('/fakerton', fakerton.data );

app.post('/skills/add', skills.controls.add);
app.get('/skills/get', skills.query.all);
app.get('/skills/get/filter',skills.query.filter);
app.get('/skills/get/tree', skills.query.tree);
app.delete('/skills/del', skills.controls.remove);
app.put('/skills/put', skills.controls.update);
app.put('/skills/edit', skills.controls.edit);

app.get('/employees/get', employees.query.all);
app.get('/employees/get/contact', employees.query.contact)
app.get('/employees/get/address', employees.query.address)
app.get('/employees/get/name', employees.query.name);
app.get('/employees/get/tree', employees.query.tree);

app.post('/employees/add', employees.controls.add);
app.delete('/employees/del', employees.controls.remove);
app.put('/employees/put', employees.controls.update);
app.put('/employees/edit/',employees.controls.edit);

app.listen(port)
console.log('listening on port %s', port);