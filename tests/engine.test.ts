/** Engine tests against published cases (sources in research/rules-and-faraid-cases.md and params-2026.json). */
import { describe, it, expect } from 'vitest';
import { distribute, NO_HEIRS, show, type Heirs, type HeirKey } from '../src/lib/engine/faraid';
import { computeZakat, DEFAULT_IN } from '../src/lib/engine/zakat';
import { hawlEnd, monthStart, toHijri } from '../src/lib/engine/hijri';
import { nisabGrams } from '../src/lib/engine/market';
import { FITR } from '../src/lib/engine/fitr';
import P from '../src/data/params-2026.json';

const run = (h: Partial<Heirs>, o = {}) => distribute({ ...NO_HEIRS, ...h }, o);
const share = (h: Partial<Heirs>, o = {}) => {
  const r = run(h, o);
  return Object.fromEntries(r.shares.filter((s) => s.total.n > 0).map((s) => [s.key, show(s.total)])) as Partial<Record<HeirKey, string>>;
};
const perHead = (h: Partial<Heirs>, key: HeirKey) => show(run(h).shares.find((s) => s.key === key)!.perHead);

describe('faraid, published cases', () => {
  it('minbariyya: wife, father, mother, 2 daughters, 24 raised to 27 (Islamweb 359851)', () => {
    const r = run({ deceased: 'male', wives: 1, father: 1, mother: 1, daughters: 2 });
    expect(share({ deceased: 'male', wives: 1, father: 1, mother: 1, daughters: 2 })).toEqual({ wives: '1/9', father: '4/27', mother: '4/27', daughters: '16/27' });
    expect(r.awl?.to).toBe(27);
  });
  it('umariyya 1: husband, mother, father (Islamweb 282730, 15603)', () => {
    expect(share({ deceased: 'female', husband: 1, mother: 1, father: 1 })).toEqual({ husband: '1/2', mother: '1/6', father: '1/3' });
  });
  it('umariyya 2: wife, mother, father (Islamweb 171453)', () => {
    expect(share({ deceased: 'male', wives: 1, mother: 1, father: 1 })).toEqual({ wives: '1/4', mother: '1/4', father: '1/2' });
  });
  it('mushtaraka: husband, mother, 2 uterine siblings, full brother (Islamweb 204760, Ibn Taymiyya)', () => {
    const h = { deceased: 'female' as const, husband: 1, mother: 1, matSiblings: 2, fullBrothers: 1 };
    expect(share(h, { mushtaraka: 'exclude' })).toEqual({ husband: '1/2', mother: '1/6', matSiblings: '1/3' });
    const s = share(h, { mushtaraka: 'share' });
    expect(s.husband).toBe('1/2'); expect(s.mother).toBe('1/6');
    expect(s.matSiblings).toBe('2/9'); expect(s.fullBrothers).toBe('1/9');
  });
  it('husband and 2 full sisters, 6 raised to 7 (ar.wikipedia عول, Islamweb 48741)', () => {
    expect(share({ deceased: 'female', husband: 1, fullSisters: 2 })).toEqual({ husband: '3/7', fullSisters: '4/7' });
  });
  it('husband, mother, full sister, 6 raised to 8', () => {
    expect(share({ deceased: 'female', husband: 1, mother: 1, fullSisters: 1 })).toEqual({ husband: '3/8', mother: '1/4', fullSisters: '3/8' });
  });
  it('husband, 2 full sisters, mother, 6 raised to 8', () => {
    expect(share({ deceased: 'female', husband: 1, fullSisters: 2, mother: 1 })).toEqual({ husband: '3/8', fullSisters: '1/2', mother: '1/8' });
  });
  it('husband, full sisters, 2 uterine siblings, 6 raised to 9 (Islamweb 48741)', () => {
    expect(share({ deceased: 'female', husband: 1, fullSisters: 2, matSiblings: 2 })).toEqual({ husband: '1/3', fullSisters: '4/9', matSiblings: '2/9' });
  });
  it('husband and full sister, a half each', () => {
    expect(share({ deceased: 'female', husband: 1, fullSisters: 1 })).toEqual({ husband: '1/2', fullSisters: '1/2' });
  });
  it('daughter, son’s daughter, full sister (Bukhari 6736, Islamweb 172621)', () => {
    expect(share({ daughters: 1, sonsDaughters: 1, fullSisters: 1 })).toEqual({ daughters: '1/2', sonsDaughters: '1/6', fullSisters: '1/3' });
  });
  it('radd: mother and daughter, 6 brought to 4 (Islamweb 319204)', () => {
    expect(share({ mother: 1, daughters: 1 })).toEqual({ mother: '1/4', daughters: '3/4' });
  });
  it('radd not to the wife: wife, mother, daughter, 4, 7, 21 of 32 (Islamweb 127741)', () => {
    expect(share({ deceased: 'male', wives: 1, mother: 1, daughters: 1 })).toEqual({ wives: '1/8', mother: '7/32', daughters: '21/32' });
  });
  it('radd not to the husband: husband, mother, daughter, 4, 3, 9 of 16 (Islamweb 227083)', () => {
    expect(share({ deceased: 'female', husband: 1, mother: 1, daughters: 1 })).toEqual({ husband: '1/4', mother: '3/16', daughters: '9/16' });
  });
  it('wife, son, daughter: an eighth, then two to one (ar.wikipedia العصبات)', () => {
    expect(share({ deceased: 'male', wives: 1, sons: 1, daughters: 1 })).toEqual({ wives: '1/8', sons: '7/12', daughters: '7/24' });
  });
  it('excluded brothers still bring the mother down to a sixth (Islamweb 409885)', () => {
    expect(share({ deceased: 'male', wives: 1, father: 1, mother: 1, fullBrothers: 2, fullSisters: 2 })).toEqual({ wives: '1/4', mother: '1/6', father: '7/12' });
  });
  it('husband, mother, 4 full brothers, 5 full sisters, paternal siblings excluded (Islamweb 140483)', () => {
    const h = { deceased: 'female' as const, husband: 1, mother: 1, fullBrothers: 4, fullSisters: 5, patBrothers: 1, patSisters: 3 };
    expect(share(h)).toEqual({ husband: '1/2', mother: '1/6', fullBrothers: '8/39', fullSisters: '5/39' });
    expect(perHead(h, 'fullBrothers')).toBe('2/39'); expect(perHead(h, 'fullSisters')).toBe('1/39');
  });
  it('husband and son; mother and son (ar.wikipedia عول)', () => {
    expect(share({ deceased: 'female', husband: 1, sons: 1 })).toEqual({ husband: '1/4', sons: '3/4' });
    expect(share({ mother: 1, sons: 1 })).toEqual({ mother: '1/6', sons: '5/6' });
  });
  it('every result adds up to the whole estate or reports what is left', () => {
    for (const h of [{ wives: 2, sons: 3, daughters: 2, mother: 1 }, { husband: 1, deceased: 'female' as const, father: 1, daughters: 3 }, { mother: 1, matSiblings: 1 }]) {
      const r = run(h);
      const tot = r.shares.reduce((a, s) => a + s.total.n / s.total.d, 0);
      expect(tot + (r.unallocated ? r.unallocated.n / r.unallocated.d : 0)).toBeCloseTo(1, 10);
    }
  });
});

