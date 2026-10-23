// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const source = readFileSync(path.resolve(import.meta.dirname, '../../app/assets/widgets.js'), 'utf8');

const placeholder = (origin: string) =>
    `<div class="scbd-chm-embed" data-url="${origin}/en/share/embed/x?q=1"></div>`;

// Run widgets.js as a classic script element (no eval), as if loaded from `scriptSrc`.
function runWidgets(dom: JSDOM, scriptSrc: string) {
    const { window } = dom;
    Object.defineProperty(window.document, 'currentScript', { value: { src: scriptSrc }, configurable: true });
    const el = window.document.createElement('script');
    el.textContent = source;
    window.document.body.appendChild(el);
}

const ready = (dom: JSDOM) => new Promise<void>(resolve => {
    if (dom.window.document.readyState === 'complete') return resolve();
    dom.window.addEventListener('load', () => setTimeout(resolve, 0));
});

describe('widgets.js', () => {
    it('routes each provider placeholder to its own origin with one message listener', async () => {
        const chm = 'https://chm.cbd.int';
        const absch = 'https://absch.cbd.int';
        const dom = new JSDOM(`<body>${placeholder(chm)}${placeholder(absch)}</body>`, { runScripts: 'dangerously', url: 'https://example.org/' });
        let listeners = 0;
        const add = dom.window.addEventListener.bind(dom.window);
        dom.window.addEventListener = ((type: string, ...rest: any[]) => { if (type === 'message') listeners++; return (add as any)(type, ...rest); }) as any;

        runWidgets(dom, `${chm}/widgets.js`);
        runWidgets(dom, `${absch}/widgets.js`);

        await ready(dom);
        const srcs = [...dom.window.document.querySelectorAll('iframe')].map(f => new URL(f.src).origin);
        expect(srcs).toEqual([chm, absch]);
        expect(listeners).toBe(1);

        // a second execution (article revisit) processes new markup with its own origin
        dom.window.document.body.innerHTML = placeholder(absch);
        runWidgets(dom, `${absch}/widgets.js`);
        await ready(dom);
        expect(new URL(dom.window.document.querySelector('iframe')!.src).origin).toBe(absch);
        expect(listeners).toBe(1);
    });

    it('does not leak helpers as page globals', () => {
        const dom = new JSDOM('<body></body>', { runScripts: 'dangerously', url: 'https://example.org/' });
        runWidgets(dom, 'https://chm.cbd.int/widgets.js');
        expect((dom.window as any).initWidget).toBeUndefined();
        expect((dom.window as any).onReady).toBeUndefined();
    });

    it('refuses untrusted data-url origins and non-https providers', async () => {
        // the http:// fixture is intentional: non-https providers must be refused
        const dom = new JSDOM(`<body>${placeholder('https://cbd.int.evil.com')}${placeholder('http://chm.cbd.int')}</body>`, { runScripts: 'dangerously', url: 'https://example.org/' });
        runWidgets(dom, 'https://chm.cbd.int/widgets.js');
        await ready(dom);
        const srcs = [...dom.window.document.querySelectorAll('iframe')].map(f => f.src);
        expect(srcs.every(s => s.startsWith('https://chm.cbd.int/app/assets/param-missing.html'))).toBe(true);
    });
});
