/**
 * dev-watch.js — type-gated development watcher
 *
 * Runs `vue-tsc --watch`, an initial ESLint scan, and `rollup --watch` as a
 * single orchestrated process:
 *
 *   1. vue-tsc and ESLint both start immediately (in parallel).
 *      Rollup is held until BOTH the initial type-check AND the initial
 *      lint scan pass.
 *   2. On every save, vue-tsc recompiles:
 *        - "Found 0 errors"  → rollup starts (or stays running)
 *        - "Found N errors"  → rollup is killed; type errors are printed in red
 *   3. On every save, eslint --fix runs on the changed file. Rollup is blocked
 *      until ALL previously-errored files are clean (tracked per-file via a Set).
 *   4. Ctrl-C shuts down both child processes cleanly.
 *
 * Invoked by `npm run dev` — do not run directly while the dev script is running.
 *
 * Why --preserveWatchOutput?
 *   vue-tsc clears the terminal between recompiles by default. That clears rollup
 *   output too. --preserveWatchOutput keeps all output in the scroll buffer.
 */

import { spawn } from 'node:child_process'
import { watch } from 'node:fs'
import { resolve, relative } from 'node:path'
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
let lintBooted = false          // true once the initial full-project lint scan finishes
const lintErrors = new Set()    // tracks files with outstanding lint errors

function startRollup () {
  if (rollupProc || !tscClean || !lintBooted || lintErrors.size > 0) return
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

// ── Initial full-project ESLint scan ───────────────────────────────────────
// Runs once at startup (in parallel with tsc) and seeds lintErrors so Rollup
// is blocked until the project is already lint-clean when the watch begins.
// Uses --format json to get per-file error info without --fix side-effects.
function runInitialLint () {
  process.stdout.write(DIM + '[eslint] scanning...' + RESET + '\n')
  let out = ''
  const eslint = spawn(
    'npx', ['eslint', 'app/', '--format', 'json', '--max-warnings=0'],
    { stdio: ['inherit', 'pipe', 'pipe'], env: { ...process.env, NODE_ENV: 'development' } }
  )
  eslint.stdout.on('data', d => { out += d })
  eslint.stderr.on('data', d => {
    for (const line of d.toString().split('\n')) {
      if (line.trim() && !line.includes('npm warn')) {
        process.stdout.write(RED + '[eslint] ' + RESET + line + '\n')
      }
    }
  })
  eslint.on('close', code => {
    lintBooted = true
    if (code === 0) {
      process.stdout.write(DIM + '[eslint] clean' + RESET + '\n')
      startRollup()
      return
    }
    try {
      const results = JSON.parse(out)
      for (const r of results) {
        if (r.errorCount === 0 && r.warningCount === 0) continue
        const rel = relative(resolve('app'), r.filePath)
        lintErrors.add(rel)
        for (const m of r.messages) {
          const sev = m.severity === 2 ? RED + 'error' + RESET : '\x1b[33mwarning\x1b[0m'
          process.stdout.write(
            `${RED}[eslint]${RESET} ${rel}:${m.line}:${m.column}  ${sev}  ${m.message}  ${DIM}${m.ruleId ?? ''}${RESET}\n`
          )
        }
      }
    } catch {
      process.stdout.write(out)
    }
    stopRollup('fix lint errors first')
  })
}

runInitialLint()
// ───────────────────────────────────────────────────────────────────────────

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
    const abs = resolve('app', filename)
    const eslint = spawn('npx', ['eslint', '--fix', abs], {
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
      if (code === 0) { lintErrors.delete(filename); startRollup() }
      else { lintErrors.add(filename); stopRollup('fix lint errors first') }
    })
  }, 300))
})

process.on('SIGINT', () => {
  tsc.kill('SIGINT')
  rollupProc?.kill('SIGINT')
  process.exit(0)
})
