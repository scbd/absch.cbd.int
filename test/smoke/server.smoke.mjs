// Smoke tests run with the built-in node:test runner (not vitest):
//   node --test test/smoke/server.smoke.mjs
// They start the real Express server (server.js) for each clearing-house and
// check the main routes and static assets. The server tests need the rollup
// build output (dist/); they are skipped when it is missing (e.g. CI test job).
import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const pkg = JSON.parse(readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const hasBuild = existsSync(path.join(rootDir, 'dist/en/app/boot.js'));

// Minimal checker for ranges of the form "^a.b.c || >=a.b.c".
function satisfies (version, range) {
  const v = version.replace(/^v/, '').split('.').map(Number);
  const cmp = (a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
  return range.split('||').some(part => {
    const m = part.trim().match(/^(\^|>=)(\d+)\.(\d+)\.(\d+)$/);
    if (!m) throw new Error(`Unsupported engines range part: ${part}`);
    const min = [Number(m[2]), Number(m[3]), Number(m[4])];
    return cmp(v, min) >= 0 && (m[1] === '>=' || v[0] === min[0]);
  });
}

test('Node version satisfies package.json engines.node', () => {
  assert.ok(pkg.engines?.node, 'engines.node must be set');
  assert.ok(satisfies(process.version, pkg.engines.node),
    `${process.version} does not satisfy ${pkg.engines.node}`);
});

test('engines range checker rejects unpatched versions', () => {
  const range = pkg.engines.node;
  for (const v of ['v20.19.0', 'v22.23.3', 'v24.22.0', 'v25.9.0', 'v26.12.0']) { assert.equal(satisfies(v, range), false, v); }
  for (const v of ['v22.23.4', 'v24.22.1', 'v26.12.1', 'v27.0.0']) { assert.equal(satisfies(v, range), true, v); }
});

function freePort () {
  return new Promise((resolve, reject) => {
    const srv = createServer();
    srv.unref();
    srv.on('error', reject);
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });
}

async function startServer (clearingHouse) {
  const port = await freePort();
  const child = spawn(process.execPath, ['server.js'], {
    cwd: rootDir,
    env: {
      PATH: process.env.PATH,
      PORT: String(port),
      CLEARINGHOUSE: clearingHouse,
      CLEARINGHOUSE_HOST: `${clearingHouse}.cbddev.xyz`,
      API_URL: 'https://api.cbddev.xyz',
      ACCOUNTS_URL: 'https://accounts.cbddev.xyz',
      TAG: 'smoke-test'
    },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  const logs = { stdout: '', stderr: '' };
  child.stdout.on('data', d => { logs.stdout += d; });
  child.stderr.on('data', d => { logs.stderr += d; });

  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`server did not start:\n${logs.stdout}${logs.stderr}`)), 20000);
    child.on('exit', code => { clearTimeout(timer); reject(new Error(`server exited (${code}):\n${logs.stdout}${logs.stderr}`)); });
    child.stdout.on('data', () => {
      if (logs.stdout.includes('Server listening on')) { clearTimeout(timer); resolve(); }
    });
  });
  return { child, logs, baseUrl: `http://127.0.0.1:${port}` };
}

const get = (url) => fetch(url, { redirect: 'manual' });

for (const clearingHouse of ['absch', 'bch', 'chm']) {
  describe(`server (${clearingHouse})`, { skip: !hasBuild && 'dist/ not built (run `yarn build`)' }, () => {
    let server;
    before(async () => { server = await startServer(clearingHouse); });
    after(() => server?.child.kill('SIGTERM'));

    test('GET / redirects to a language', async () => {
      const res = await get(`${server.baseUrl}/`);
      assert.equal(res.status, 302);
      assert.equal(res.headers.get('location'), '/en/');
    });

    for (const route of ['/en/', '/fr/', '/en/search']) {
      test(`GET ${route} renders the ${clearingHouse} app shell`, async () => {
        const res = await get(`${server.baseUrl}${route}`);
        assert.equal(res.status, 200);
        assert.match(res.headers.get('content-type'), /text\/html/);
        const html = await res.text();
        assert.match(html, /<title ng-bind="ngMeta\.title">/);
        assert.match(html, /require\(\["boot"\]/);
        assert.match(html, /require\.config\(\{ baseUrl : "\/(en|fr)\/app\/" \}\)/);
      });
    }

    for (const asset of [
      '/en/app/boot.js',
      '/app/css/template.css',
      '/app/img/favicon.png',
      '/app/libs/jquery/dist/jquery.min.js',
      '/widgets.js'
    ]) {
      test(`GET ${asset} serves a static asset`, async () => {
        const res = await get(`${server.baseUrl}${asset}`);
        assert.equal(res.status, 200);
        assert.ok((await res.arrayBuffer()).byteLength > 0);
      });
    }

    test('GET /robots.txt and /version', async () => {
      assert.equal((await get(`${server.baseUrl}/robots.txt`)).status, 200);
      const res = await get(`${server.baseUrl}/version`);
      assert.equal(res.status, 200);
      assert.equal(await res.text(), 'smoke-test');
    });

    test('GET unknown /app/ asset returns 404', async () => {
      assert.equal((await get(`${server.baseUrl}/app/does-not-exist.js`)).status, 404);
    });

    test('server log is clean (no warnings or errors)', () => {
      assert.equal(server.logs.stderr, '');
      assert.doesNotMatch(server.logs.stdout, /warn|error|deprecat/i);
    });
  });
}
