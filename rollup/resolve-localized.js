// rollup.config.js (building more than one bundle)
import path from 'path'
import fs   from 'fs'
import _    from 'lodash'

const mappings = {};

export default function resolveLocalized(options = {}) {

  const { 
    baseDir,
    localizedDir 
  } = options;
  
  return {
    name: 'loadLocalized',

    resolveId(importeeId, importer) {

      if(importeeId.indexOf(baseDir)==0) {

        const relativeFilePath = path.relative(baseDir, importeeId);
        const originalFilePath  = importeeId;
        const localizedFilePath = path.join(localizedDir, relativeFilePath);

        const shouldUse = isUseLocalizedVersion(originalFilePath, localizedFilePath);
        
        if(path.extname(originalFilePath) == '.json' && fs.existsSync(originalFilePath))
          mappings[localizedFilePath] = originalFilePath;
       
       if(shouldUse) {
         return this.resolve(localizedFilePath, importer, { skipSelf: true });
       }
     }

     return null;
    },
    transform(code, id) {

      if(mappings[id]) {
        
        const enFileData   = fs.readFileSync(mappings[id], {encoding:"utf8"});

        let enJson       = JSON.parse(enFileData.trim());
        let languageJson = JSON.parse(code.trim());

        languageJson = copyProps(languageJson, enJson);
        
        code = JSON.stringify(languageJson);
      }

      return { code, map: this.getCombinedSourcemap() };

    }
  };

}

function isUseLocalizedVersion(oFilePath, lFilePath) {

  if(!fs.existsSync(lFilePath)) return false;
  if(!fs.existsSync(oFilePath)) return false;

  const lStats = fs.statSync(lFilePath);
  const oStats = fs.statSync(oFilePath);

  if(!lStats.isFile()) return false;
  if(!oStats.isFile()) return false;

  return lStats.mtimeMs >= oStats.mtimeMs;
}

function copyProps(languageProps, enProps){

  for (const languageProp in languageProps) {
      if (Object.hasOwnProperty.call(languageProps, languageProp)) {
          const languageVal = languageProps[languageProp];
          const enVal       = enProps[languageProp];
          
          if(languageVal == "")
              languageProps[languageProp] = enVal;
          else if(_.isArray(languageVal) || _.isObject(enVal))
              languageProps[languageProp] = copyProps(languageVal, enVal);
      }
  }

  return languageProps;
}