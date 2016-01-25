/* jshint node: true, browser: false */

// CREATE HTTP SERVER AND PROXY

var app     = require('express')();
var proxy   = require('http-proxy').createProxyServer({});

proxy.on('error', function(e) {
    console.error(e);
}); //ignore errors

// LOAD CONFIGURATION

var oneDay   = 86400000;
var cacheTag = Math.random() * 0x80000000 | 0;

app.use(require('morgan')('dev'));
// app.use(require('compression')());

app.set('port', process.env.PORT || 2010);

// Configure routes

app.use('/app',             require('serve-static')(__dirname + '/app'));
app.use('/scbd-templates',  require('serve-static')(__dirname + '/app/libs/scbd-angularjs-controls/scbd-templates'));
app.use('/cbd-forums',      require('serve-static')(__dirname + '/app/libs/cbd-forums'));
app.use('/favicon.ico',     require('serve-static')(__dirname + '/favicon.ico', { maxAge:    oneDay }));

app.all('/app/*', function(req, res) { res.status(404).send(); } );

app.get('/app/absPDFViewer/*'   , function(req, res) {
	res.sendFile(__dirname + '/app/absPDFViewer/absPermitPrint.html');
});

var targetURL = 'https://api.cbd.int';
// app.all('/api/v2014/discussions/*', function(req, res) { proxy.web(req, res, { target: 'http://192.168.78.193', secure: false } ); } );
 //app.all('/api/v2013/documents/*', function(req, res) { proxy.web(req, res, { target: 'http://192.168.78.193', secure: false } ); } );
app.get   ('/api/*', function(req, res) { proxy.web(req, res, { target: targetURL, secure: false } );  } );
app.put   ('/api/*', function(req, res) { proxy.web(req, res, { target: targetURL, secure: false } ); } );
app.post  ('/api/*', function(req, res) { proxy.web(req, res, { target: targetURL, secure: false } ); } );
app.delete('/api/*', function(req, res) { proxy.web(req, res, { target: targetURL, secure: false } ); } );


// Configure index.html

app.get('/*', function (req, res) {
    res.cookie('cachetag', cacheTag);
    res.sendFile(__dirname + '/app/template.html');
});

// Start server

app.listen(app.get('port'), function () {
	console.log('Server listening on %j', this.address());
});
