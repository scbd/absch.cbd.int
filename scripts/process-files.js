#!/usr/bin/env node

'use strict';

const glob      = require('glob');
const fs        = require("fs");
const path      = require("path");
const util      = require("util");
const writeFile = util.promisify(fs.writeFile);
const readDir   = util.promisify(fs.readdir);
const stat      = util.promisify(fs.stat);
const asyncGlob = util.promisify(glob)
const _         = require('lodash');
const {transformAndMinifyFile, addLanguageAttribute} = require('./transform-minify.js')
const { open, utimes, copyFile, mkdir } = require('fs').promises;
    const git = require('./git-file-info');
const { parse } = require('path');
const touch = require("touch")

const log = function(...args) {
    console.log(...args);
    process.stdin.pause();
};

const Argv = process.argv;
const folder = Argv.slice(2);
const [In] = folder;

log.error = (e, ...args) => {
    console.error(e, args);
    process.stdin.pause();
};

process.on('uncaughtException', (error) => {
    if (error.code !== 'EPIPE')
        log(error);
});

processFiles();

async function processFiles() {

    const languages = ['ar', 'en', 'fr', 'es', 'ru', 'zh'];
    const appDir = 'app';
    const i18nDir = 'i18n'
    const baseDir = path.resolve('./');


    ///////////////////////////////////////////////////
    ///     copy js files to all language folder i18n
    ///////////////////////////////////////////////////
    await copyFiles(baseDir, appDir, languages, i18nDir, '**/*.js');

    ///////////////////////////////////////////////////
    ///     copy files to en folder i18n
    ///////////////////////////////////////////////////
    await copyFiles(baseDir, appDir, ['en'], i18nDir, '**/*.{html}');

    ///////////////////////////////////////////////////
    ///     touch en
    ///////////////////////////////////////////////////

    const allApplicationFiles = (await asyncGlob('**/*.{js,html,json}', { cwd: path.join(baseDir, appDir) }));
    const enTouchPromise = allApplicationFiles.map(async file=>{
        const modifiedEpoch = await git.getModifiedDate(`app/${file}`, {dst:baseDir});
        const modifiedDate = new Date(Number(modifiedEpoch)* 1000)
        await touch(`${baseDir}/${i18nDir}/en/app/${file}`,  { time : modifiedDate });
    });
    await Promise.all(enTouchPromise);

    // const filePath = 'i18n-new/fr/app/views/about/about.html'
    // const date = await git.getModifiedDate(filePath, {dst:baseDir});
    // await touch(filePath, date);

    return;    

}

async function copyFiles(baseDir, appDir, languages, i18nDir, globPattern) {

    const allApplicationFiles = (await asyncGlob(globPattern, { cwd: path.join(baseDir, appDir) }));

    let copyPromise = [];
    languages.forEach(lang => {

        const langPromises = allApplicationFiles.map(async (file) => {
            const copyToDir = `${baseDir}/${i18nDir}/${lang}/app/${path.dirname(file)}`;
            await mkdir(copyToDir, { recursive: true });
            await copyFile(`${baseDir}/${appDir}/${file}`, `${copyToDir}/${path.basename(file)}`);
        });
        copyPromise = copyPromise.concat(langPromises);
    });
    await Promise.all(copyPromise);
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


// function t (){
//     if (!In)
//         return 'Missing file name';

//     const minifyRegex   =   /\.(js|html|css)$/    
//     const validFolder   =   /\/usr\/tmp\/i18n\/(en|(others\/(ar|es|fr|ru|zh)))\/app/;    
//     const folderFiles   =   await getAllDirectoryFiles(folder[0], {minifyRegex, validFolder}, true)
//     const distFolder    =   folder[1]||folder[0]; //folder[1] if the dist path is provided else copy to self.

//     const tasks = folderFiles.map(async (file) => {
//                     try{
                        
//                         if(file && minifyRegex.test(file) && validFolder.test(file)){
                            
//                             let options = {};
//                             if(/.js$/.test(file)){
//                                 const mapFile = file.replace(/\/app\//, '/sourceMap/app/')
//                                 options = { 
//                                     js:{
//                                         sourceMap:{
//                                             filename: mapFile,
//                                             url: mapFile.replace(/.*\/sourceMap/, '/sourceMap')
//                                         }
//                                     }
//                                 }                                
//                             }
//                             let minifiedResult = await transformAndMinifyFile(file, options);
//                             if(minifiedResult){
//                                 minifiedResult     = addLanguageAttribute(minifiedResult, file)
                                
//                                 const distFile  = file.replace(folder[0], distFolder);
//                                 const dirname   = path.dirname(distFile);

//                                 try{
//                                     await stat(dirname)
//                                 }
//                                 catch(e){
//                                     await mkdir(dirname, {recursive: true});
//                                 }

//                                 await writeFile(distFile, minifiedResult);
//                             }
//                         }
//                         else{
//                             console.log('Ignoring file', file)
//                         }
//                     }
//                     catch(e){
//                         log.error(file, e)
//                     }
                    
//                 });

//     await Promise.all(tasks);

//     console.log('Finished processing files');
//     return;
// }