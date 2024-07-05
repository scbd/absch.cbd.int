// rollup.config.js (building more than one bundle)
import path from 'path'
import upath from 'upath'
import fs from 'fs'
import _ from 'lodash'
import globToRegExp from 'glob-to-regexp';
import crypto       from 'crypto';

const mappings = {};

export default function mergeI18n(options = {}) {

  const {
    include,
    baseDir,
    localizedDir,
    defaultLocale,
    locale
  } = options;

  const cwd = process.cwd();
  const baseDirPath        = path.join(cwd, baseDir);
  const localizedDirPath   = path.join(cwd, localizedDir);
  const basePatternRe      = globToRegExp(upath.join(baseDir,      include || '**'));
  const localizedPatternRe = globToRegExp(upath.join(localizedDir, include || '**'));


  return {
    name: 'i18nMessageMerger',

    transform(code, id) {

      let relativeFilePath = null;

      const relativeUnixPath = upath.relative(cwd, id);

      if(!relativeFilePath && localizedPatternRe.test(relativeUnixPath)) relativeFilePath = path.relative(localizedDirPath, id);
      if(!relativeFilePath && basePatternRe     .test(relativeUnixPath)) relativeFilePath = path.relative(baseDirPath, id);

      if(!relativeFilePath) return null;

      const localizedMessages = JSON.parse(code.trim());

      const output = { 
        [locale]: localizedMessages
      };

      if(locale!=defaultLocale) {
        const baseFilePath = path.join(baseDirPath, relativeFilePath);

        let baseMessages = {};

        if (id!=baseFilePath && fs.existsSync(baseFilePath)) {
          const baseData = fs.readFileSync(baseFilePath, { encoding: "utf8" });
          
          baseMessages = JSON.parse(baseData.trim());
        }

        output[defaultLocale] = compareKeyHashes(baseMessages, localizedMessages);
      }

      code = JSON.stringify(output);

      return { code, map: this.getCombinedSourcemap() };
    }
  };
}

// Remove from existing & valid keys in the localizedVersion from the base version; 
function compareKeyHashes(baseMessages, localizedMessages) {

  baseMessages = { ...baseMessages }; // copy

  const meta = localizedMessages['#meta']
  if(meta?.hashes){
    delete localizedMessages['#meta'];

    Object.entries(localizedMessages).filter(([, value]) => !!value)
      .forEach(([key]) => {
        
          //if the key has hash only then continue with locale else use english
          if(baseMessages[key] && meta.hashes[key]){
            let enHash;
            const enText = baseMessages[key];
            
            if(meta.algorithm =='md5'){
              enHash = crypto.createHash('md5').update(enText).digest("hex");
            }

            //if locale hash matches the english text has then use locale text else english
            if(enHash?.length && meta.hashes[key] == enHash){
              delete baseMessages[key];
            }
            else{
              delete localizedMessages[key];
            }
          }
      });
  }

  Object.entries(localizedMessages).filter(([, value]) => !!value).forEach(([key]) => {
    delete baseMessages[key];
  });

  return baseMessages;
}
