#!/usr/bin/env node

'use strict';

const fs        = require("fs");
const path      = require("path");
const util      = require("util");
const writeFile = util.promisify(fs.writeFile);
const readDir   = util.promisify(fs.readdir);
const stat      = util.promisify(fs.stat);
const _         = require('lodash');
const minification = require('./minify')

const log = function(...args) {
    console.log(...args);
    process.stdin.pause();
};

const Argv = process.argv;
const folder = Argv.slice(2);
const [In] = folder;

log.error = (e) => {
    console.error(e);
    process.stdin.pause();
};

process.on('uncaughtException', (error) => {
    if (error.code !== 'EPIPE')
        log(error);
});

processFiles();

async function processFiles() {

    if (!In)
        return 'Missing file name';

    const minifyRegex   =   /\.(js|html|css)$/    
    const validFolder   =   /\/usr\/tmp\/i18n\/(en|(others\/(ar|es|fr|ru|zh)))\/app/    
    const folderFiles   =   await getAllDirectoryFiles(folder[0], {minifyRegex, validFolder}, true)
   
    const tasks = folderFiles.map(async (file) => {
                    try{
                        
                        if(file && minifyRegex.test(file) && validFolder.test(file)){
                            
                            let options = {};
                            if(/.js$/.test(file)){
                                const mapFile = file.replace(/\/app\//, '/sourceMap/app/')
                                options = { 
                                    js:{
                                        sourceMap:{
                                            filename: mapFile,
                                            url: mapFile.replace(/.*\/sourceMap/, '/sourceMap')
                                        }
                                    }
                                }                                
                            }
                            let minifiedResult = await minification.minifyFile(file, options);
                            minifiedResult     = minification.addLanguageAttribute(minifiedResult, file)
                            await writeFile(file, minifiedResult);

                        }
                        else{
                            console.log('Ignoring file', file)
                        }
                    }
                    catch(e){
                        log.error(e)
                    }
                });

    await Promise.all(tasks);

    console.log('Finished processing files');
    return;

}

async function getAllDirectoryFiles(dir, options){
    options = options || {};

    let fileList = [];
    const files  = await readDir(dir)

    await Promise.all(files.map(async file=>{
        try{
            const filePath = path.join(dir, file);
            const info = await stat(filePath)
            if(info.isDirectory()){
                const subDirFiles = await getAllDirectoryFiles(filePath, options);
                fileList = _.union(fileList, subDirFiles);
            }
            else if(filePath && options.validFolder.test(filePath) && options.minifyRegex.test(filePath)){
                fileList.push(filePath)
            }
        }
        catch(e){
            console.log(e, file)
        }
    }))
    return fileList;

}
