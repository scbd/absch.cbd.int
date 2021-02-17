let fs      = require('fs').promises;
let _       = require('lodash');
let url     = require('url'); 
var mime = require('mime');
const {transformAndMinifyFile} = require('../scripts/transform-minify')  


function localMinify(options){

    options = options||{}

    return async function localMinify(req, res, next){

        if(req.host == 'localhost'){
            let requestedUrl = url.parse(req.url).pathname;
            let path = `/app${requestedUrl}`;   

            if(/.(html|js|css)$/.test(path)){
                let options = {};
                let filePath = global.app.rootPath + path;
                if(/.js$/.test(path)){
                    options = { 
                        js:{
                            sourceMap:{
                                filename: `${global.app.rootPath}/sourceMap${path}.map`,
                                url: `/sourceMap${path}.map`
                            }
                        }
                    }
                }
                const result = await transformAndMinifyFile(filePath, options)

                var type = mime.lookup(path)             
                var charset = mime.charsets.lookup(type)
                res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''))
                res.setHeader('Content-Length', Buffer.byteLength(result))

                res.status(200).send(result)

                return;

            }
        }
        
        next();
    }

}

module.exports = localMinify;