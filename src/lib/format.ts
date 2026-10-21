/** Formatage localisé, une locale par langue (RECETTE §4) : en → en-GB, ar → ar à chiffres latins. */
import { CURRENCY } from '../data/site-config';

export type Lang = 'en' | 'ar';
/** Arabe à chiffres latins : écriture des relevés bancaires et des barèmes publiés dans le Golfe et au Maghreb. */
export const NUM_TAG: Record<Lang, string> = { en: 'en-GB', ar: 'ar-u-nu-latn' };
const cache = new Map<string, Intl.NumberFormat>();
function nf(opts: Intl.NumberFormatOptions, lang: Lang = 'en'): Intl.NumberFormat {
  const k = lang + JSON.stringify(opts);
  if (!cache.has(k)) cache.set(k, new Intl.NumberFormat(NUM_TAG[lang], opts));
  return cache.get(k)!;
}
const clean = (s: string) => s.replace(/[‎‏؜]/g, '').replace(/\s/g, ' ');
/** Montant entier dans une monnaie : « £1,234 », « SAR 1,234 » ; en arabe « 1,234 ر.س. ». */
export function formatMoney(value: number, decimals = 0, currency = CURRENCY, lang: Lang = 'en'): string {
  return clean(nf({ style: 'currency', currency, currencyDisplay: 'narrowSymbol', minimumFractionDigits: decimals, maximumFractionDigits: decimals }, lang).format(value));
}
export function formatNumber(value: number, decimals = 0, lang: Lang = 'en'): string {
  return nf({ minimumFractionDigits: decimals, maximumFractionDigits: decimals }, lang).format(value);
}
/** Nombre tiré des paramètres : décimales utiles seulement (87.48 · 2.5 · 595). */
export function formatDecimal(value: number, max = 2, lang: Lang = 'en'): string {
  return nf({ maximumFractionDigits: max }, lang).format(value);
}
export function formatPercent(value: number, decimals = 1, lang: Lang = 'en'): string {
  return clean(nf({ style: 'percent', minimumFractionDigits: decimals, maximumFractionDigits: decimals }, lang).format(value)).replace(/(\d)\s?%/, '$1 %');
}
/** Chiffres arabes (٠١٢…, ۰۱۲…) et séparateurs arabes ramenés aux chiffres latins avant lecture. */
export function latinDigits(input: string): string {
  return input.replace(/[٠-٩]/g, (c) => String(c.charCodeAt(0) - 0x0660)).replace(/[۰-۹]/g, (c) => String(c.charCodeAt(0) - 0x06f0)).replace(/٫/g, '.').replace(/٬/g, ',');
}
export function parseLocaleNumber(input: string): number {
  const cleaned = latinDigits(input).replace(/[^\d.,-]/g, '');
  const lastComma = cleaned.lastIndexOf(','), lastDot = cleaned.lastIndexOf('.');
  let s = cleaned;
  if (lastComma > lastDot) s = /^-?\d{1,3}(,\d{3})+$/.test(cleaned) ? cleaned.replace(/,/g, '') : cleaned.replace(/\./g, '').replace(',', '.');
  else if (/^-?\d{1,3}(\.\d{3})+$/.test(cleaned)) s = cleaned.replace(/\./g, '');
  else s = cleaned.replace(/,/g, '');
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
}
/** Date en toutes lettres dans la langue de la page : « 21 October 2026 », « 21 أكتوبر 2026 ». UTC forcé. */
export function displayDate(iso: string, langTag: string): string {
  const tag = langTag.startsWith('ar') ? 'ar-u-ca-gregory-nu-latn' : langTag.startsWith('en') ? 'en-GB' : langTag;
  return new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString(tag, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
