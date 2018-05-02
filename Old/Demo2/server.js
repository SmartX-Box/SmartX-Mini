/* 
	SmartX-mini Resource-level Monitoring Service
	Web server
	
	Usage: node server.js <mongodbip:port>	
 */

var express = require('express');
var fs = require('fs');
var app = express();

app.get('/', function(req, res) {
	// Read html file for web ui
	fs.readFile('smartx_rm_ui.html', function(error, data) {
		res.writeHead(200, {'Content-Type': 'text/html' });
		res.end(data);
	});
});

// Pass Mongodb address to ui
app.get('/data', function(req, res) {
	res.send(process.argv[2]);
});

// Default port: 1336
app.listen(1336, function() {
	console.log('Server started. Listening 1336');
});
