// rollup.config.js (building more than one bundle)
import path                     from 'path'
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import alias                    from '@rollup/plugin-alias';
import nodeResolve              from '@rollup/plugin-node-resolve'
import json                     from '@rollup/plugin-json';
import commonjs                 from '@rollup/plugin-commonjs';
import dynamicImportVariables   from '@rollup/plugin-dynamic-import-vars';
import vue                      from 'rollup-plugin-vue';
import copy                     from 'rollup-plugin-copy';
import { string }               from "rollup-plugin-string";
import terser                   from '@rollup/plugin-terser';
import bootWebApp, { cdnUrl }   from './app/boot.js';
import injectCssToDom           from './rollup/inject-css-to-dom.js';
import resolveLocalized         from './rollup/resolve-localized.js';
import stripBom                 from './rollup/strip-bom.js';
import mergeI18n                from './rollup/merge-i18n.js'

const isWatchOn = process.argv.includes('--watch');
const outputDir = 'dist';

let externals = [
  'require', 
  'libs/ammap3/ammap/ammap',
  'shim!libs/ammap3/ammap/themes/light[libs/ammap3/ammap/ammap]',
  'https://cdn.slaask.com/chat.js',
];

export default async function(){
  
  externals = [...externals, ...await loadExternals()];

  const locales = isWatchOn ? ['en']//, 'fr']
                            : ['en', 'es', 'fr', 'ar', 'ru', 'zh'];
  
  return[
          simpleBundle('assets/widgets.js', 'en'),
          simpleBundle('assets/legacy-ajax-plugin.js', 'en'),
          ...locales.map(locale => bundle('boot.js', locale))
        ];
}

function bundle(entryPoint, locale, baseDir='app') {

  const entryPointPath = path.join(baseDir||'', entryPoint);
  const targetDir      = path.join(`${outputDir}/${locale}/${baseDir}`, path.dirname(entryPoint));

  return {
    input : entryPointPath,
    output: [{
      format   : 'amd',
      sourcemap: true,
      dir : targetDir,
      name : entryPoint.replace(/[^a-z0-9]/ig, "_"),
      exports: 'named'
    }],
    external: externals,
    plugins : [
      alias({ entries : [
        { find: /^(..\/)+(.*)\.json$/,   replacement:`${process.cwd()}/${baseDir}/$2.json` },
        { find: /^~\/(.*)/,   replacement:`${process.cwd()}/${baseDir}/$1` },
        { find: /^json!(.*)/, replacement:`$1` },
        { find: /^text!(.*)/, replacement:`$1` },
        { find: /^cdn!(.*)/,  replacement:`${cdnUrl}$1` },
      ]}),
      stripBom(),
      resolveLocalized({ 
        baseDir:      path.join(baseDir),
        localizedDir: path.join('i18n', locale, baseDir),
      }),
      mergeI18n({ 
        include:      `**/*.json`,
        baseDir:      path.join(baseDir, 'app-text'),
        localizedDir: path.join('i18n', locale, baseDir, 'app-text'),
        defaultLocale: 'en',
        locale
      }),
      copy({
        verbose: true,
        flatten: false,
        copyOnce: isWatchOn,
        targets: [{
          src: [
            `${baseDir}/**/*.ejs`, 
            // `${baseDir}/**/*.css`, 
            // `${baseDir}/**/*.jpeg`, 
            // `${baseDir}/**/*.jpg`, 
            // `${baseDir}/**/*.png`, 
            // `${baseDir}/**/*.svg`, 
          ], 
          dest: path.join(targetDir) 
        }]
      }),
      string({ include: "**/*.html" }),
      json({ namedExports: true }),
      vue(),
      injectCssToDom(),
      dynamicImportVariables({ include:`${baseDir}/**/*.js` }),
      commonjs({ include: 'node_modules/**/*.js'}),
      nodeResolve({ browser: true, mainFields: [ 'browser', 'module', 'main' ] }),
      isWatchOn ? null : getBabelOutputPlugin({
        presets: [['@babel/preset-env', { targets: "> 0.25%, IE 10, not dead"} ], { plugins: ['@babel/plugin-transform-private-methods'] }],
        plugins: ['@babel/plugin-proposal-class-properties'],
        allowAllFormats: true
      }),
      isWatchOn ? null : terser({ mangle: false }) // DISABLE IN DEV
    ]
  }
}

function simpleBundle(entryPoint, locale, baseDir='app') {

  const entryPointPath = path.join(baseDir||'', entryPoint);
  const targetDir      = path.join(`${outputDir}/${locale}/${baseDir}`, path.dirname(entryPoint));

  return {
    input : entryPointPath,
    output: [{
      format   : 'iife',
      sourcemap: true,
      dir : targetDir,
      name : entryPoint.replace(/[^a-z0-9]/ig, "_"),
      exports: 'named'
    }],
    plugins : [,
      getBabelOutputPlugin({
        presets: [['@babel/preset-env', { targets: "> 0.25%, IE 10, not dead"}]],
        allowAllFormats: true
      }),
      isWatchOn ? null : terser({ mangle: false }) // DISABLE IN DEV
    ]
  }
}

async function loadExternals() {

  const externals = [];

  //Define requireJS configuration (define() + config.paths ) as externals

  // Shim dependencies 
  const window     = { 
    location : { pathname: '/' },
    scbdApp  : { host: '' },
    alert    : () => {}
  }; 

  const defineJs   = (module) => { if(typeof(module)==='string') externals.push(module) };
  const requireJs  = ( )      => { };
  requireJs.config = (config) => { 
    const modules = [
      ...Object.keys(config.paths || {}),
      ...(config.packages || []).map(p=>p.name)
    ]
    modules.forEach(defineJs)
  }

  bootWebApp(window, requireJs, defineJs);

  return externals;
}