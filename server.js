/* jshint node:true 
*/
var fs = require('fs');
var http = require('http');
var express = require('express');
var httpProxy = require('http-proxy');

// Create server

var app = express();
var server = http.createServer(app);
var oneDay = 24*60*60*1000;

app.configure(function() {
    app.set('port', process.env.PORT || 2010, '127.0.0.1');

    app.use(express.logger('dev'));
    app.use(express.compress());
    app.use('/app', express.static(__dirname + '/app'));
    app.use('/scbd-templates', express.static(__dirname + '/app/libs/scbd-angularjs-controls/scbd-templates'));
    app.use('/cbd-forums',   express.static(__dirname + '/app/libs/cbd-forums'));
    app.use('/favicon.ico', express.static(__dirname + '/favicon.ico', { maxAge: oneDay }));
});

// Configure routes

var proxy = httpProxy.createProxyServer({});


app.get   ('/app/absPDFViewer/*'   , function(req, res) {
	fs.readFile(__dirname + '/app/absPDFViewer/absPermitPrint.html', 'utf8', function (error, text) {
		res.send(text);
	});} );

app.get   ('/app/*'   , function(req, res) { res.send('404', 404); } );
app.get   ('/public/*', function(req, res) { res.send('404', 404); } );

// var targetURL = 'http://localhost';
var targetURL = 'https://api.cbd.int';
//console.log(req.headers['x-forwarded-for'], req.connection.remoteAddress);
// app.all('/api/v2014/discussions/*', function(req, res) { proxy.web(req, res, { target: 'http://192.168.78.193', secure: false } ); } );
// app.all('/api/v2013/documents/*', function(req, res) { proxy.web(req, res, { target: 'http://192.168.78.193', secure: false } ); } );
app.get   ('/api/*', function(req, res) { proxy.web(req, res, { target: targetURL, secure: false } );  } );
app.put   ('/api/*', function(req, res) { proxy.web(req, res, { target: targetURL, secure: false } ); } );
app.post  ('/api/*', function(req, res) { proxy.web(req, res, { target: targetURL, secure: false } ); } );
app.delete('/api/*', function(req, res) { proxy.web(req, res, { target: targetURL, secure: false } ); } );

// Configure index.html

app.get('/*', function(req, res) {
	fs.readFile(__dirname + '/app/template.html', 'utf8', function (error, text) {
		res.send(text);
	});
});

proxy.on('error',function (err,req) {
  console.error(err, req.url);
});
// Start server

console.log('Server listening on port ' + app.get('port'));
server.listen(app.get('port'));
