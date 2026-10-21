/**
 * Islamic inheritance (faraid): Qur'anic shares (4:11, 4:12, 4:176), exclusion (hajb), residuaries ('asaba),
 * proportional reduction ('awl) and return of a surplus (radd). Pure functions, exact fractions.
 *
 * Positions taken, each shown to the reader by `notes`:
 *  - Paternal grandfather with full or paternal siblings: he excludes them (Abu Hanifa). The other schools let
 *    the siblings share with him; the result then differs and the tool says so instead of computing it.
 *  - Al-mushtaraka (husband, mother or grandmother, two or more maternal siblings, full brothers, nothing left):
 *    `mushtaraka: 'share'` (Maliki, Shafi'i: full siblings join the maternal siblings' third) or 'exclude'
 *    (Hanafi, Hanbali: full brothers receive nothing). Both are computed.
 *  - Radd goes to the fixed-share heirs other than the spouses, in proportion to their shares. A surplus left with
 *    a spouse alone is not allocated: the tool shows it and explains the views.
 *  - More distant relatives (nephews, uncles, cousins, distant kindred) are not modelled.
 */
export interface Heirs {
  deceased: 'male' | 'female';
  /** 0 or 1, deceased female only. */ husband: number;
  /** 0 to 4, deceased male only. */ wives: number;
  sons: number; daughters: number; sonsSons: number; sonsDaughters: number;
  father: number; mother: number; grandfather: number; patGrandmother: number; matGrandmother: number;
  fullBrothers: number; fullSisters: number; patBrothers: number; patSisters: number;
  /** Maternal half-brothers and half-sisters together: they share equally. */ matSiblings: number;
}
export type HeirKey = Exclude<keyof Heirs, 'deceased'>;
export const HEIR_KEYS: HeirKey[] = ['husband', 'wives', 'sons', 'daughters', 'sonsSons', 'sonsDaughters', 'father', 'mother', 'grandfather', 'patGrandmother', 'matGrandmother', 'fullBrothers', 'fullSisters', 'patBrothers', 'patSisters', 'matSiblings'];
export const NO_HEIRS: Heirs = { deceased: 'male', husband: 0, wives: 0, sons: 0, daughters: 0, sonsSons: 0, sonsDaughters: 0, father: 0, mother: 0, grandfather: 0, patGrandmother: 0, matGrandmother: 0, fullBrothers: 0, fullSisters: 0, patBrothers: 0, patSisters: 0, matSiblings: 0 };

/* ---- exact fractions ---- */
export interface Frac { n: number; d: number }
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const lcm = (a: number, b: number) => (a / gcd(a, b)) * b;
export const fr = (n: number, d = 1): Frac => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return { n: n / g, d: d / g }; };
export const add = (a: Frac, b: Frac) => fr(a.n * b.d + b.n * a.d, a.d * b.d);
export const sub = (a: Frac, b: Frac) => fr(a.n * b.d - b.n * a.d, a.d * b.d);
export const mul = (a: Frac, b: Frac) => fr(a.n * b.n, a.d * b.d);
export const div = (a: Frac, b: Frac) => fr(a.n * b.d, a.d * b.n);
export const val = (a: Frac) => a.n / a.d;
export const eq = (a: Frac, b: Frac) => a.n * b.d === b.n * a.d;
export const ZERO = fr(0), ONE = fr(1);
export const show = (a: Frac) => (a.n === 0 ? '0' : a.d === 1 ? String(a.n) : `${a.n}/${a.d}`);

export type Basis =
  | 'fard' // fixed share
  | 'fard+residue' // father or grandfather with daughters only
  | 'residue' // residuary
  | 'umariyya' // mother: one third of what the spouse leaves
  | 'takmila' // 1/6 completing two thirds
  | 'mushtaraka';
