// rollup.config.js (building more than one bundle)
import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import globToRegExp from 'glob-to-regexp';

const mappings = {};

export default function mergeI18n(options = {}) {

  const {
    include,
    baseDir,
    localizedDir,
    defaultLocale,
    locale
  } = options;

  const basePatternRe      = globToRegExp(path.join(baseDir,      include || '**'));
  const localizedPatternRe = globToRegExp(path.join(localizedDir, include || '**'));


  return {
    name: 'i18nMessageMerger',

    transform(code, id) {

      let relativeFilePath = null;

      if(!relativeFilePath && localizedPatternRe.test(id)) relativeFilePath = path.relative(localizedDir, id);
      if(!relativeFilePath && basePatternRe     .test(id)) relativeFilePath = path.relative(baseDir, id);

      if(!relativeFilePath) return null;

      const localizedMessages = JSON.parse(code.trim());

      const output = { 
        [locale]: localizedMessages
      };

      if(locale!=defaultLocale) {
        const baseFilePath = path.join(baseDir, relativeFilePath);

        let baseMessages = {};

        if (id!=baseFilePath && fs.existsSync(baseFilePath)) {
          const baseData = fs.readFileSync(baseFilePath, { encoding: "utf8" });
          
          baseMessages = JSON.parse(baseData.trim());
        }

        output[defaultLocale] = cleanupExistingKeys(baseMessages, localizedMessages);
      }

      code = JSON.stringify(output);

      return { code, map: this.getCombinedSourcemap() };
    }
  };
}

// Remove from existing & valid keys in the localizedVersion from the base version; 
function cleanupExistingKeys(baseMessages, localizedMessages) {

  baseMessages = { ...baseMessages }; // copy

  Object.entries(localizedMessages).filter(([, value]) => !!value).forEach(([key]) => {
    delete baseMessages[key];
  });

  return baseMessages;
}
