/**
 * Metal prices and exchange rates of the day (src/data/market.json, rewritten by scripts/update-data.mjs) and the
 * nisab built on them. Prices are spot prices of pure metal (gold 24 carat, fine silver) in US dollars per troy
 * ounce; a jeweller's buying price is lower and a retail price higher.
 */
import M from '../../data/market.json';
import H from '../../data/history.json';
import P from '../../data/params-2026.json';

export const TROY_OUNCE_G = 31.1034768;
export type Metal = 'gold' | 'silver';
export type NisabBasis = Metal;
export type Convention = keyof typeof P.nisab.conventions;
export const MARKET = M as { goldUsdOz: number; silverUsdOz: number; metalsAt: string; ecbDate: string; erDate: string; fx: Record<string, number>; fxSource: Record<string, 'ECB' | 'ER'> };
export const HISTORY = H as Array<{ d: string; au: number; ag: number }>;
/** Day of the metal prices (UTC). */
export const PRICE_DAY = MARKET.metalsAt.slice(0, 10);

export const fx = (cur: string) => { const r = MARKET.fx[cur]; if (!r) throw new Error(`No rate for ${cur}`); return r; };
/** Price of one gram of pure metal in a currency. */
export const gram = (metal: Metal, cur: string) => ((metal === 'gold' ? MARKET.goldUsdOz : MARKET.silverUsdOz) / TROY_OUNCE_G) * fx(cur);
/** Gold of a given carat (24 = pure). */
export const goldGram = (carat: number, cur: string) => gram('gold', cur) * Math.min(24, Math.max(0, carat)) / 24;
/** Silver of a given fineness in thousandths (999 fine, 925 sterling). */
export const silverGram = (fineness: number, cur: string) => gram('silver', cur) * Math.min(1000, Math.max(0, fineness)) / 1000;
export const nisabGrams = (basis: NisabBasis, conv: Convention = 'g85') => P.nisab.conventions[conv][basis];
/** Nisab in a currency today. */
export const nisab = (basis: NisabBasis, cur: string, conv: Convention = 'g85') => nisabGrams(basis, conv) * gram(basis, cur);
/** Gold nisab divided by silver nisab: how many times higher the gold threshold is today. */
export const nisabRatio = (conv: Convention = 'g85') => nisab('gold', 'USD', conv) / nisab('silver', 'USD', conv);
/** Nisab on a past day of our history (only days we recorded; never a reconstructed price). */
export const nisabOn = (d: string, basis: NisabBasis, cur: string, conv: Convention = 'g85') => {
  const p = HISTORY.find((x) => x.d === d); if (!p) return null;
  return nisabGrams(basis, conv) * ((basis === 'gold' ? p.au : p.ag) / TROY_OUNCE_G) * fx(cur);
};
/** Cap of one amount field: about 20 million US dollars in the chosen currency, rounded down to 1, 2 or 5 × 10^k.
 *  Above it the field says so (and keeps the cap) instead of silently taking a typing slip. */
export const amountMax = (cur: string, fallback: number) => {
  const r = MARKET.fx[cur]; if (!r) return fallback;
  const x = 2e7 * r, p = 10 ** Math.floor(Math.log10(x)), m = x / p;
  return (m >= 5 ? 5 : m >= 2 ? 2 : 1) * p;
};
