'use strict';

const minify = require('minify');
const cheerio = require('cheerio');

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

async function minifyFile(file){

    const minifiedResult = await minify(file, minifyOptions);

    return minifiedResult
}

function addLanguageAttribute(content, filePath){
    
    if(/\.html$/.test(filePath)){

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

module.exports = { minifyFile, addLanguageAttribute }