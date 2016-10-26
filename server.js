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

var oneDay   = 86400000;
app.set('view engine', 'ejs');
// Set routes
app.use('/?:lang(ar|en|es|fr|ru|zh)?/app',     translation, express.static(__dirname + '/app'));
app.use('/app',                              express.static(__dirname + '/app'));
app.use('/cbd-forums',      express.static(__dirname + '/app/libs/cbd-forums'));
app.use('/favicon.ico',     express.static(__dirname + '/favicon.ico', { maxAge: oneDay }));
app.all('/app/*', function(req, res) { res.status(404).send(); } );


// app.all('/api/v2013/documents/*', function(req, res) { proxy.web(req, res, { target: 'http://192.168.78.193', secure: false } ); } );
app.all('/api/*', (req, res) => proxy.web(req, res, { target: 'https://api.cbddev.xyz', changeOrigin: true, secure:false }));
app.get('/?:lang(ar|en|es|fr|ru|zh)?/*', function (req, res) {
   var urlPreferredLang;
   if(req.params.lang)
     urlPreferredLang = ('/'+req.params.lang+'/');
   
   var appVersion = process.env.TAG;
   if(!appVersion || appVersion.trim()==''){
       appVersion =  (process.env.BRNACH||'') + '-'+ (process.env.VERSION ||'');
   }   
   res.cookie('appVersion', appVersion);
   res.cookie('VERSION', process.env.VERSION);
   req.url = '/template.ejs';
   co(function*(){
        var langFilepath = yield getLanguageFile(req);
        var preferredLang = getPreferredLanguage(req);
        var options = { baseUrl: urlPreferredLang || (req.headers.base_url ||  (preferredLang ? ('/'+preferredLang+'/') : '/')) };
        
        if(preferredLang && parseCookies(req, 'locale')!= preferredLang)
            res.cookie('locale', preferredLang);
        
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

function* getLanguageFile(req){

    var preferredLang = getPreferredLanguage(req);
    
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

    var htlmRegex       = /.(html|ejs)/g; ///.html?[^.]/g//\.html(?!.js)
    var cookieLangRegex = /locale=(ar|fr|es|ru|zh)/g
    var langRegex       = /^(ar|fr|es|ru|zh)/;
    var url = req.url;
    if(htlmRegex.test(url)){

        if(_.includes(req.headers, 'preferred-language') ||
          cookieLangRegex.test(req.headers.cookie)){

           var validLanguages = ['ar', 'fr', 'es', 'ru', 'zh']
           var language = req.headers['preferred-language'];
           if(language==undefined)
                language = parseCookies(req, 'locale');

           if(_.includes(validLanguages, language.toLowerCase())){
               return language;
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
