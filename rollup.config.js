// rollup.config.js (building more than one bundle)
import path                                       from 'path'
import vue                                        from 'rollup-plugin-vue'
import nodeResolve                                from '@rollup/plugin-node-resolve'
import commonjs                                   from '@rollup/plugin-commonjs';
import alias                                      from '@rollup/plugin-alias';
import json                                       from '@rollup/plugin-json';
import amd                                        from 'rollup-plugin-amd';
import glob                                       from 'glob';
import util                                       from 'util';
import cheerio                                    from 'cheerio';
import { processFiles, copyFiles                } from './scripts/pre-build-process';
import { terser                                 } from 'rollup-plugin-terser';
import { string                                 } from "rollup-plugin-string";
import { getBabelOutputPlugin                   } from '@rollup/plugin-babel';
import { readFileSync, writeFileSync, mkdirSync } from 'fs'

const isLocalDev = process.argv.includes('--watch');// || true;

const asyncGlob = util.promisify(glob)
const outputDir = 'dist';
let globalHashMapping = {};

const externals = [ '_', 'Vue', 'Vue', 'ky', 'angular', 'angular-route', 'angular-cookies', 'angular-sanitize', 'angular-animate', 'css', 
'text', 'json', 'linqjs', 'async', 'domReady', 'bootstrap-datepicker', 'datepicker-range', 'jquery', 'bootstrap', 'lodash', 'moment', 
'ng-breadcrumbs', 'ngSmoothScroll', 'angular-joyride', 'toastr', 'ngStorage', 'ngDialog', 'ngInfiniteScroll', 'tableexport', 'blobjs', 'file-saverjs', 'xlsx', 'jszip', 
'webui-popover', 'chart-js', 'printThis', 'diacritics', 'pdfjs-dist/build/pdf', 'pdfjs-dist/build/pdf.worker', 'pdf-object', 'angular-trix', 'trix', 'ngMeta', 
'angular-loggly-logger', 'drag-and-drop', 'angucomplete-alt', 'angular-cache', 'jquery-ui', 'pivottable', 'plotly-renderers', 'angular-vue', 'ky', 'socket.io', 
'cbd-forums', 'shim', 'view-abs-checkpoint', 'angular-flex', 'babel-polyfill', 'realmConf',
'css!components/scbd-branding/directives/footer'
];  
const bundleFiles = [ ];
const langRegex = /\/(ar|en|fr|es|ru|zh)\//;

export default async function() {

  const languages = ['ar', 'en', 'fr', 'es', 'ru', 'zh'];
  const appDir = 'i18n';
  const i18nDir = 'i18n-build'  
  let allApplicationFiles = [];
  const globOptions = {
    pattern: '**/*.{js,html,json,vue}',
    ignore : ['hash-file-mapping.js', '**/views/pdf-viewer/pdfjs/**'],
  }
  //don't process i18n files when running locally
  if(!isLocalDev){
    await processFiles();
    const i18nFiles = (await  asyncGlob(globOptions.pattern, { 
                        cwd: path.join(process.cwd(), i18nDir),
                        ignore:globOptions.ignore
                      }));
    i18nFiles.forEach(m=>{
      externals.push(m);
      bundleFiles.push(bundle(m)); 
    }); 
  }
  else{ //en files only
    //copy ejs files to dist folder
    await copyFiles(process.cwd(), 'app', ['en'], 'dist', '**/*.ejs');
      
    //copy pdfviewer files //TODO: find best way, for now it can be in /app to avoid duplication
    // await copyFiles(process.cwd(), 'app', languages, 'dist', '**/views/pdf-viewer/pdfjs/**');
    const enFiles = (await  asyncGlob(globOptions.pattern, { 
                      cwd: path.join(process.cwd(), 'app'),
                      ignore: globOptions.ignore
                    }));
    enFiles.forEach(m=>{
          externals.push(m);
          if(/assets\/widgets\.js$/.test(m))
            bundleFiles.push(bundleWidget(m, 'app')); 
          else 
            bundleFiles.push(bundle(m, 'app')); 
      });
  }

  return bundleFiles;
}

function bundle(relativePath, baseDir='i18n-build') {
 
  let requireSourcemap = false;
  const extension = path.extname(relativePath);
  let outputFileExt = extension;  
  if(extension=='.json')outputFileExt = '.json.js'; 
  if(extension=='.html')outputFileExt = '.html.js';

  let outputFileName   = `[name].[hash]${outputFileExt}`;
  // if(isLocalDev)
  //   outputFileName     = `[name].fakehash${outputFileExt}`;
  // if(isLocalDev && relativePath.indexOf('boot.js')>=0)
  //   outputFileName     = `[name]${outputFileExt}`;  

  if(/\.json\.js/.test(extension) || /\.json/.test(extension))
    requireSourcemap=false;
 
  //when running for local development add en folder path else the i18n-build has good path so need for adjustments
  let enFolder='en/app'; 
  if(!isLocalDev)
    enFolder = '';

  return {
    input : path.join(baseDir||'', relativePath),
    output: [{
      format   : 'amd',
      sourcemap: requireSourcemap,
      dir : path.join(outputDir, enFolder, path.dirname(relativePath)),
      name : `${relativePath.replace(/[^a-z0-9]/ig, "_")}`,
      entryFileNames: outputFileName,
      chunkFileNames: outputFileName,      
    }],

    external: externals,
    plugins : [
      alias({ entries : [
          { find: /^~\/(.*)/, replacement:`${process.cwd()}/app/$1` },
          { find: /^json!(.*)/, replacement:`$1` },
          { find: /^text!(.*)/, replacement:`$1` },
        ] 
      }), 
      sanitizeString(),
      addLanguageAttribute(),     
      json({namedExports:false}),  
      string({ include: "**/*.html"}),
      amd({ include: `**/*.js`, }),
      vue(),
      getBabelOutputPlugin({
        presets: [['@babel/preset-env', { targets: "> 0.25%, IE 10, not dead"}]],
        allowAllFormats: true,
        exclude: [ '*.json' ],
      }),
      (isLocalDev || 1==1) ? null : terser({
        ecma: 5,
        mangle:false
      }),
      saveHashFileNames(),
    ], 
  }
}

