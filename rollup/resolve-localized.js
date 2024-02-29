// rollup.config.js (building more than one bundle)
import path from 'path'
import fs from 'fs'
import _ from 'lodash'
import globToRegExp from 'glob-to-regexp';


export default function resolveLocalized(options = { }) {

  const {
    include,
    baseDir,
    localizedDir,
  } = options;

  const basePatternRe = globToRegExp(path.join(baseDir, include || '**'));

  return {
    name: 'resolveLocalized',

    async resolveId(importeeId, importer) {

      const resolved = await this.resolve(importeeId, importer, { skipSelf: true });

      const { external, id: absolutePath }  = resolved;

      if(external) return resolved;
      
      if (basePatternRe.test(absolutePath)) {

        const relativeFilePath = path.relative(baseDir, absolutePath);
        const originalFilePath = absolutePath;
        const localizedFilePath = path.join(localizedDir, relativeFilePath);

        let shouldUse = isUseLocalizedVersion(originalFilePath, localizedFilePath);

        if (shouldUse) {
          return this.resolve(localizedFilePath, importer, { skipSelf: true });
        }
      }

      return null;
    },
  };

}

export function isUseLocalizedVersion(oFilePath, lFilePath) {

  if (!fs.existsSync(lFilePath)) return false;
  if (!fs.existsSync(oFilePath)) return false;

  const lStats = fs.statSync(lFilePath);
  const oStats = fs.statSync(oFilePath);

  if (!lStats.isFile()) return false;
  if (!oStats.isFile()) return false;

  return lStats.mtimeMs >= oStats.mtimeMs;
}
