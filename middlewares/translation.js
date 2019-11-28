let fs      = require('fs');
let util    = require('util');
let _       = require('lodash');
let url     = require('url');
    fs.stat = util.promisify(fs.stat);

let cacheControl = require('./cache-control')

async function renderLanguageFile(req, res, next) {
   
         let langFilepath = await getLanguageFile(req);
         if(langFilepath){
            cacheControl.setCustomCacheControl(res);
            return res.sendFile(langFilepath);
         }    
             
         next();
 }
 
 async function getLanguageFile(req, preferredLang){
 
     if(!preferredLang)
         preferredLang = getPreferredLanguage(req);
 
     if(preferredLang){

         let requestedUrl = url.parse(req.url).pathname;
         let path = `/i18n/${preferredLang}/app${requestedUrl}`;               
 
         let statsLang;
         try{
             statsLang  = await fs.stat(global.app.rootPath + path);
         }catch(e){}

         if (statsLang && statsLang.isFile()) {
             
             let statsEN    = await fs.stat(`${global.app.rootPath}/app${requestedUrl}`);
 
             let mLangtime  = new Date(util.inspect(statsLang.mtime));
             let mENtime    = new Date(util.inspect(statsEN.mtime));
             if(mLangtime >= mENtime)
                 return `${global.app.rootPath}${path}`;

         }
     }           
 }

 async function renderApplicationTemplate(req, res){
    let urlPreferredLang;
    let preferredLang = getPreferredLanguage(req);

    if(req.params.lang)
      urlPreferredLang = req.params.lang;
   
    if(!urlPreferredLang && preferredLang)//&& preferredLang!= 'en'
        return res.redirect('/'+preferredLang + (req.originalUrl||''))
    req.url = `/templates/${process.env.CLEARINGHOUSE}.ejs`;
 
    let langFilepath = await getLanguageFile(req, preferredLang);
    let options = { 
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
     
     let htmlRegex       = /.(html|ejs|json)$/g; ///.html?[^.]/g//\.html(?!.js)
     let langRegex       = /^(ar|fr|es|ru|zh)/;
     let requestedUrl    = url.parse(req.url).pathname;
 
    //  if(!htmlRegex.test(requestedUrl))
    //      return;
 
     if(req.params.lang)
         return req.params.lang;
     
     if(req.cookies.locale || req.headers['preferred-language']){
 
         let validLanguages = ['ar', 'fr', 'es', 'ru', 'zh']
         let language = req.cookies.locale || req.headers['preferred-language'];
         
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
