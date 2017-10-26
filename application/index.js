var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/html' });
	//res.end(`<h1>${process.env.IP}</h1>`);
	res.end(`<h1>${req.connection.localAddress}</h1>`);
}).listen(8080);

