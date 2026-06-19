#!/usr/bin/env node
// Runs vue-tsc --noEmit --watch and colors lines matching `: error TS` in red.
const { spawn } = require('node:child_process')

const RED   = '\x1b[31m'
const RESET = '\x1b[0m'

const proc = spawn('npx', ['vue-tsc', '--noEmit', '--watch'], { stdio: ['inherit', 'pipe', 'pipe'] })

let buf = ''
function flush (chunk) {
  buf += chunk.toString()
  const lines = buf.split('\n')
  buf = lines.pop() ?? ''
  for (const line of lines) {
    process.stdout.write((/: error TS/.test(line) ? RED + line + RESET : line) + '\n')
  }
}

proc.stdout.on('data', flush)
proc.stderr.on('data', flush)
proc.on('close', () => { if (buf) process.stdout.write(buf + '\n') })
