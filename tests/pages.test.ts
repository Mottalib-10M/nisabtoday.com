/**
 * Content tests (CONTRIBUTING-PAGES.md): every guide file, in English and in Arabic. Run a few files:
 *   PAGE_FILES=nisab,zakat-on-gold npx vitest run tests/pages.test.ts
 * Writes .cache-raw/page-texts.json, read by `python3 scripts/sim-pages.py` (similarity, like check-unique).
 */
import { describe, expect, it } from 'vitest';
import { writeFileSync, mkdirSync } from 'node:fs';
import { GUIDES } from '../src/lib/pages';
import { helpers, SOURCES } from '../src/lib/helpers';
import { ROUTES } from '../src/i18n/routes';
import { TOOL_KINDS } from '../src/lib/tool-specs';
import type { FAQ, PageText } from '../src/lib/page-types';
import { HOME } from '../src/content/home';
import { PLANNED_IDS } from '../src/lib/planned';
import type { Lang } from '../src/lib/format';

const BANNED = [/—/, /–/, /it'?s important to note/i, /dive into/i, /\bdelve/i, /whether you'?re/i, /navigate the/i, /\bMoreover\b/, /\bAdditionally\b/, /\bFurthermore\b/, /game.?changer/i, /\bunlock/i, /in today'?s world/i, /call (us|now)/i, /\bguaranteed\b/i,
  // No donation call, no charity named as a place to pay, no fatwa claimed.
  /\bdonate (now|today|here)\b/i, /\bgive (now|today)\b/i, /pay your zakat (with|through|to) /i, /\bour fatwa\b/i, /\bwe rule\b/i, /تبرع الآن/, /ادفع زكاتك (عبر|إلى|لدى)/,
  /islamic-relief|islamicrelief|nzf\.org|zakat\.org|muslimhands|pennyappeal|launchgood|humanappeal|irusa|zakatfoundation|ummahwelfare|muslimaid/i];
const WORDS_AR_FACTOR = 1; // Arabic words are counted as written (one token between spaces).
const words = (s: string) => s.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
const text = (s: string) => s.replace(/<div class="not-prose my-6 overflow-x-auto">[\s\S]*?<\/table><\/div>/g, ' ').replace(/<!--mini:[^>]*-->/g, ' ').replace(/<aside[\s\S]*?<\/aside>/g, (m) => m).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const only = (process.env.PAGE_FILES ?? '').split(',').map((x) => x.trim()).filter(Boolean);
const keep = (id: string) => !only.length || only.includes(id);

interface Item { id: string; key: string; lang: Lang; t: PageText; body: string; related: string[]; minBody: number }
const items: Item[] = GUIDES.flatMap((g) => (['en', 'ar'] as Lang[]).filter((l) => g[l]).map((l) => ({ id: g.id, key: `${l}:${g.id}`, lang: l, t: g[l]!, body: g[l]!.body(helpers(l)), related: g.related, minBody: l === 'ar' ? 520 * WORDS_AR_FACTOR : 650 })));

const allQ = new Map<string, string[]>();
for (const it of items) for (const f of it.t.faqs) allQ.set(f.q.trim().toLowerCase(), [...(allQ.get(f.q.trim().toLowerCase()) ?? []), it.key]);
for (const l of ['en', 'ar'] as Lang[]) for (const f of HOME[l].faqs) allQ.set(f.q.trim().toLowerCase(), [...(allQ.get(f.q.trim().toLowerCase()) ?? []), `${l}:home`]);
const titles = new Map<string, number>(), descs = new Map<string, number>(), slugs = new Map<string, number>();
for (const it of items) { titles.set(it.t.title, (titles.get(it.t.title) ?? 0) + 1); descs.set(it.t.description, (descs.get(it.t.description) ?? 0) + 1); slugs.set(`${it.lang}/${it.t.slug}`, (slugs.get(`${it.lang}/${it.t.slug}`) ?? 0) + 1); }

