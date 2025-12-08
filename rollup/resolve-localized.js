// rollup.config.js (building more than one bundle)
import path from 'path'
import upath from 'upath'
import fs from 'fs'
import globToRegExp from 'glob-to-regexp'

export default function resolveLocalized (options = { }) {
  const {
    include,
    baseDir,
    localizedDir
  } = options

  const cwd = process.cwd()
  const baseDirPath = path.join(cwd, baseDir)
  const localizedDirPath = path.join(cwd, localizedDir)
  const basePatternRe = globToRegExp(upath.join(baseDir, include || '**'))

  return {
    name: 'resolveLocalized',

    async resolveId (importeeId, importer) {
      const resolved = await this.resolve(importeeId, importer, { skipSelf: true })

      if (!resolved) {
        console.error(`Could not import file: ${importer} -> ${importeeId}`)
      }

      const { external, id: absolutePath } = resolved || {}

      if (external) return resolved

      const relativeUnixPath = upath.relative(cwd, resolved?.id || '')

      if (basePatternRe.test(relativeUnixPath)) {
        const originalFilePath = absolutePath
        const relativeFilePath = path.relative(baseDirPath, absolutePath)
        const localizedFilePath = path.join(localizedDirPath, relativeFilePath)

        const shouldUse = isUseLocalizedVersion(originalFilePath, localizedFilePath)

        if (shouldUse) {
          return this.resolve(localizedFilePath, importer, { skipSelf: true })
        }
      }

      return null
    }
  }
}

export function isUseLocalizedVersion (oFilePath, lFilePath) {
  if (!fs.existsSync(lFilePath)) return false
  if (!fs.existsSync(oFilePath)) return false

  const lStats = fs.statSync(lFilePath)
  const oStats = fs.statSync(oFilePath)

  if (!lStats.isFile()) return false
  if (!oStats.isFile()) return false

  // For all json file return true to resolve based on text hash
  if (path.extname(oFilePath) === '.json') {
    return true
  }

  return lStats.mtimeMs >= oStats.mtimeMs
}
