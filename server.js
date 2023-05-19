'use strict'; // jshint browser: false, node: true, esnext: true
require           = require("esm")(module)

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
var appVersion          =  process.env.TAG;
let apiUrl              =  process.env.API_URL || 'https://api.cbddev.xyz';
let cdnUrl              = (process.env.CDN_URL || 'https://cdn.jsdelivr.net/').replace(/\/+$/, '')+'/';
    global.app          = _.extend((global.app||{}), {});
    global.app.rootPath = __dirname; //to use in subfolders
    global.app.cdnUrl   = cdnUrl;

const iframeAllowedUrls = [/^\/((ar|en|es|fr|ru|zh)\/)?share\/embed/]

if(!appVersion || appVersion.trim()==''){
    appVersion =  ((process.env.BRANCH||'') + '-'+ (process.env.VERSION ||''))||process.env.COMMIT;
}  

app.set('view engine', 'ejs');
app.use(cookieParser());

//special case for compression as prod files are compressed from cloud-front.
//use express compress when compress variable is true. 
if(process.env.COMPRESS=='true'){
    app.use(require('compression')({ filter: shouldCompress }));

    function shouldCompress (req, res) {
        if (/\/api\/*/.test(req.path)) {
          // don't compress responses with this request header
          return false
        }
        const compression = require('compression')
        // fallback to standard filter function
        return compression.filter(req, res)
    }
}

// Set routes
app.get('/national-report-questions/:report', require('./middlewares/national-reports-questions'));
app.use('/widgets.js',                               express.static(`${__dirname}/dist/en/app/assets/widgets.js`));
app.use('/legacy-ajax-plugin.js',                    express.static(`${__dirname}/dist/en/app/assets/legacy-ajax-plugin.js`));
app.use('/app/assets/widget-example.html',           express.static(`${__dirname}/app/assets/${process.env.CLEARINGHOUSE}-widget-example.html`));

app.use('(/:lang(ar|en|es|fr|ru|zh))?/app/libs',     express.static(__dirname + '/node_modules/@bower_components', { setHeaders: cacheControl.setCustomCacheControl }));
app.use('/ar',                                       express.static(`${__dirname}/dist/ar`, { setHeaders: cacheControl.setCustomCacheControl }));
app.use('/en',                                       express.static(`${__dirname}/dist/en`, { setHeaders: cacheControl.setCustomCacheControl }));
app.use('/es',                                       express.static(`${__dirname}/dist/es`, { setHeaders: cacheControl.setCustomCacheControl }));
app.use('/fr',                                       express.static(`${__dirname}/dist/fr`, { setHeaders: cacheControl.setCustomCacheControl }));
app.use('/ru',                                       express.static(`${__dirname}/dist/ru`, { setHeaders: cacheControl.setCustomCacheControl }));
app.use('/zh',                                       express.static(`${__dirname}/dist/zh`, { setHeaders: cacheControl.setCustomCacheControl }));

// TMP
app.use('(/:lang(ar|en|es|fr|ru|zh))?/app',          express.static(__dirname + '/app',         { setHeaders: cacheControl.setCustomCacheControl }));

app.use('/favicon.ico',     express.static(__dirname + '/favicon.ico', { setHeaders: cacheControl.setCustomCacheControl}));

app.get('/robots.txt' , require('./middlewares/robots'));
app.all('/sitemap(:num([0-9]{1,3})?).xml', require('./middlewares/sitemap'));

app.all('/app/*', function(req, res) { res.status(404).send(); } );

app.post('/error-logs', require('./middlewares/error-logs')(proxy, {apiUrl:apiUrl, appVersion:appVersion}));

// app.all('/api/v2013/documents/*', function(req, res) { proxy.web(req, res, { target: 'http://192.168.78.193', secure: false } ); } );
app.all('/api/*', (req, res) => proxy.web(req, res, { target: apiUrl, changeOrigin: true, secure:false }));

app.get('/(:lang(ar|en|es|fr|ru|zh)(/|$))?*', 
    function(req, res, next){
        global.app.version = appVersion;
        res.setHeader('Cache-Control', 'public');    
        res.cookie('VERSION', appVersion);
        
        for (let i = 0; i < iframeAllowedUrls.length; i++) {
            const url = iframeAllowedUrls[i];
            if(url.test(req.url))
                res.setHeader('X-Frame-Options', 'ALLOW')
        }     
        
        next();
    },
      
    translation.renderApplicationTemplate
);

// Start server
app.listen(process.env.PORT || 2010, '0.0.0.0',function () {
    console.log('Server listening on ', this.address());
    console.log(`               VERSION: ${appVersion}`);
    console.log(`               API Url: ${apiUrl}`);
    console.info(`              CDN Url: ${cdnUrl}`);
    console.log(`      Node environment: ${process.env.NODE_ENV||'-'}`);
    console.log();
});

proxy.on('error', function(err) {}); // ignore proxy errors
process.on('SIGTERM', ()=>process.exit());
