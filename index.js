var express = require('express');
var app = express();
var http = require('http').Server(app);
var routes = require('./routes/routes');

app.use('/',routes);

http.listen(8000,function(){
	console.log('listening on *:8000');
});