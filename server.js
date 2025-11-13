
// Create HTTP server and proxy
import express      from 'express';
import cookieParser from 'cookie-parser';
import _            from 'lodash';
import * as translation  from './middlewares/translation.js';
import setCustomCacheControl from './middlewares/cache-control.js';
import httpProxy from 'http-proxy';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import nationalReportsQuestions  from './middlewares/national-reports-questions.js'
import robotTxt from './middlewares/robots.js';
import siteMap from './middlewares/sitemap.js';
import errorLogs from './middlewares/error-logs.js';
import { rejectBotsPdf } from "./middlewares/reject-bots-pdf.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app   = express();
const proxy = httpProxy.createProxyServer({});

process.env.CLEARINGHOUSE = process.env.CLEARINGHOUSE || 'ABS';

// Initialize constants
var appVersion          =  process.env.TAG;
let apiUrl              =  process.env.API_URL || 'https://api.cbddev.xyz';
let accountsUrl         =  process.env.ACCOUNTS_URL || 'https://accounts.cbddev.xyz';
let cdnUrl              = (process.env.CDN_URL || 'https://cdn.jsdelivr.net/').replace(/\/+$/, '')+'/';
    global.app          = _.extend((global.app||{}), {});
    global.app.rootPath = __dirname; //to use in subfolders
    global.app.cdnUrl   = cdnUrl;
    global.app.apiUrl = apiUrl;
    global.app.accountsUrl = accountsUrl;

const iframeAllowedUrls = [/^\/((ar|en|es|fr|ru|zh)\/)?share\/embed/]

if(!appVersion || appVersion.trim()==''){
    appVersion =  ((process.env.BRANCH||'') + '-'+ (process.env.VERSION ||''))||process.env.COMMIT;
}  

app.set('view engine', 'ejs');
app.use(cookieParser());

//special case for compression as prod files are compressed from cloud-front.
//use express compress when compress variable is true. 
if(process.env.COMPRESS=='true'){
    app.use(compression({ filter: shouldCompress }));

    function shouldCompress (req, res) {
        if (/\/api\/*/.test(req.path)) {
          // don't compress responses with this request header
          return false
        }
        // fallback to standard filter function
        return compression.filter(req, res)
    }
}

// Set routes
app.get('/national-report-questions/:report', nationalReportsQuestions);
app.use('/widgets.js',                               express.static(`${__dirname}/dist/en/app/assets/widgets.js`));
app.use('/legacy-ajax-plugin.js',                    express.static(`${__dirname}/dist/en/app/assets/legacy-ajax-plugin.js`));
app.use('/app/assets/widget-example.html',           express.static(`${__dirname}/app/assets/${process.env.CLEARINGHOUSE}-widget-example.html`));
app.use('/app/img/cbd-logo-en.svg',                  express.static(`${__dirname}/app/img/cbd-logo-green-en.svg`));
app.use('(/:lang(ar|en|es|fr|ru|zh))?/pdf/:type/:schema/:documentId/:revision?',     rejectBotsPdf);

app.use('(/:lang(ar|en|es|fr|ru|zh))?/app/libs',     express.static(__dirname + '/node_modules/@bower_components', { setHeaders: setCustomCacheControl }));
app.use('/ar',                                       express.static(`${__dirname}/dist/ar`, { setHeaders: setCustomCacheControl }));
app.use('/en',                                       express.static(`${__dirname}/dist/en`, { setHeaders: setCustomCacheControl }));
app.use('/es',                                       express.static(`${__dirname}/dist/es`, { setHeaders: setCustomCacheControl }));
app.use('/fr',                                       express.static(`${__dirname}/dist/fr`, { setHeaders: setCustomCacheControl }));
app.use('/ru',                                       express.static(`${__dirname}/dist/ru`, { setHeaders: setCustomCacheControl }));
app.use('/zh',                                       express.static(`${__dirname}/dist/zh`, { setHeaders: setCustomCacheControl }));

// TMP
app.use('(/:lang(ar|en|es|fr|ru|zh))?/app',          express.static(__dirname + '/app',         { setHeaders: setCustomCacheControl }));

app.use('/favicon.ico',     express.static(__dirname + '/favicon.ico', { setHeaders: setCustomCacheControl}));

app.get('/robots.txt' , robotTxt);
app.all('/sitemap(:num([0-9]{1,3})?).xml', siteMap);

app.all('/app/*', function(req, res) { res.status(404).send(); } );

app.post('/error-logs', errorLogs(proxy, {apiUrl:apiUrl, appVersion:appVersion}));

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
    console.log(`   Server listening on: http://localhost:${this.address().port}`);
    console.log(`               VERSION: ${appVersion}`);
    console.log(`               API Url: ${apiUrl}`);
    console.info(`               CDN Url: ${cdnUrl}`);
    console.log(`      Node environment: ${process.env.NODE_ENV||'-'}`);
    console.log();
});

proxy.on('error', function(err) {}); // ignore proxy errors
process.on('SIGTERM', ()=>process.exit());
