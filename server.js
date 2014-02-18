var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var httpProxy = require('http-proxy');

// Create server

var app = express();
var server = http.createServer(app);

app.configure(function() {
    app.set('port', process.env.PORT || 2010, '127.0.0.1');

    app.use(express.logger('dev'));
    app.use(express.compress());
    app.use('/app', express.static(__dirname + '/app'));
    app.use('/favicon.ico', express.static(__dirname + '/favicon.ico'));
});

// Configure routes

var proxy = new httpProxy.RoutingProxy();

app.get   ('/app/*'   , function(req, res) { res.send('404', 404); } );

app.get   ('/api/*', function(req, res) { proxy.proxyRequest(req, res, { changeOrigin: true, host: 'api.cbd.int', port: 80 }); } );
app.put   ('/api/*', function(req, res) { proxy.proxyRequest(req, res, { changeOrigin: true, host: 'api.cbd.int', port: 80 }); } );
app.post  ('/api/*', function(req, res) { proxy.proxyRequest(req, res, { changeOrigin: true, host: 'api.cbd.int', port: 80 }); } );
app.delete('/api/*', function(req, res) { proxy.proxyRequest(req, res, { changeOrigin: true, host: 'api.cbd.int', port: 80 }); } );

// Configure index.html

app.get('/*', function(req, res) {
	fs.readFile(__dirname + '/app/template.html', 'utf8', function (error, text) { 
		res.send(text); 
	});
});

// Start server

console.log('Server listening on port ' + app.get('port'));
server.listen(app.get('port'));