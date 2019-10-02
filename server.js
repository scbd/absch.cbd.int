'use strict'; // jshint browser: false, node: true, esnext: true

process.env.CLEARINGHOUSE = process.env.CLEARINGHOUSE || 'ABS';

// Create HTTP server and proxy
var express      = require('express');
var proxy        = require('http-proxy').createProxyServer({});
var app          = express();
var cookieParser = require('cookie-parser');
var _            = require('lodash');
var translation  = require('./middlewares/translation');
let cacheControl = require('./middlewares/cache-control')

// Initialize constants
var appVersion          = process.env.TAG;
var oneDay              = 86400000;
let apiUrl              = process.env.API_URL||'https://api.cbddev.xyz';
    global.app          = _.extend((global.app||{}), {});
    global.app.rootPath = __dirname; //to use in subfolders

if(!appVersion || appVersion.trim()==''){
    appVersion =  ((process.env.BRANCH||'') + '-'+ (process.env.VERSION ||''))||process.env.COMMIT;
}  

app.set('view engine', 'ejs');
app.use(cookieParser());

// Set routes
app.use('(/:lang(ar|en|es|fr|ru|zh))?/app/views/countries/worldEUHigh.js', express.static(__dirname + '/app/views/countries/worldEUHigh.js', { setHeaders: cacheControl.setCustomCacheControl , maxAge: 86400000*365 }) );
app.use('(/:lang(ar|en|es|fr|ru|zh))?/app/libs',     express.static(__dirname + '/node_modules/@bower_components', { setHeaders: cacheControl.setCustomCacheControl }));
app.use('(/:lang(ar|en|es|fr|ru|zh))?/app',          translation.renderLanguageFile, express.static(__dirname + '/app', { setHeaders: cacheControl.setCustomCacheControl }));

app.use('/cbd-forums',      express.static(__dirname + '/node_modules/@bower_components/cbd-forums', { setHeaders: cacheControl.setCustomCacheControl }));
app.use('/favicon.ico',     express.static(__dirname + '/favicon.ico', { setHeaders: cacheControl.setCustomCacheControl , maxAge: oneDay }));

app.get('/robots.txt' , require('./middlewares/robots'));
app.all('/sitemap(:num([0-9]{1,3})?).xml', require('./middlewares/sitemap'));

app.all('/app/*', function(req, res) { res.status(404).send(); } );

app.post('/error-logs', require('./middlewares/error-logs')(proxy, {apiUrl:apiUrl, appVersion:appVersion}));


// app.all('/api/v2013/documents/*', function(req, res) { proxy.web(req, res, { target: 'http://192.168.78.193', secure: false } ); } );
app.all('/api/*', (req, res) => proxy.web(req, res, { target: apiUrl, changeOrigin: true, secure:false }));

app.use(require('./middlewares/prerender')); // set env PRERENDER_SERVICE_URL

app.get('/(:lang(ar|en|es|fr|ru|zh)(/|$))?*', 
    function(req, res, next){
        global.app.version = appVersion;
        res.setHeader('Cache-Control', 'public, max-age=0');    
        res.cookie('VERSION', appVersion);
        next();
    },  
    translation.renderApplicationTemplate
);

// Start server
app.listen(process.env.PORT || 2010, '0.0.0.0',function () {
    console.log('Server listening on %j', this.address());
    console.log(`               VERSION: ${appVersion}`);
    console.log(`               API Url: ${apiUrl}`);
    console.log(`      Node environment: ${process.env.NODE_ENV||'-'}`);
    console.log();
});

proxy.on('error', function(err) {}); // ignore proxy errors
process.on('SIGTERM', ()=>process.exit());
