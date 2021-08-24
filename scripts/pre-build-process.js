
'use strict';
const glob      = require('glob');
const fs        = require("fs");
const path      = require("path");
const util      = require("util");
const _         = require('lodash');
const touch     = require("touch")
const { rename, copyFile, mkdir, stat, readDir } = require('fs').promises;
const asyncGlob = util.promisify(glob)

const log = function(...args) {
    console.timeLog('preBuildProcess', ...args);
};

log.error = (e, ...args) => {
    console.error(e, args);
    process.stdin.pause();
};

process.on('uncaughtException', (error) => {
    if (error.code !== 'EPIPE')
        log(error);
});

export const processFiles = async (ignoreForRollupFiles) =>{
    console.time('preBuildProcess');

    const git       = require('./scripts/git-file-info');
    const baseDir   = path.resolve('./');
    const languages = ['en'];//['ar', 'en', 'fr', 'es', 'ru', 'zh'];// 
    const enDir     = 'app';
    const i18nDir   = 'i18n';
    const buildDir  = 'i18n-build';

    log('********* Begin pre build process **********')
    ///////////////////////////////////////////////////
    ///     copy i18n files to build dir
    ///////////////////////////////////////////////////
    log('Copying i18n files to build dir')
    const langCopyPromise = languages.map(lang=>{
        return copyFiles(baseDir, `${i18nDir}/${lang}/app`, [lang], buildDir, '**/*.{html,json,vue}');
    });
    await Promise.all(langCopyPromise);
    
    ///////////////////////////////////////////////////
    ///     copy js files to all language folder i18n
    ///////////////////////////////////////////////////
    log('copy js files to all language folder i18n');
    await copyFiles(baseDir, enDir, languages, buildDir, '**/*.js');

    ///////////////////////////////////////////////////
    ///     copy files to en folder i18n
    ///////////////////////////////////////////////////
    log('copy files to en folder i18n');
    await copyFiles(baseDir, enDir, ['en'], buildDir, '**/*.{html,json,ejs}');

    //replace .json file extension  with .json.js
    // await changeJsonToJsExt(baseDir, buildDir);

    ///////////////////////////////////////////////////
    ///     touch en
    ///////////////////////////////////////////////////
    log('Begin touch files');
    var fileModifiedDates = {};
    languages.forEach(e=>{fileModifiedDates[e]={};})
    const allApplicationFiles = (await asyncGlob('**/*.{html,json,ejs}', { cwd: path.join(baseDir, buildDir) }))
    .map(f=>{
        return f.replace(/^(ar|fr|es|ru|zh)\//, `${i18nDir}/$1/`)
        .replace(/^en\//, '')
    });

    log(`Files found to process git touch:`, allApplicationFiles.length);

    const enTouchPromise = allApplicationFiles.map(async file=>{
        // log('starting touch process for ',file)
        const modifiedEpoch = await git.getModifiedDate(`${file}`, {dst:baseDir});
        // log('modifiedEpoch fetched for ',file, modifiedEpoch);
        const modifiedDate = new Date(Number(modifiedEpoch)* 1000);
        const filePath = `${baseDir}/${buildDir}/${file.replace(/i18n\//, '').replace(/^app\//, 'en/app/')}`;
        const langRegex = /\/(ar|en|fr|es|ru|zh)\//;
        const langMatch = filePath.match(langRegex);
        let lang = langMatch[1];

        fileModifiedDates[lang][filePath] = modifiedDate
        await touch(filePath,  { time : modifiedDate });
        // log('Finished touch process for ',file)
    });
    await Promise.all(enTouchPromise);
    log('Finish touching files');

    log('Comparing modified dates');
    const enFileOverridePromises=[];
    languages.filter(e=>e!='en').forEach(async lang=>{
        Object.keys(fileModifiedDates[lang]).forEach(async file=>{
            const enFilePath = file.replace(/\/(ar|en|fr|es|ru|zh)\//, '/en/')
            if(fileModifiedDates['en'][enFilePath] > fileModifiedDates[lang][file]){
                enFileOverridePromises.push(copyFile(enFilePath, file));
            }
        })
    });

    log('Copying new files only available in en folder')
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
    log('Finish overriding files (compare dates)');


    ///////////////////////////////////////////////////
    ///     copy .ejs files to dist folder
    ///////////////////////////////////////////////////
    log('Copying ejs files')
    const ejsCopyPromise = languages.map(lang=>{
        return copyFiles(baseDir, `${buildDir}/${lang}/app`, [lang], 'dist', '**/*.ejs');
    });
    await Promise.all(ejsCopyPromise);
    log('Copying ejs files done!')

    log('********* Finish pre build process **********')
    
    console.timeEnd('preBuildProcess')

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

export async function copyFiles(baseDir, i18nDir, languages, buildDir, globPattern) {

    const allApplicationFiles = (await asyncGlob(globPattern, { cwd: path.join(baseDir, i18nDir) }));

    let copyPromise = [];
    languages.forEach(lang => {

        const langPromises = allApplicationFiles.map(async (file) => {
            const copyToDir = `${baseDir}/${buildDir}/${lang}/app/${path.dirname(file)}`;
            await mkdir(copyToDir, { recursive: true });

            const info = await stat(path.join(baseDir, i18nDir, file))
            if(!info.isDirectory())
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
