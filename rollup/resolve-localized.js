// rollup.config.js (building more than one bundle)
import path from 'path'
import fs   from 'fs'

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
        
        if(shouldUse) {
          return this.resolve(localizedFilePath, importer, { skipSelf: true });
        }
      }

      return null;
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