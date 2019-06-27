let fs      = require('fs');
let util    = require('util');
var _       = require('lodash');
var url     = require('url');
    fs.stat = util.promisify(fs.stat);


async function renderLanguageFile(req, res, next) {
   
         let langFilepath = await getLanguageFile(req);
         if(langFilepath){
              return res.sendFile(langFilepath);
         }    
             
         next();
 }
 
 async function getLanguageFile(req, preferredLang){
 
     if(!preferredLang)
         preferredLang = getPreferredLanguage(req);
 
     if(preferredLang){

         var requestedUrl = url.parse(req.url).pathname;
         var path = `/i18n/${preferredLang}/app${requestedUrl}`;               
 
         let statsLang;
         try{
             statsLang  = await fs.stat(global.app.rootPath + path);
         }catch(e){}

         if (statsLang && statsLang.isFile()) {
             
             var statsEN    = await fs.stat(`${global.app.rootPath}/app${requestedUrl}`);
 
             var mLangtime  = new Date(util.inspect(statsLang.mtime));
             var mENtime    = new Date(util.inspect(statsEN.mtime));
             if(mLangtime >= mENtime)
                 return `${global.app.rootPath}${path}`;

         }
     }           
 }

 async function renderApplicationTemplate(req, res){
    var urlPreferredLang;
   
    if(req.params.lang)
      urlPreferredLang = req.params.lang;
   
    req.url = `/templates/${process.env.CLEARINGHOUSE}.ejs`;
 
    var preferredLang = getPreferredLanguage(req);
    var langFilepath = await getLanguageFile(req, preferredLang);
    var options = { 
                    baseUrl            : ('/' + (urlPreferredLang || preferredLang || '') + '/').replace("//", '/'),
                    appVersion         : global.app.version,
                    clearingHouseHost  : process.env.CLEARINGHOUSE_HOST,
                    preferredLanguage  : preferredLang||'en',
                    googleAnalyticsCode: process.env.GOOGLE_ANALYTICS_CODE
                };
    if(langFilepath){
        return res.render(langFilepath, options);
    } 

    return res.render(`${global.app.rootPath}/app/templates/${process.env.CLEARINGHOUSE}.ejs`, options);
 }
 
 function getPreferredLanguage(req){
     
     var htmlRegex       = /.(html|ejs|json)$/g; ///.html?[^.]/g//\.html(?!.js)
     var langRegex       = /^(ar|fr|es|ru|zh)/;
     var requestedUrl    = url.parse(req.url).pathname;
 
     if(!htmlRegex.test(requestedUrl))
         return;
 
     if(req.params.lang)
         return req.params.lang;
     
     if(req.headers['preferred-language']){
 
         var validLanguages = ['ar', 'fr', 'es', 'ru', 'zh']
         var language = req.headers['preferred-language'];
         
         if(_.includes(validLanguages, language.toLowerCase())){
             return language;
         }
     }
 }


 module.exports = {
    renderLanguageFile,
    getLanguageFile,
    getPreferredLanguage,
    renderApplicationTemplate
 }
