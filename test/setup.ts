// app/api/api-base.js reads window.scbdApp.apiUrl at import time; the
// browser gets this from a server-rendered template (see app/templates/*/index.ejs).
globalThis.window ??= {};
globalThis.window.scbdApp ??= { apiUrl: 'https://test.cbd.int/' };