function bundleWidget(relativePath, baseDir='i18n-build') {
 
  const extension = path.extname(relativePath);
  let outputFileExt = extension;  
  let outputFileName   = `[name]${outputFileExt}`;
   
  //when running for local development add en folder path else the i18n-build has good path so need for adjustments
  let enFolder='en/app'; 
  if(!isLocalDev)
    enFolder = '';

  return {
    input : path.join(baseDir||'', relativePath),
    output: [{
      format   : 'iife',
      sourcemap: true,
      dir : path.join(outputDir, enFolder, path.dirname(relativePath)),
      name : `${relativePath.replace(/[^a-z0-9]/ig, "_")}`,
      entryFileNames: outputFileName,
      chunkFileNames: outputFileName,      
    }],
    plugins : [
      alias({ entries : [
          { find: /^~\/(.*)/, replacement:`${process.cwd()}/app/$1` }
        ] 
      }), 
      getBabelOutputPlugin({
        presets: [['@babel/preset-env', { targets: "> 0.25%, IE 10, not dead"}]],
        allowAllFormats: true,
        exclude: [ '*.json' ],
      }),
      (isLocalDev) ? null : terser({
        ecma: 5,
        mangle:true
      })
    ], 
  }
}

//custom plugins

function saveHashFileNames(){

  return {
    name:'saveHashFileNames',
    generateBundle: async function(OutputOptions, bundle){
      const langRegex = /\/(ar|en|fr|es|ru|zh)\//;
      const hashFileName = Object.keys(bundle)[0]; 
      const fileName     = bundle[hashFileName].facadeModuleId.replace(/\\/g, '/').replace(/.*app\//, '').replace(/\.html$/, '.html.js');
      const langMatch    = OutputOptions.dir.match(langRegex); 
      let lang           = 'en'
      if(langMatch)
        lang = langMatch[1];

      const hashMapFileName = `${process.cwd()}/${outputDir}/${lang}/app/hash-file-mapping.js`;
      // console.log(fileName, langMatch, OutputOptions);
      
      if(!globalHashMapping[lang])
        globalHashMapping[lang] = {};

      globalHashMapping[lang][fileName] = hashFileName;
      const defineSyntax = `define(function () {
                                return ${JSON.stringify(globalHashMapping[lang])};
                            });`
      mkdirSync(`${process.cwd()}/${outputDir}/${lang}/app`, {recursive:true});
      writeFileSync(hashMapFileName, defineSyntax);
      writeFileSync(`${hashMapFileName}.json`, JSON.stringify(globalHashMapping[lang], null, 4));
    }
  }

}


function sanitizeString(options){

    if ( options === void 0 ) options = {};

    return {
      name: 'sanitizeString',

      // eslint-disable-next-line no-shadow
      transform: function(text, id) {

        if (id.slice(-5) == '.html') { 
          try{
              return {
                        code: text.replace(/^\uFEFF/gm, "").replace(/^\u00BB\u00BF/gm,""),
                        map: { mappings: '' }
                    };
          }
          catch (err) {
            var message = 'Failed to remove bom chars from html string';
            var position = parseInt(/[\d]/.exec(err.message)[0], 10);
            this.warn({ message: message, id: id, position: position });
            return null;
          }
        }
        else if (/\.json\.js$/.test(id) || /\.json$/.test(id)) {  
              
          try { 
            const data = {
                code: text.replace(/\s(?=(?:"[^"]*"|[^"])*$)/g, ''),
                map: { mappings: '' }
            };
            return data;
          } catch (err) {
            var message = 'Failed to remove line feed';
            var position = parseInt(/[\d]/.exec(err.message)[0], 10);
            this.warn({ message: message, id: id, position: position });
            return null;
          }
        }

        return null; 
      }
    };
}

function addLanguageAttribute(){

  return {
    name: 'languageAttribute',

    // eslint-disable-next-line no-shadow
    transform: function(content, filePath) {  
      if(content && /\.html$/.test(filePath)){

          const $html = cheerio.load(`<div class="my-lang-selector">${content}</div>`, {decodeEntities: false});
          let contentHtml = $html('.my-lang-selector').children()
          if(!contentHtml.attr('lang')){

              let lang = 'en'
              const match = filePath.match(/(?:^|\/)(ar|en|es|fr|ru|zh)\/.*/);
              if(match && match.length > 1)
                  lang = match[1];
                  
              contentHtml.attr('lang', lang);
          }

          return {
            code : $html('.my-lang-selector').html(),
            map  : { mappings: '' }
          };
      }

      return content;
    }
  }
}