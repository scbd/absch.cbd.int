
'use strict';

const glob      = require('glob');
const fs        = require("fs");
const path      = require("path");
const util      = require("util");
const writeFile = util.promisify(fs.writeFile);
const readDir   = util.promisify(fs.readdir);
const asyncGlob = util.promisify(glob)
const _         = require('lodash');
const { rename, copyFile, mkdir, stat } = require('fs').promises;
    const git = require('./scripts/git-file-info');
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

// processFiles();

export const processFiles = async () =>{
    const baseDir   = path.resolve('./');
    const languages = ['ar', 'en', 'fr', 'es', 'ru', 'zh'];
    const enDir     = 'app';
    const i18nDir   = 'i18n';
    const buildDir  = 'i18n-build';

    ///////////////////////////////////////////////////
    ///     copy i18n files to build dir
    ///////////////////////////////////////////////////
    const langCopyPromise = languages.map(lang=>{
        return copyFiles(baseDir, `${i18nDir}/${lang}/app`, [lang], buildDir, '**/*.{html,json}');
    });
    await Promise.all(langCopyPromise);

    ///////////////////////////////////////////////////
    ///     copy js files to all language folder i18n
    ///////////////////////////////////////////////////
    await copyFiles(baseDir, enDir, languages, buildDir, '**/*.js');

    ///////////////////////////////////////////////////
    ///     copy files to en folder i18n
    ///////////////////////////////////////////////////
    await copyFiles(baseDir, enDir, ['en'], buildDir, '**/*.{html,json,ejs}');

    //replace .json file extension  with .json.js
    // await changeJsonToJsExt(baseDir, buildDir);

    ///////////////////////////////////////////////////
    ///     touch en
    ///////////////////////////////////////////////////

    var fileModifiedDates = {};
    languages.forEach(e=>{fileModifiedDates[e]={};})
    const allApplicationFiles = (await asyncGlob('**/*.{html,json,ejs}', { cwd: path.join(baseDir, buildDir) }))
    .map(f=>{
        return f.replace(/^(ar|fr|es|ru|zh)\//, `${i18nDir}/$1/`)
        .replace(/^en\//, '')
    });
    // console.log(allApplicationFiles);
    const enTouchPromise = allApplicationFiles.map(async file=>{
        const modifiedEpoch = await git.getModifiedDate(`${file}`, {dst:baseDir});
        const modifiedDate = new Date(Number(modifiedEpoch)* 1000);
        const filePath = `${baseDir}/${buildDir}/${file.replace(/i18n\//, '').replace(/^app\//, 'en/app/')}`;
        const langRegex = /\/(ar|en|fr|es|ru|zh)\//;
        const langMatch = filePath.match(langRegex);
        let lang = langMatch[1];

        fileModifiedDates[lang][filePath] = modifiedDate
        await touch(filePath,  { time : modifiedDate });
        //if json files than update .json.js with same timestamp
        // if(/\.json$/.test(filePath)){
        //     await touch(`${filePath}.js`,  { time : modifiedDate });
        // }
    });
    await Promise.all(enTouchPromise);

    const enFileOverridePromises=[];
    languages.filter(e=>e!='en').forEach(async lang=>{
        Object.keys(fileModifiedDates[lang]).forEach(async file=>{
            const enFilePath = file.replace(/\/(ar|en|fr|es|ru|zh)\//, '/en/')
            if(fileModifiedDates['en'][enFilePath] > fileModifiedDates[lang][file]){
                enFileOverridePromises.push(copyFile(enFilePath, file));
            }
        })
    });

    //if new files are added to en and if translation is not done yet for those files than copy those files over
    Object.keys(fileModifiedDates['en']).forEach(async file=>{
       
        languages.filter(e=>e!='en').forEach(async lang=>{
            const langFile = file.replace('/en/', `/${lang}/`);
            const copyPromise = stat(langFile).catch(async e=>{
                                    return mkdir(path.dirname(langFile), { recursive: true })
                                        .then(e=>copyFile(file, langFile))
                                });

            enFileOverridePromises.push(copyPromise);
        })
    });

    await Promise.all(enFileOverridePromises);


    ///////////////////////////////////////////////////
    ///     copy .ejs files to dist folder
    ///////////////////////////////////////////////////
    console.debug('Copying ejs files')
    const ejsCopyPromise = languages.map(lang=>{
        return copyFiles(baseDir, `${buildDir}/${lang}/app`, [lang], 'dist', '**/*.ejs');
    });
    await Promise.all(ejsCopyPromise);
    console.debug('Copying ejs files done!')

    console.log('*********FINISH**********')
    // const filePath = 'i18n-new/fr/app/views/about/about.html'
    // const date = await git.getModifiedDate(filePath, {dst:baseDir});
    // await touch(filePath, date);

    return;    

}

async function changeJsonToJsExt(baseDir, buildDir) {
    const allApplicationJsonFiles = (await asyncGlob('**/*.json', { cwd: buildDir }));

    const jsonToJsPromise = allApplicationJsonFiles.map(async (file) => {
        const copyToDir = `${baseDir}/${buildDir}/${path.dirname(file)}`;      
        await rename(`${baseDir}/${buildDir}/${file}`, `${copyToDir}/${path.basename(file)}.js`);
    });
    await Promise.all(jsonToJsPromise);
}

async function copyFiles(baseDir, i18nDir, languages, buildDir, globPattern) {

    const allApplicationFiles = (await asyncGlob(globPattern, { cwd: path.join(baseDir, i18nDir) }));

    let copyPromise = [];
    languages.forEach(lang => {

        const langPromises = allApplicationFiles.map(async (file) => {
            const copyToDir = `${baseDir}/${buildDir}/${lang}/app/${path.dirname(file)}`;
            await mkdir(copyToDir, { recursive: true });
            await copyFile(`${baseDir}/${i18nDir}/${file}`, `${copyToDir}/${path.basename(file)}`);
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

// module.exports = {processFiles}

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