describe('zakat', () => {
  it('nisab weights and rates come from the cited sources', () => {
    expect(nisabGrams('gold', 'g85')).toBe(85); expect(nisabGrams('silver', 'g85')).toBe(595);
    expect(nisabGrams('silver', 'pk')).toBe(612.32); expect(nisabGrams('gold', 'pk')).toBe(87.48);
    expect(P.rate.solar).toBeCloseTo(0.025 * 365 / 354, 12);
  });
  it('2.5 % of net wealth above the nisab, nothing below it', () => {
    const r = computeZakat({ ...DEFAULT_IN, cur: 'USD', cash: 0, basis: 'silver' } as never);
    expect(r.zakat).toBe(0);
    const big = computeZakat({ ...DEFAULT_IN, cur: 'USD', cash: 1_000_000, debts: 0, basis: 'gold' } as never);
    expect(big.zakat).toBeCloseTo(big.net * 0.025, 6);
  });
  it('worn jewellery: included or left out by the chosen rule', () => {
    const base = { ...DEFAULT_IN, cur: 'USD', cash: 50_000, jewelG: 100, jewelK: 22 } as never;
    const inc = computeZakat({ ...(base as object), jewelRule: 'include' } as never), exc = computeZakat({ ...(base as object), jewelRule: 'exclude' } as never);
    expect(inc.zakat).toBeGreaterThan(exc.zakat);
  });
});

describe('hijri', () => {
  it('a lunar year after 21 October 2026 ends on 10 October 2027', () => { expect(hawlEnd('2026-10-21').end).toBe('2027-10-10'); });
  it('Umm al-Qura: 1 Shawwal 1447 fell on 20 March 2026; Ramadan 1448 starts on 8 February 2027', () => {
    expect(toHijri('2026-03-20')).toMatchObject({ y: 1447, m: 10, d: 1 });
    expect(monthStart(1448, 9, '2027-02-01')).toBe('2027-02-08');
  });
});

describe('published fitr amounts', () => {
  it('every row is dated, sourced, and from Ramadan 1447', () => {
    for (const r of FITR) { expect(r.url).toMatch(/^https:\/\//); expect(r.year).toBe('1447'); expect(r.date).toMatch(/^2026-0[23]-\d\d$/); expect(r.fitr ?? r.fidya ?? r.kaffarah).toBeGreaterThan(0); }
  });
});
