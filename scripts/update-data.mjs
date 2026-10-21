#!/usr/bin/env node
/**
 * Relit les cours de l'or et de l'argent et les taux de change, puis réécrit src/data/market.json et ajoute le
 * point du jour à src/data/history.json (historique daté, commencé le 2026-10-21 ; aucun point passé n'est inventé).
 * Le workflow GitHub Actions le lance chaque jour avant le build.
 *
 *   node scripts/update-data.mjs            relève, contrôle, écrit
 *   node scripts/update-data.mjs --dry-run  relève et contrôle, affiche, n'écrit rien
 *
 * Sources (conditions relues le 2026-10-21, détail dans CONTRIBUTING-DONNEES.md) :
 *   Or, argent ........ https://api.gold-api.com/price/XAU et /price/XAG (USD l'once troy). Conditions §9 :
 *                       « Commercial use of the API is always permitted, including use in web applications ».
 *   Change (BCE) ...... https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml : taux de référence de la BCE,
 *                       réutilisation libre avec mention de la source. Prioritaire pour les monnaies qu'il couvre.
 *   Change (autres) ... https://open.er-api.com/v6/latest/USD (ExchangeRate-API, accès ouvert) : usage commercial pour
 *                       la conversion permis, attribution obligatoire, pas de redistribution du flux. Sert seulement
 *                       aux monnaies absentes du flux BCE (PKR, AED, SAR, NGN, EGP, BDT, KWD…), jamais publié en tableau.
 * Le script refuse d'écrire si un contrôle échoue (cours hors bornes, monnaie manquante, saut de plus de 25 % sur un
 * jour) : une mauvaise réponse n'atteint jamais le site, l'ancien fichier reste en place.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const DRY = process.argv.includes('--dry-run');
const MARKET = new URL('../src/data/market.json', import.meta.url);
const HISTORY = new URL('../src/data/history.json', import.meta.url);
/** Les 40 monnaies du sélecteur (src/lib/engine/currencies.ts). */
export const CODES = ['USD', 'GBP', 'EUR', 'CAD', 'AUD', 'NZD', 'PKR', 'INR', 'BDT', 'LKR', 'MYR', 'SGD', 'IDR', 'BND', 'AED', 'SAR', 'QAR', 'KWD', 'BHD', 'OMR', 'JOD', 'EGP', 'MAD', 'DZD', 'TND', 'TRY', 'ZAR', 'NGN', 'KES', 'XOF', 'CHF', 'SEK', 'NOK', 'DKK', 'JPY', 'CNY', 'HKD', 'UZS', 'KZT', 'AZN'];
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; zakat-calculator data refresh)' };

async function fetchText(url) {
  let last;
  for (let k = 0; k < 3; k++) {
    try {
      const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(20000) });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.text();
    } catch (e) { last = e; await new Promise((ok) => setTimeout(ok, 2000 * (k + 1))); }
  }
  throw new Error(`${url} : ${last?.message}`);
}

async function metals() {
  const out = {};
  for (const s of ['XAU', 'XAG']) {
    const j = JSON.parse(await fetchText(`https://api.gold-api.com/price/${s}`));
    if (j.currency !== 'USD' || typeof j.price !== 'number') throw new Error(`${s} : réponse inattendue`);
    out[s] = { usdPerOz: Math.round(j.price * 1000) / 1000, at: j.updatedAt };
  }
  if (!(out.XAU.usdPerOz > 500 && out.XAU.usdPerOz < 20000)) throw new Error(`or hors bornes : ${out.XAU.usdPerOz}`);
  if (!(out.XAG.usdPerOz > 5 && out.XAG.usdPerOz < 500)) throw new Error(`argent hors bornes : ${out.XAG.usdPerOz}`);
  return out;
}

async function ecb() {
  const xml = await fetchText('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml');
  const date = xml.match(/time=['"](\d{4}-\d{2}-\d{2})['"]/)?.[1];
  const perEur = { EUR: 1 };
  for (const m of xml.matchAll(/currency=['"]([A-Z]{3})['"]\s+rate=['"]([\d.]+)['"]/g)) perEur[m[1]] = parseFloat(m[2]);
  if (!date || !perEur.USD) throw new Error('flux BCE illisible');
  // Base USD : unités de monnaie pour 1 USD.
  const perUsd = Object.fromEntries(Object.entries(perEur).map(([c, r]) => [c, r / perEur.USD]));
  return { date, perUsd };
}

async function erApi() {
  const j = JSON.parse(await fetchText('https://open.er-api.com/v6/latest/USD'));
  if (j.result !== 'success' || j.base_code !== 'USD') throw new Error('ExchangeRate-API : réponse inattendue');
  return { date: new Date(j.time_last_update_unix * 1000).toISOString().slice(0, 10), perUsd: j.rates };
}

const old = existsSync(MARKET) ? JSON.parse(readFileSync(MARKET, 'utf8')) : null;
const m = await metals();
const e = await ecb();
const o = await erApi();
const fx = {}, src = {};
for (const c of CODES) {
  if (e.perUsd[c]) { fx[c] = e.perUsd[c]; src[c] = 'ECB'; }
  else if (o.perUsd[c]) { fx[c] = o.perUsd[c]; src[c] = 'ER'; }
  else throw new Error(`monnaie sans taux : ${c}`);
  fx[c] = Number(fx[c].toPrecision(8));
  if (old?.fx?.[c] && Math.abs(fx[c] / old.fx[c] - 1) > 0.25) throw new Error(`${c} : variation de plus de 25 % en un relevé (${old.fx[c]} → ${fx[c]})`);
}
for (const s of ['XAU', 'XAG']) {
  const prev = old?.[s === 'XAU' ? 'goldUsdOz' : 'silverUsdOz'];
  if (prev && Math.abs(m[s].usdPerOz / prev - 1) > 0.25) throw new Error(`${s} : variation de plus de 25 % en un relevé`);
}
const day = m.XAU.at.slice(0, 10);
const market = { goldUsdOz: m.XAU.usdPerOz, silverUsdOz: m.XAG.usdPerOz, metalsAt: m.XAU.at, ecbDate: e.date, erDate: o.date, fx, fxSource: src };
const history = existsSync(HISTORY) ? JSON.parse(readFileSync(HISTORY, 'utf8')) : [];
const point = { d: day, au: market.goldUsdOz, ag: market.silverUsdOz };
const next = [...history.filter((p) => p.d !== day), point].sort((a, b) => a.d.localeCompare(b.d));

console.log(`or ${market.goldUsdOz} USD/oz · argent ${market.silverUsdOz} USD/oz · relevé ${market.metalsAt}`);
console.log(`change : BCE du ${e.date} (${Object.values(src).filter((x) => x === 'ECB').length} monnaies), ExchangeRate-API du ${o.date} (${Object.values(src).filter((x) => x === 'ER').length})`);
console.log(`historique : ${next.length} point(s), du ${next[0].d} au ${next.at(-1).d}`);
if (DRY) process.exit(0);
writeFileSync(MARKET, JSON.stringify(market, null, 1) + '\n');
writeFileSync(HISTORY, JSON.stringify(next, null, 0).replace(/},{/g, '},\n{') + '\n');
