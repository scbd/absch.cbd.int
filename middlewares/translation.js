import { stat } from 'fs/promises';
let _       = require('lodash');
let url     = require('url');

let cacheControl = require('./cache-control')

const { bundleUrls } = require('../app/boot.js');

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
             statsLang  = await stat(global.app.rootPath + path);
         }catch(e){}

         if (statsLang && statsLang.isFile()) {
             
             let statsEN    = await stat(`${global.app.rootPath}/app${requestedUrl}`);
 
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
    preferredLang = preferredLang || 'en';
    
    let dirExists;
    try{
        dirExists = await stat(`${global.app.rootPath}/dist/${preferredLang}`)
    }
    catch(e){} 
    if(!dirExists || !dirExists.isDirectory())
        preferredLang = 'en';

    if(req.params.lang)
      urlPreferredLang = req.params.lang;
   
    if(!urlPreferredLang && preferredLang)//&& preferredLang!= 'en'
        return res.redirect('/'+preferredLang + (req.originalUrl||''));

    const locale =  urlPreferredLang || preferredLang || 'en';
 
    let options = { 
                    baseUrl            : ('/' + (urlPreferredLang || preferredLang || '') + '/').replace("//", '/'),
                    appVersion         : global.app.version,
                    clearingHouseHost  : process.env.CLEARINGHOUSE_HOST,
                    preferredLanguage  : locale,
                    googleAnalyticsCode: process.env.GOOGLE_ANALYTICS_CODE,
                    cdnUrl             : global.app.cdnUrl,
                    angularBundle      : bundleUrls.angularBundle,
                    initialCss         : bundleUrls.initialCss,
                };

    return res.render(`${global.app.rootPath}/dist/${locale}/app/templates/${process.env.CLEARINGHOUSE}.ejs`, options);
 }
 
 function getPreferredLanguage(req){
          
     if(req.params.lang)
         return req.params.lang;
     
     if(req.cookies.locale || req.headers['preferred-language']){
 
         let validLanguages = ['ar', 'en', 'fr', 'es', 'ru', 'zh']
         let language = req.cookies.locale || req.headers['preferred-language'];
         
         if(_.includes(validLanguages, language.toLowerCase())){
             return language;
         }
     }

     return 'en'
 }


 module.exports = {
    renderLanguageFile,
    getLanguageFile,
    getPreferredLanguage,
    renderApplicationTemplate
 }
