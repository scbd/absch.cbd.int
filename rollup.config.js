// rollup.config.js (building more than one bundle)
import { terser } from 'rollup-plugin-terser';
import path from 'path'
import vue  from 'rollup-plugin-vue'
import nodeResolve              from '@rollup/plugin-node-resolve'
import commonjs                 from '@rollup/plugin-commonjs';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import alias                    from '@rollup/plugin-alias';
import json                     from '@rollup/plugin-json';
import amd from 'rollup-plugin-amd';
// const html = require('@rollup/plugin-html'); 
import { string } from "rollup-plugin-string";
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import glob from 'glob';
import util from 'util';
import { map } from 'core-js/fn/array';


const isWatchOn = process.argv.includes('--watch');
const asyncGlob = util.promisify(glob)
const outputDir = 'dist';
let globalHashMapping = {};

const externals = [ '_', 'Vue', 'Vue', 'ky', 'angular', 'angular-route', 'angular-cookies', 'angular-sanitize', 'angular-animate', 'css', 
'text', 'json', 'linqjs', 'async', 'domReady', 'bootstrap-datepicker', 'datepicker-range', 'jquery', 'bootstrap', 'lodash', 'moment', 
'ng-breadcrumbs', 'ngSmoothScroll', 'angular-joyride', 'toastr', 'ngStorage', 'ngDialog', 'ngInfiniteScroll', 'tableexport', 'blobjs', 'file-saverjs', 'xlsx', 'jszip', 
'webui-popover', 'chart-js', 'printThis', 'diacritics', 'pdfjs-dist/build/pdf', 'pdfjs-dist/build/pdf.worker', 'pdf-object', 'angular-trix', 'trix', 'ngMeta', 
'angular-loggly-logger', 'drag-and-drop', 'angucomplete-alt', 'angular-cache', 'jquery-ui', 'pivottable', 'plotly-renderers', 'angular-vue', 'ky', 'socket.io', 
'cbd-forums', 'shim', 'angular-localizer', 'view-abs-checkpoint', 'angular-flex', 'babel-polyfill', 'realmConf',
'css!components/scbd-branding/directives/footer'
];  
const bundleFiles = [
    // bundle('views/shared/404.html'),
    // bundle('views/shared/403.html') ,
    // bundle('app-data/search-tour.json') ,
    // // bundle('boot.js') ,
    // // bundle('app.js') ,
    // bundle('js/common.js'),
    // testStage(),
    // transform(`hash-file-mapping.json`, outputDir)
  ];
export default async function() {
// ,2html,1json|*(*.)json|*(*.)html1
  
  const allApplicationFiles = (await  asyncGlob('**/*.{js,html,json}', { 
                              cwd: path.join(process.cwd(), 'app'),
                              ignore:['hash-file-mapping.js']
                            }))
 
  allApplicationFiles.forEach(m=>{
    // if(/\.js$/.test(m))
      externals.push(m)
    bundleFiles.push(bundle(m))
  });

  //replace this  


  return bundleFiles;
}

function bundle(relativePath, baseDir='app') {

  const extension = path.extname(relativePath);
  let outputFileExt = extension;  
  if(extension=='.json')outputFileExt = '.js'
  if(extension=='.html')outputFileExt = '.html.js'
  return {
    input : path.join(baseDir||'', relativePath),
    output: [{
      format   : 'amd',
      sourcemap: true,
      dir : path.join(outputDir, path.dirname(relativePath)),
      name : `${relativePath.replace(/[^a-z0-9]/ig, "_")}${extension}`,
      entryFileNames: `[name].[hash]${outputFileExt}`,
      chunkFileNames: `[name].[hash]${outputFileExt}`,      
    }],

    external: externals,
    plugins : [
      alias({ entries : [
          { find: /^~\/(.*)/, replacement:`${process.cwd()}/app/$1` },
          { find: /^json!(.*)/, replacement:`$1` },
          { find: /^text!(.*)/, replacement:`$1` },
        ] 
      }), 
      amd({ include: 'app/**/*.js', exclude:['app/boot.js']}),
      removeLineFeeds(),     
      json({namedExports:false}),  
      string({
        include: "**/*.html", 
      }),
      // commonjs(),
      vue(),
      isWatchOn ? null : getBabelOutputPlugin({
                          presets: [['@babel/preset-env', { targets: "> 0.25%, IE 10, not dead"}]],
                          allowAllFormats: true,
                          exclude: [ /* '*.json' */],
                        }),
      isWatchOn ? null : terser(),
      saveHashFileNames(),
      // beforeFinish()
    ], 
  }
}

//custom plugins

function saveHashFileNames(){

  return {
    name:'saveHashFileNames',
    generateBundle: async function(OutputOptions, bundle){
      const hashMapFileName = `${outputDir}/hash-file-mapping.js`;
      const hashFileName = Object.keys(bundle)[0]; 
      const fileName     = bundle[hashFileName].facadeModuleId.replace(/.*app\//, '').replace(/\.html$/, '.html.js');
      
      
      globalHashMapping[fileName] = hashFileName;
      const defineSyntax = `define(function () {
                                return ${JSON.stringify(globalHashMapping)};
                            });`
      mkdirSync(outputDir, {recursive:true});
      writeFileSync(hashMapFileName, defineSyntax);
      writeFileSync(`${hashMapFileName}.json`, JSON.stringify(globalHashMapping, null, 4));
    }
  }

}


function removeLineFeeds(options){

    if ( options === void 0 ) options = {};

    return {
      name: 'lineFeed',

      // eslint-disable-next-line no-shadow
      transform: function(text, id) {
        
        if (id.slice(-5) !== '.json') { 
          return null; 
        }
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
    };
}

function beforeFinish(options){

  if ( options === void 0 ) options = {};

  return {
    name: 'beforeFinish',

    // eslint-disable-next-line no-shadow
    transform: async function (text, id) {
      console.log('transform')      
    },
    buildEnd: function (text, id) {
      console.log('buildEnd')      
    },
    writeBundle: async function (text, id) {
      console.log('writeBundle')      
    },
    renderError:()=>{
      console.log('renderError')
    }
  };
}



//Transpile and Expose Vue component to angularJS as AMD module
function exposeVueComponent(relativePath, vueSourceDir) {

    vueSourceDir = `${(vueSourceDir || 'components')}`;
    
    return {
        
      input : path.join(`vue/${(vueSourceDir || 'components')}`, relativePath),
      output: [{
        format   : 'amd', 
        sourcemap: true,
        // file : path.join(outputDir, vueSourceDir, relativePath+'.[hash].js'),
        dir : path.join(outputDir, vueSourceDir, path.dirname(relativePath)),
        name : `${relativePath.replace(/[^a-z0-9]/ig, "_")}.[hash].js`,
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
      }],
      external: externals,
      plugins : [
        vue(),  
        commonjs(),  
        nodeResolve({ browser: true, mainFields: [ 'browser', 'module', 'main' ] }),
        terser(),
        // hash({  dest: `${relativePath.replace(/[^a-z0-9]/ig, "_")}.[hash].js`	})
      ],
    }
}

//Transpile and Expose as UMD non-umd library.
function exposeGlobal(source, name) {

  return {
    input: source,
    output: [{
      file: path.join(outputDir, 'libs/globals', `${name}.js`),
      format : 'umd',
      name: name,
      plugins : [
        getBabelOutputPlugin({
          presets: ['@babel/preset-env'],
          allowAllFormats: true
        }),
        terser()
      ]
    }],
  }
}