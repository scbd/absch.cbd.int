'use strict';

// Create HTTP server and proxy

var _       = require('lodash');
var fs      = require('co-fs');
var util    = require('util');
var co      = require('co');
var express = require('express');
var proxy   = require('http-proxy').createProxyServer({});
var app     = express();

// Initialize constants

var appVersion = process.env.TAG;
if(!appVersion || appVersion.trim()==''){
    appVersion =  (process.env.BRNACH||'') + '-'+ (process.env.VERSION ||'');
    // if(appVersion == "-")
}  
var oneDay   = 86400000;
app.set('view engine', 'ejs');
// Set routes
app.use('/?:lang(ar|en|es|fr|ru|zh)?/app/components/scbd-map/worldEUHigh.js', express.static(__dirname + '/app/components/scbd-map/worldEUHigh.js', { setHeaders: setCustomCacheControl , maxAge: 86400000*365 }) );
app.use('/?:lang(ar|en|es|fr|ru|zh)?/app',     translation, express.static(__dirname + '/app', { setHeaders: setCustomCacheControl }));
// app.use('/app',                              express.static(__dirname + '/app'));
app.use('/cbd-forums',      express.static(__dirname + '/app/libs/cbd-forums', { setHeaders: setCustomCacheControl }));
app.use('/favicon.ico',     express.static(__dirname + '/favicon.ico', { setHeaders: setCustomCacheControl , maxAge: oneDay }));
app.all('/app/*', function(req, res) { res.status(404).send(); } );


// app.all('/api/v2013/documents/*', function(req, res) { proxy.web(req, res, { target: 'http://192.168.78.193', secure: false } ); } );
app.all('/api/*', (req, res) => proxy.web(req, res, { target: 'https://api.cbddev.xyz', changeOrigin: true, secure:false }));
app.get('/?:lang(ar|en|es|fr|ru|zh)?/*', function (req, res) {
   var urlPreferredLang;
   if(req.params.lang)
     urlPreferredLang = ('/'+req.params.lang+'/');
    
   res.setHeader('Cache-Control', 'public, max-age=0');
   
   res.cookie('VERSION', appVersion);
   req.url = '/template.ejs';
   co(function*(){

        var preferredLang = getPreferredLanguage(req);
        var langFilepath = yield getLanguageFile(req, preferredLang);
        var options = { baseUrl: urlPreferredLang || (req.headers.base_url ||  (preferredLang ? ('/'+preferredLang+'/') : '/')), 'appVersion' : appVersion };
        
        if(langFilepath){
             return res.render(langFilepath, options);
        } 

        return res.render(__dirname + '/app/template.ejs', options);
    })
});

// Start server

app.listen(process.env.PORT || 2010, '0.0.0.0',function () {
	console.log('Server listening on %j', this.address());
});

proxy.on('error', function(err) {
}); // ignore proxy errors

process.on('SIGTERM', ()=>process.exit());

function translation(req, res, next) {
   
   co(function*(){
        let langFilepath = yield getLanguageFile(req);
        if(langFilepath){
             return res.sendFile(langFilepath);
        }    
            
        next();
   });
}

function* getLanguageFile(req, preferredLang){

    if(!preferredLang)
        preferredLang = getPreferredLanguage(req);

    if(preferredLang){
        var path = `/i18n/${preferredLang}/app${req.url}`;               

        let statsLang;
        try{
            statsLang  = yield fs.stat(__dirname + path);
        }catch(e){}
        if (statsLang && statsLang.isFile()) {
            
            var statsEN    = yield fs.stat(`${__dirname}/app${req.url}`);

            var mLangtime  = new Date(util.inspect(statsLang.mtime));
            var mENtime    = new Date(util.inspect(statsEN.mtime));
            if(mLangtime >= mENtime)
                return __dirname + path;
        }
    }           
}

function getPreferredLanguage(req){
    
    if(req.params.lang)
        return req.params.lang;

    var htlmRegex       = /.(html|ejs|json)/g; ///.html?[^.]/g//\.html(?!.js)
    var langRegex       = /^(ar|fr|es|ru|zh)/;
    if(req.headers['preferred-language']){

        var validLanguages = ['ar', 'fr', 'es', 'ru', 'zh']
        var language = req.headers['preferred-language'];
        
        if(_.includes(validLanguages, language.toLowerCase())){
            return language;
        }
    }
}

//============================================================
//
//
//============================================================
function setCustomCacheControl(res, path) {

	var versionWrong = false;
	var versionMatch = false;

    if(res.req.headers && res.req.headers.referer!="http://localhost:2010/"){
        versionWrong |= res.req.query && res.req.query.v && res.req.query.v!=appVersion;
        versionWrong |= res.req.cookies && res.req.cookies.VERSION && res.req.cookies.VERSION!=appVersion;
        versionMatch |= res.req.query && res.req.query.v && res.req.query.v==appVersion;
        versionMatch |= res.req.cookies && res.req.cookies.VERSION && res.req.cookies.VERSION==appVersion;
    }
	if(versionWrong || !versionMatch)
		return res.setHeader('Cache-Control', 'public, max-age=0');

	res.setHeader('Cache-Control', 'public, max-age=86400000');
}