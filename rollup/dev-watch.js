/**
 * dev-watch.js — type-gated development watcher
 *
 * Runs `vue-tsc --watch` and `rollup --watch` as a single orchestrated process:
 *
 *   1. vue-tsc starts first. Rollup is held until the initial type-check passes.
 *   2. On every save, vue-tsc recompiles:
 *        - "Found 0 errors"  → rollup starts (or stays running)
 *        - "Found N errors"  → rollup is killed; type errors are printed in red
 *   3. Ctrl-C shuts down both child processes cleanly.
 *
 * Invoked by `npm run dev` — do not run directly while the dev script is running.
 *
 * Why --preserveWatchOutput?
 *   vue-tsc clears the terminal between recompiles by default. That clears rollup
 *   output too. --preserveWatchOutput keeps all output in the scroll buffer.
 */

import { spawn } from 'node:child_process'
import { watch } from 'node:fs'
import { resolve } from 'node:path'
import { WebSocketServer } from 'ws'

const RED   = '\x1b[31m'
const DIM   = '\x1b[2m'
const RESET = '\x1b[0m'

// ── Error overlay WebSocket server ─────────────────────────────────────────
// Pushes current TS errors to the in-browser overlay client on change.
const OVERLAY_PORT = 35730
let currentErrors = []

// @ts-expect-error — ws is a transitive dep with no @types installed
const wss = new WebSocketServer({ port: OVERLAY_PORT, path: '/dev-errors' })

function broadcast (errors) {
  const msg = JSON.stringify(errors)
  wss.clients.forEach(client => {
    if (client.readyState === 1) client.send(msg)
  })
}

// Send current state to each new connection immediately.
wss.on('connection', client => {
  if (client.readyState === 1) client.send(JSON.stringify(currentErrors))
})
// ───────────────────────────────────────────────────────────────────────────

let rollupProc = null
let tscClean = false
let lintClean = true

function startRollup () {
  if (rollupProc || !tscClean || !lintClean) return
  process.stdout.write(DIM + '[rollup] starting build...' + RESET + '\n')
  rollupProc = spawn('npx', ['rollup', '--strictDeprecations', '-c', '--watch'], { stdio: 'inherit' })
  rollupProc.on('close', () => { rollupProc = null })
}

function stopRollup (reason) {
  if (!rollupProc) return
  process.stdout.write(RED + '[rollup] stopped — ' + reason + RESET + '\n')
  rollupProc.kill('SIGTERM')
  rollupProc = null
}

// Pipe tsc output so we can inspect each line. --preserveWatchOutput prevents
// vue-tsc from sending ANSI clear-screen codes that break line buffering.
const tsc = spawn('npx', ['vue-tsc', '--noEmit', '--watch', '--preserveWatchOutput'], {
  stdio: ['inherit', 'pipe', 'pipe']
})

// Buffer incomplete lines across chunks so we never split a "Found N errors" match.
let buf = ''
function flush (chunk) {
  buf += chunk.toString()
  const lines = buf.split('\n')
  buf = lines.pop() ?? ''
  for (const line of lines) {
    // Print the line, coloring type error lines red.
    process.stdout.write((/: error TS/.test(line) ? RED + line + RESET : line) + '\n')
    // "Found N errors. Watching…" is the signal vue-tsc emits after each pass.
    const m = line.match(/Found (\d+) error/)
    if (m) {
      if (parseInt(m[1], 10) === 0) { tscClean = true; currentErrors = []; broadcast([]); startRollup() }
      else { tscClean = false; stopRollup('fix type errors first'); broadcast(currentErrors) }
    }
    if (/: error TS/.test(line)) currentErrors.push(line)
  }
}

tsc.stdout.on('data', flush)
tsc.stderr.on('data', flush)
tsc.on('close', () => {
  if (buf) process.stdout.write(buf + '\n')
  stopRollup('tsc exited')
})

// Debounced eslint --fix on any changed .vue / .ts file under app/
const lintTimers = new Map()
watch(resolve('app'), { recursive: true }, (_, filename) => {
  if (!filename || !/\.(vue|ts)$/.test(filename)) return
  clearTimeout(lintTimers.get(filename))
  lintTimers.set(filename, setTimeout(() => {
    lintTimers.delete(filename)
    const eslint = spawn('npx', ['eslint', '--fix', resolve('app', filename)], {
      stdio: ['inherit', 'pipe', 'pipe'],
      env: { ...process.env, NODE_ENV: 'development' }
    })
    function flushEslint (chunk) {
      for (const line of chunk.toString().split('\n')) {
        if (!line.trim() || line.includes('npm warn')) continue
        process.stdout.write(RED + '[eslint] ' + RESET + line + '\n')
      }
    }
    eslint.stdout.on('data', flushEslint)
    eslint.stderr.on('data', flushEslint)
    eslint.on('close', code => {
      if (code === 0) { lintClean = true; startRollup() }
      else { lintClean = false; stopRollup('fix lint errors first') }
    })
  }, 300))
})

process.on('SIGINT', () => {
  tsc.kill('SIGINT')
  rollupProc?.kill('SIGINT')
  process.exit(0)
})
