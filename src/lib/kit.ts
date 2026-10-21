/**
 * Writing kit (CONTRIBUTING-PAGES.md): every figure written in a page comes from here, never typed by hand. The kit
 * is bound to the language of the page (numbers, dates and currency names follow it).
 *   K.P                        params-2026.json (nisab weights, rates, sources)
 *   K.nisab(basis, cur, conv)  nisab of the day; K.gram(metal, cur), K.goldGram(carat, cur), K.nisabGrams(basis, conv)
 *   K.priceDay                 day of the gold and silver prices, written out; K.PRICE_DAY (ISO)
 *   K.zakat({...})             full zakat computation (src/lib/engine/zakat.ts)
 *   K.faraid({...}, opts)      inheritance shares; K.frac(f) writes a fraction "1/8"
 *   K.hawl(iso), K.hijri(iso)  end of a lunar year, Hijri date written out; K.ramadan1448 first day (Umm al-Qura)
 *   K.FITR, K.fitr(id)         published amounts of zakat al-fitr, fidya and kaffarah (one row per body, dated)
 *   K.tool(kind, args)         runs a calculator of tool-specs.ts and returns its result card
 *   formats                    K.money(x, cur), K.money2, K.pct(0.025), K.num, K.dec, K.day(iso), K.grams(g), K.cur(code)
 */
import P from '../data/params-2026.json';
import { gram, goldGram, nisab, nisabGrams, nisabRatio, PRICE_DAY, MARKET, HISTORY, type Metal, type NisabBasis, type Convention } from './engine/market';
import { computeZakat, DEFAULT_IN, type ZakatIn } from './engine/zakat';
import { distribute, show, NO_HEIRS, type Heirs, type Frac } from './engine/faraid';
import { hawlEnd, toHijri, showHijri, monthStart } from './engine/hijri';
import { FITR, fitrRow } from './engine/fitr';
import { getTool } from './tool-specs';
import { money, money2, pct, num, dec, day, grams, curName } from './fmt';
import type { V } from './tool-types';
import type { Lang } from './format';

export function makeKit(lang: Lang) {
  return {
    P, lang, MARKET, HISTORY, PRICE_DAY, FITR,
    priceDay: day(PRICE_DAY, lang),
    nisab: (basis: NisabBasis, cur: string, conv: Convention = 'g85') => nisab(basis, cur, conv),
    nisabGrams, ratio: nisabRatio,
    gram: (metal: Metal, cur: string) => gram(metal, cur), goldGram,
    zakat: (i: Partial<ZakatIn>) => computeZakat({ ...DEFAULT_IN, cash: 0, ...i }),
    faraid: (h: Partial<Heirs>, opts: { mushtaraka?: 'share' | 'exclude' } = {}) => distribute({ ...NO_HEIRS, ...h }, opts),
    frac: (f: Frac) => show(f),
    hawl: hawlEnd, hijri: (iso: string) => showHijri(toHijri(iso), lang),
    ramadan1448: monthStart(1448, 9, '2027-02-01'), shawwal1448: monthStart(1448, 10, '2027-03-05'),
    fitr: (id: string) => { const r = fitrRow(id); if (!r) throw new Error(`Unknown fitr row ${id}`); return r; },
    tool: (kind: string, args: V = {}) => { const spec = getTool(kind, args, lang); return spec.run({ ...Object.fromEntries(spec.inputs.map((i) => [i.id, i.def])), ...args }); },
    money: (x: number, cur: string) => money(x, cur, lang), money2: (x: number, cur: string) => money2(x, cur, lang),
    pct: (x: number, d = 1) => pct(x, d, lang), num: (x: number, d = 0) => num(x, d, lang), dec: (x: number, d = 2) => dec(x, d, lang),
    day: (iso: string) => day(iso, lang), grams: (g: number) => grams(g, lang), cur: (code: string) => curName(code, lang),
  };
}
export type Kit = ReturnType<typeof makeKit>;
