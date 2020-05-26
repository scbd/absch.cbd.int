let fs      = require('fs').promises;
let _       = require('lodash');
let url     = require('url');
const minify = require('../scripts/minify')   
var mime = require('mime')


function localMinify(options){

    options = options||{}

    return async function localMinify(req, res, next){

        if(req.host == 'localhost'){
            let requestedUrl = url.parse(req.url).pathname;
            let path = `/app${requestedUrl}`;   

            if(/.(html|js|css)$/.test(path)){
                const result = await minify.minifyFile(global.app.rootPath + path)

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