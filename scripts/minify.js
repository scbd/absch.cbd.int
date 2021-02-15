'use strict';

const minify    = require('minify');
const cheerio   = require('cheerio');
const _         = require('lodash');
const terser = require('terser');
const {readFile, writeFile, mkdir} = require('fs').promises;
const path = require('path');

const minifyOptions = {
    html: {
        removeAttributeQuotes: false,
        removeComments: true,
        minifyJS:false
    },
    css: {
        compatibility: '*',
    },
    js: {
        ecma: 5,
        mangle:false
    },
    img: {
        maxSize: 4096,
    }
}

async function minifyFile(file, options){
    options = options || {};
    let newOptions = _.defaultsDeep({...options}, minifyOptions)

    if(/\.js/.test(file)){
        //special case for JS, since the lib does not generate map files (even not return the map data)
        //minfy and generate map file locally
        const data = await readFile(file, 'utf8');

        const { error, code, map } = await terser.minify(data, options.js);

        if (error){
            console.log('Error minifying file', file)
            throw error;
        }

        if(options.js.sourceMap && map){
            try {
                await createDir(options.js.sourceMap.filename)
                await writeFile(options.js.sourceMap.filename, map, 'utf8')
            } catch (error) {
                console.log('error writing js map file', error)
            }
        }

        return code;
    }

    const minifiedResult = await minify(file, newOptions);

    return minifiedResult
}

function addLanguageAttribute(content, filePath){
    
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

        return  $html('.my-lang-selector').html();
    }

    return content;
}


const createDir = async (filePath)=>{
    const dirName = path.dirname(filePath);
    await mkdir(dirName, {recursive:true});   
}
module.exports = { minifyFile, addLanguageAttribute }
