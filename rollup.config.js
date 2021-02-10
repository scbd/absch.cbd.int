// rollup.config.js (building more than one bundle)
import { terser } from 'rollup-plugin-terser';
import path from 'path'
import vue  from 'rollup-plugin-vue'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

const outputDir = 'dist';

const globals = {
  lodash : '_',
  Vue    : 'Vue',
  vue    : 'Vue',
  ky     : 'ky',
};

export default [
  exposeGlobal('node_modules/ky/index.js', 'ky'),
  exposeVueComponent('test')
];


//Transpile and Expose Vue component to angularJS as AMD module
function exposeVueComponent(relativePath) {

    const vueSourceDir = 'vue/components';

    return {
      input : path.join(vueSourceDir, relativePath+'.vue'),
      output: [{
        format   : 'umd',
        sourcemap: true,
        globals,
        file : path.join(outputDir, 'components', relativePath+'.js'),
        name : relativePath.replace(/[^a-z0-9]/ig, "_"),
      }],
      external: [ ...Object.keys(globals) ],
      plugins : [
        vue(),
        commonjs(),
        nodeResolve({ browser: true, mainFields: [ 'browser', 'module', 'main' ] }),
        terser(),
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

