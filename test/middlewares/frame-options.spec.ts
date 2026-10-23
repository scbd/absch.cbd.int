import { describe, expect, it } from 'vitest';
import { setFrameOptions } from '../../middlewares/frame-options.js';

function run(url: string, query: Record<string, unknown> = {}) {
  const headers: Record<string, string> = {};
  const res = { setHeader: (name: string, value: string) => { headers[name] = value; } };
  setFrameOptions({ url, query }, res);
  return headers;
}

describe('setFrameOptions', () => {
  it('lets the listed embedders frame ?embed=true pages', () => {
    const headers = run('/en/search?embed=true&schema=meeting', { embed: 'true', schema: 'meeting' });
    expect(headers['Content-Security-Policy']).toBe("frame-ancestors 'self' https://*.cbd.int capacitor://localhost https://localhost");
    // nginx sentinel: iframe-mapping.inc strips ALLOW instead of adding SAMEORIGIN
    expect(headers['X-Frame-Options']).toBe('ALLOW');
  });

  it('covers the pre-redirect URL without a language prefix', () => {
    expect(run('/search?embed=true', { embed: 'true' })['Content-Security-Policy']).toMatch(/^frame-ancestors /);
  });

  it('keeps share/embed pages open to any embedder', () => {
    expect(run('/en/share/embed/chm-document/abc')).toEqual({ 'X-Frame-Options': 'ALLOW' });
    expect(run('/share/embed/chm-document/abc')).toEqual({ 'X-Frame-Options': 'ALLOW' });
  });

  it('leaves non-embed pages untouched so nginx keeps SAMEORIGIN', () => {
    expect(run('/en/search')).toEqual({});
    expect(run('/en/search?embed=false', { embed: 'false' })).toEqual({});
    expect(run('/en/search?embed=1', { embed: '1' })).toEqual({});
    expect(run('/en/register?embedded=true', { embedded: 'true' })).toEqual({});
  });
});
