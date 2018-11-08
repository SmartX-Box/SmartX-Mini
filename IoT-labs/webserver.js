var net = require('net');
var http = require('http');
var url = require('url');
var fs = require('fs');
var temp;

var server = net.createServer();

server.on('connection', function (socket) {	
	socket.write("capture start! \r\n");
	//socket.pipe(socket);
	server.close(function(){
		console.log("tcp server closed.");
		console.log("IoT Temperature, Humidity service web server started");
		server.unref();
	});
});
server.listen(1337, '<NUC IP>');
http.createServer (function (request, response) {
	var query = url.parse(request.url, true).query;
	response.writeHead(200, { 'content-Type': 'text/html'});
	console.log(JSON.stringify(query));
	if (JSON.stringify(query).length > 13)
	{
		fs.writeFile('temp.txt', JSON.stringify(query), 'utf8', function (error){
		console.log('write');
	});
				        }
	fs.readFile('temp.txt', 'utf8', function (error, data){
		console.log(data);
		temp = data;
	});

	response.end(temp);
}).listen(80,function (){});