export interface Share { key: HeirKey; count: number; basis: Basis; /** share of the whole estate for the group */ total: Frac; /** fixed share before 'awl or radd */ fard?: Frac; perHead: Frac }
export type Note = 'awl' | 'radd' | 'spouse-surplus' | 'grandfather-siblings' | 'mushtaraka' | 'distant-residuaries' | 'paternal-grandmother-father' | 'umariyya' | 'no-heirs';
export interface Exclusion { key: HeirKey; by: HeirKey[] }
export interface Result {
  shares: Share[]; excluded: Exclusion[]; notes: Note[];
  /** Common denominator of the final shares (asl after 'awl or radd). */ base: number;
  /** Original base and its 'awl, when it happened (e.g. 24 → 27). */ awl?: { from: number; to: number };
  /** Part of the estate allocated to nobody (a spouse alone, or no listed residuary). */ unallocated: Frac;
}

export function distribute(h: Heirs, opts: { mushtaraka?: 'share' | 'exclude' } = {}): Result {
  const x: Heirs = { ...h, husband: h.deceased === 'female' ? Math.min(1, h.husband) : 0, wives: h.deceased === 'male' ? Math.min(4, h.wives) : 0 };
  const notes: Note[] = [];
  const excluded: Exclusion[] = [];
  const S = x.sons, D = x.daughters;
  const sonLine = S + x.sonsSons > 0; // male descendant
  const desc = S + D + x.sonsSons + x.sonsDaughters > 0;
  const femaleDesc = D + x.sonsDaughters > 0;
  const gf = x.grandfather > 0 && !x.father;
  const siblings = x.fullBrothers + x.fullSisters + x.patBrothers + x.patSisters + x.matSiblings;

  const live: Partial<Record<HeirKey, number>> = {};
  const out = (key: HeirKey, by: HeirKey[]) => { if (x[key] > 0) excluded.push({ key, by: by.filter((b) => x[b] > 0) }); };
  const keep = (key: HeirKey) => { if (x[key] > 0) live[key] = x[key]; };
  keep('husband'); keep('wives'); keep('sons'); keep('daughters'); keep('father'); keep('mother');
  if (x.father) out('grandfather', ['father']); else keep('grandfather');
  if (x.mother) out('matGrandmother', ['mother']); else keep('matGrandmother');
  if (x.mother || x.father) { out('patGrandmother', ['mother', 'father']); if (x.father && !x.mother && x.patGrandmother) notes.push('paternal-grandmother-father'); } else keep('patGrandmother');
  if (S) { out('sonsSons', ['sons']); out('sonsDaughters', ['sons']); }
  else {
    keep('sonsSons');
    if (D >= 2 && !x.sonsSons) out('sonsDaughters', ['daughters']); else keep('sonsDaughters');
  }
  const blockSib: HeirKey[] = ['sons', 'sonsSons', 'father', 'grandfather'];
  if (desc || x.father || gf) out('matSiblings', ['sons', 'daughters', 'sonsSons', 'sonsDaughters', 'father', 'grandfather']); else keep('matSiblings');
  const fullBlocked = sonLine || x.father > 0 || gf;
  if (fullBlocked) { out('fullBrothers', blockSib); out('fullSisters', blockSib); if (gf && !sonLine && (x.fullBrothers + x.fullSisters + x.patBrothers + x.patSisters) > 0) notes.push('grandfather-siblings'); }
  else { keep('fullBrothers'); keep('fullSisters'); }
  const fullSisterWithDaughters = !fullBlocked && x.fullSisters > 0 && !x.fullBrothers && femaleDesc; // 'asaba ma'a al-ghayr
  if (fullBlocked || x.fullBrothers || fullSisterWithDaughters) {
    const by: HeirKey[] = fullBlocked ? blockSib : x.fullBrothers ? ['fullBrothers'] : ['fullSisters', 'daughters', 'sonsDaughters'];
    out('patBrothers', by); out('patSisters', by);
  } else {
    keep('patBrothers');
    if (x.fullSisters >= 2 && !x.patBrothers) out('patSisters', ['fullSisters']); else keep('patSisters');
  }

  const has = (k: HeirKey) => (live[k] ?? 0) > 0;
  const fard: Partial<Record<HeirKey, { f: Frac; basis: Basis }>> = {};
  if (has('husband')) fard.husband = { f: desc ? fr(1, 4) : fr(1, 2), basis: 'fard' };
  if (has('wives')) fard.wives = { f: desc ? fr(1, 8) : fr(1, 4), basis: 'fard' };
  const spouse = fard.husband?.f ?? fard.wives?.f ?? ZERO;
  if (has('mother')) {
    if (desc || siblings >= 2) fard.mother = { f: fr(1, 6), basis: 'fard' };
    else if (x.father && spouse.n > 0) { fard.mother = { f: mul(fr(1, 3), sub(ONE, spouse)), basis: 'umariyya' }; notes.push('umariyya'); }
    else fard.mother = { f: fr(1, 3), basis: 'fard' };
  }
  const grandmothers = (live.patGrandmother ?? 0) + (live.matGrandmother ?? 0);
  if (grandmothers) {
    if (has('patGrandmother')) fard.patGrandmother = { f: fr(live.patGrandmother!, 6 * grandmothers), basis: 'fard' };
    if (has('matGrandmother')) fard.matGrandmother = { f: fr(live.matGrandmother!, 6 * grandmothers), basis: 'fard' };
  }
  const ancestor: HeirKey | null = has('father') ? 'father' : has('grandfather') ? 'grandfather' : null;
  if (ancestor && desc) fard[ancestor] = { f: fr(1, 6), basis: sonLine ? 'fard' : 'fard+residue' };
  if (has('daughters') && !S) fard.daughters = { f: D === 1 ? fr(1, 2) : fr(2, 3), basis: 'fard' };
  if (has('sonsDaughters') && !x.sonsSons) {
    if (!D) fard.sonsDaughters = { f: x.sonsDaughters === 1 ? fr(1, 2) : fr(2, 3), basis: 'fard' };
    else if (D === 1) fard.sonsDaughters = { f: fr(1, 6), basis: 'takmila' };
  }
  if (has('matSiblings')) fard.matSiblings = { f: x.matSiblings === 1 ? fr(1, 6) : fr(1, 3), basis: 'fard' };
  if (has('fullSisters') && !x.fullBrothers && !femaleDesc) fard.fullSisters = { f: x.fullSisters === 1 ? fr(1, 2) : fr(2, 3), basis: 'fard' };
  if (has('patSisters') && !x.patBrothers && !femaleDesc) {
    if (!x.fullSisters) fard.patSisters = { f: x.patSisters === 1 ? fr(1, 2) : fr(2, 3), basis: 'fard' };
    else if (x.fullSisters === 1) fard.patSisters = { f: fr(1, 6), basis: 'takmila' };
  }

  // Residuary group, by order of priority.
  type Group = Array<[HeirKey, number]>; // key, weight per head
  let residuary: Group = [];
  if (has('sons')) residuary = [['sons', 2], ...(has('daughters') ? [['daughters', 1] as [HeirKey, number]] : [])];
  else if (has('sonsSons')) residuary = [['sonsSons', 2], ...(has('sonsDaughters') ? [['sonsDaughters', 1] as [HeirKey, number]] : [])];
  else if (ancestor) residuary = [[ancestor, 1]];
  else if (has('fullBrothers')) residuary = [['fullBrothers', 2], ...(has('fullSisters') ? [['fullSisters', 1] as [HeirKey, number]] : [])];
  else if (fullSisterWithDaughters) residuary = [['fullSisters', 1]];
  else if (has('patBrothers')) residuary = [['patBrothers', 2], ...(has('patSisters') ? [['patSisters', 1] as [HeirKey, number]] : [])];
  else if (has('patSisters') && femaleDesc) residuary = [['patSisters', 1]];

  let sumFard = Object.values(fard).reduce((a, v) => add(a, v!.f), ZERO);
  const shares = new Map<HeirKey, Share>();
  const put = (key: HeirKey, total: Frac, basis: Basis, f?: Frac) => shares.set(key, { key, count: x[key], basis, total, fard: f, perHead: div(total, fr(x[key])) });

  // Al-mushtaraka: nothing left for the full brothers while the maternal siblings take a third.
  const isMushtaraka = residuary[0]?.[0] === 'fullBrothers' && x.matSiblings >= 2 && eq(sumFard, ONE) && (has('husband')) && (has('mother') || grandmothers > 0);
  if (isMushtaraka) notes.push('mushtaraka');

  let awl: Result['awl'];
  let unallocated = ZERO;
  const baseOf = (fs: Frac[]) => fs.reduce((a, f) => lcm(a, f.d), 1);
  if (sumFard.n > sumFard.d) {
    // 'awl: every fixed share is reduced in proportion.
    const from = baseOf(Object.values(fard).map((v) => v!.f));
    const to = (sumFard.n * from) / sumFard.d;
    awl = { from, to };
    notes.push('awl');
    for (const [k, v] of Object.entries(fard) as Array<[HeirKey, { f: Frac; basis: Basis }]>) put(k, div(v.f, sumFard), v.basis, v.f);
    for (const [k] of residuary) if (!shares.has(k)) put(k, ZERO, 'residue');
  } else {
    for (const [k, v] of Object.entries(fard) as Array<[HeirKey, { f: Frac; basis: Basis }]>) put(k, v.f, v.basis, v.f);
    const rest = sub(ONE, sumFard);
    if (isMushtaraka && opts.mushtaraka === 'share') {
      // Full siblings join the maternal siblings: the third is shared per head, men and women alike.
      const heads = x.matSiblings + x.fullBrothers + x.fullSisters;
      const third = fard.matSiblings!.f;
      put('matSiblings', mul(third, fr(x.matSiblings, heads)), 'mushtaraka', third);
      put('fullBrothers', mul(third, fr(x.fullBrothers, heads)), 'mushtaraka');
      if (x.fullSisters) put('fullSisters', mul(third, fr(x.fullSisters, heads)), 'mushtaraka');
    } else if (residuary.length) {
      const weight = residuary.reduce((a, [k, w]) => a + w * x[k], 0);
      for (const [k, w] of residuary) {
        const part = mul(rest, fr(w * x[k], weight));
        const prev = shares.get(k);
        if (prev) shares.set(k, { ...prev, total: add(prev.total, part), perHead: div(add(prev.total, part), fr(x[k])), basis: prev.basis === 'fard+residue' ? 'fard+residue' : prev.basis });
        else put(k, part, 'residue');
      }
    } else if (rest.n > 0) {
      const takers = [...shares.values()].filter((s) => s.key !== 'husband' && s.key !== 'wives');
      if (takers.length) {
        // Radd: the surplus returns to the fixed-share heirs other than the spouses, in proportion.
        notes.push('radd');
        const pool = takers.reduce((a, s) => add(a, s.total), ZERO);
        for (const s of takers) { const t = add(s.total, mul(rest, div(s.total, pool))); shares.set(s.key, { ...s, total: t, perHead: div(t, fr(s.count)) }); }
      } else if (shares.size) { notes.push('spouse-surplus'); unallocated = rest; }
      else { notes.push('no-heirs'); unallocated = rest; }
    }
    if (!residuary.length && rest.n > 0 && shares.size) notes.push('distant-residuaries');
  }
  const list = HEIR_KEYS.filter((k) => shares.has(k)).map((k) => shares.get(k)!);
  const base = baseOf([...list.map((s) => s.total), ...list.map((s) => s.perHead)].filter((f) => f.n > 0));
  return { shares: list, excluded, notes: [...new Set(notes)], base, awl, unallocated };
}

/** Money per head and per group for an estate (after funeral costs, debts and a bequest of at most one third). */
export function amounts(r: Result, estate: number) {
  return r.shares.map((s) => ({ ...s, groupAmount: estate * val(s.total), headAmount: estate * val(s.perHead) }));
}

/** Net estate: gross minus funeral costs and debts, minus the bequest capped at one third of what is left. */
export function netEstate(gross: number, debts: number, bequest: number) {
  const afterDebts = Math.max(0, gross - debts);
  const bequestPaid = Math.min(Math.max(0, bequest), afterDebts / 3);
  return { afterDebts, bequestPaid, capped: bequest > afterDebts / 3, net: afterDebts - bequestPaid };
}