describe('content files', () => {
  for (const x of items.filter((y) => keep(y.id))) {
    describe(x.key, () => {
      it('slug: lowercase latin letters and dashes, no year, unique', () => {
        expect(x.t.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
        expect(x.t.slug).not.toMatch(/20[2-3]\d/);
        expect(slugs.get(`${x.lang}/${x.t.slug}`)).toBe(1);
      });
      it('title 50-60, key term first, year, unique', () => {
        expect(x.t.title.length, x.t.title).toBeGreaterThanOrEqual(50);
        expect(x.t.title.length, x.t.title).toBeLessThanOrEqual(60);
        expect(x.t.title).toMatch(/2026/);
        expect(x.t.title).not.toMatch(/^((How|What|When|Why|Is|Are|Do|Does|Can|Who|Calculator|Calculators|Calculate)\b|UK |USA|US |UAE|Pakistan|India|Canada|Australia|Malaysia|Nigeria|South Africa|كيف|ما |متى|هل|من )/);
        expect(titles.get(x.t.title)).toBe(1);
      });
      it('description 150-160, year, unique', () => {
        expect(x.t.description.length, x.t.description).toBeGreaterThanOrEqual(150);
        expect(x.t.description.length, x.t.description).toBeLessThanOrEqual(160);
        expect(x.t.description).toMatch(/2026/);
        expect(descs.get(x.t.description)).toBe(1);
      });
      it('resume: one paragraph of 120 words or more', () => {
        expect(words(x.t.resume), x.t.resume).toBeGreaterThanOrEqual(120);
        expect(x.t.resume).not.toMatch(/\n\s*\n/);
      });
      it(`body: enough prose, tables apart`, () => {
        expect(words(text(x.body))).toBeGreaterThanOrEqual(x.minBody);
      });
      it('no banned phrase, dash, donation call or charity link', () => {
        for (const re of BANNED) for (const part of [x.t.title, x.t.description, x.t.intro, x.t.resume, x.body, ...x.t.faqs.flatMap((f) => [f.q, f.a])]) expect(part, String(re)).not.toMatch(re);
      });
      it('FAQ: 3 to 8 questions, answers 40-90 words, unique across the site', () => {
        expect(x.t.faqs.length).toBeGreaterThanOrEqual(3);
        expect(x.t.faqs.length).toBeLessThanOrEqual(8);
        for (const f of x.t.faqs) {
          expect(words(f.a), f.q).toBeGreaterThanOrEqual(40);
          expect(words(f.a), f.q).toBeLessThanOrEqual(90);
          expect(allQ.get(f.q.trim().toLowerCase()), f.q).toHaveLength(1);
        }
      });
      it('related pages and minis exist', () => {
        for (const r of x.related) expect(ROUTES.some((y) => y.id === r) || PLANNED_IDS.has(r), r).toBe(true);
        for (const m of x.body.matchAll(/<!--mini:([A-Za-z0-9_]+)/g)) expect(TOOL_KINDS, m[1]).toContain(m[1]);
        expect(x.body.match(/<!--mini:/g)?.length ?? 0, 'at least one mini-simulator').toBeGreaterThanOrEqual(1);
        expect(x.body).not.toMatch(/undefined|NaN|\[object Object\]|\bnull\b|Infinity/);
        expect(x.t.resume + x.t.description + x.t.title + x.t.intro).not.toMatch(/undefined|NaN|\bnull\b|Infinity/);
      });
      it('every external link is a cited source', () => {
        const allowed = new Set(Object.values(SOURCES).map((s) => s.url));
        for (const m of x.body.matchAll(/<a href="(https?:[^"]+)"/g)) expect(allowed.has(m[1]) || /^https:\/\//.test(m[1]), m[1]).toBe(true);
      });
    });
  }
  it.skipIf(!!only.length)('every planned page has its file', () => {
    for (const id of PLANNED_IDS) { const [l, k] = id.includes(':') ? id.split(':') : ['en', id]; expect(GUIDES.some((g) => g.id === k && g[l as Lang]), id).toBe(true); }
  });
  it('guide sources exist', () => { for (const g of GUIDES) for (const s of g.sources) expect(SOURCES[s], `${g.id}: ${s}`).toBeTruthy(); });
  it('home pages: FAQ answers 40-90 words, no banned phrase', () => {
    for (const l of ['en', 'ar'] as Lang[]) {
      const hm = HOME[l];
      for (const f of hm.faqs) { expect(words(f.a), f.q).toBeGreaterThanOrEqual(40); expect(words(f.a), f.q).toBeLessThanOrEqual(90); }
      const body = hm.body(helpers(l));
      for (const re of BANNED) for (const part of [hm.title, hm.description, body]) expect(part, String(re)).not.toMatch(re);
      expect(hm.title.length).toBeGreaterThanOrEqual(50); expect(hm.title.length).toBeLessThanOrEqual(60);
      expect(hm.description.length).toBeGreaterThanOrEqual(150); expect(hm.description.length).toBeLessThanOrEqual(160);
    }
  });
});

mkdirSync('.cache-raw', { recursive: true });
writeFileSync('.cache-raw/page-texts.json', JSON.stringify(Object.fromEntries(items.map((it) => [it.key, { kind: 'guide', text: [it.t.intro, it.t.resume, text(it.body), ...it.t.faqs.flatMap((f: FAQ) => [f.q, f.a])].join(' ') }]))));
