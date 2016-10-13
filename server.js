'use strict';

// Create HTTP server and proxy

var express = require('express');
var proxy   = require('http-proxy').createProxyServer({});
var app     = express();

// Initialize constants

var oneDay   = 86400000;

// Set routes

app.use('/app',             express.static(__dirname + '/app'));
app.use('/scbd-templates',  express.static(__dirname + '/app/libs/scbd-angularjs-controls/scbd-templates'));
app.use('/cbd-forums',      express.static(__dirname + '/app/libs/cbd-forums'));
app.use('/favicon.ico',     express.static(__dirname + '/favicon.ico', { maxAge: oneDay }));

app.all('/app/*', function(req, res) { res.status(404).send(); } );

app.get('/app/absPDFViewer/*'   , function(req, res) {
	res.sendFile(__dirname + '/app/absPDFViewer/absPermitPrint.html');
});

// app.all('/api/v2013/documents/*', function(req, res) { proxy.web(req, res, { target: 'http://192.168.78.193', secure: false } ); } );
app.all('/api/*', (req, res) => proxy.web(req, res, { target: 'https://api.cbddev.xyz', changeOrigin: true, secure:false }));

// Configure index.html

app.get('/*', function (req, res) {
    res.cookie('VERSION', process.env.VERSION);
    res.cookie('TAG', process.env.TAG);
    res.cookie('REPONAME', process.env.REPONAME);
    res.sendFile(__dirname + '/app/template.html');
});

// Start server

app.listen(process.env.PORT || 2010, '0.0.0.0',function () {
	console.log('Server listening on %j', this.address());
});

proxy.on('error', function(err) {
}); // ignore proxy errors

process.on('SIGTERM', ()=>process.exit());
