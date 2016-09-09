'use strict';

// Create HTTP server and proxy

var _       = require('lodash');
var fs      = require('fs');
var util    = require('util');
var express = require('express');
var proxy   = require('http-proxy').createProxyServer({});
var app     = express();

// Initialize constants

var oneDay   = 86400000;

// Set routes

app.use('/app', function(req, res, next) {
	
    var langFilepath = serveLanguageFile(req);
    if(langFilepath)    
        return res.sendFile(langFilepath);
    // console.log(req.url)
    next();
});

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

    req.url = '/template.html';
    var langFilepath = serveLanguageFile(req);
    if(langFilepath)    
        return res.sendFile(langFilepath);

    // console.log('en file');    
    res.sendFile(__dirname + '/app/template.html');
});

// Start server

app.listen(process.env.PORT || 2010, '0.0.0.0',function () {
	console.log('Server listening on %j', this.address());
});

proxy.on('error', function(err) {
}); // ignore proxy errors

process.on('SIGTERM', ()=>process.exit());

function serveLanguageFile(req){
    var htlmRegex = /.html[^.]/g;
    var cookieLangRegex = /Preferences=Locale=(ar|fr|es|ru|zh)/g
    var url = req.url;
    if(htlmRegex.test(url)){

        if(_.includes(req.headers, 'Preferred-Language') ||
          cookieLangRegex.test(req.headers.cookie)){

           var validLanguages = ['ar', 'fr', 'es', 'ru', 'zh']
           var language = req.headers['preferred-language'];
           if(language==undefined)
                language = parseCookies(req, 'Preferences').replace('Locale=','');

           if(_.includes(validLanguages, language.toLowerCase())){
                // console.log(req.url);
              var path = `/i18n/${language}/app${req.url}`;
            //   if(req.url.indexOf('/app')>=0){
            //       console.log(req.url);
            //   }
              if (fs.existsSync(__dirname + path)) {
                  var statsLang  = fs.statSync(__dirname + path);
                  var statsEN    = fs.statSync(`${__dirname}/app${req.url}`);

                  var mLangtime  = new Date(util.inspect(statsLang.mtime));
                  var mENtime    = new Date(util.inspect(statsEN.mtime));
                  if(mLangtime >= mENtime)
                    return __dirname + path;
              }  
           }
        }
    }
}

function parseCookies (request, name) {
    var list = {},  rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    if(name)
        return list[name];

    return list;
}
