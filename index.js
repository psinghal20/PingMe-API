var express = require('express');
var app = express();
var cors = require('cors');
var http = require('http').Server(app);
var routes = require('./routes/routes');
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/',routes);

http.listen( process.env.PORT || 8000,function(){
	console.log('listening on *:8000');
});