/** Display formats by language. Results in whole units; grams and rates with their useful decimals. */
import { formatMoney, formatNumber, formatPercent, formatDecimal, displayDate, type Lang } from './format';
import { CURRENCIES } from './engine/currencies';

/** Whole amount in a currency: "£1,234", "Rs 12,345"; Arabic "1,234 ر.س.". Small amounts keep cents. */
export const money = (x: number, cur: string, lang: Lang = 'en') => formatMoney(Math.abs(x) < 10 && x !== 0 ? Math.round(x * 100) / 100 : Math.round(x), Math.abs(x) < 10 && !Number.isInteger(Math.round(x * 100) / 100) ? 2 : 0, cur, lang);
/** Exact amount with its published decimals (fitr amounts, prices per gram). */
export const money2 = (x: number, cur: string, lang: Lang = 'en') => formatMoney(x, Number.isInteger(x) ? 0 : 2, cur, lang);
/** Currency symbol shown inside an amount field. */
export const symbolOf = (cur: string, lang: Lang = 'en') => {
  const parts = new Intl.NumberFormat(lang === 'ar' ? 'ar-u-nu-latn' : 'en-GB', { style: 'currency', currency: cur, currencyDisplay: 'narrowSymbol' }).formatToParts(1);
  return (parts.find((p) => p.type === 'currency')?.value ?? cur).replace(/[‎‏]/g, '');
};
export const pct = (x: number, d = 1, lang: Lang = 'en') => formatPercent(x, d, lang);
export const num = (x: number, d = 0, lang: Lang = 'en') => formatNumber(x, d, lang);
export const dec = (x: number, d = 2, lang: Lang = 'en') => formatDecimal(x, d, lang);
export const grams = (x: number, lang: Lang = 'en') => `${formatDecimal(x, 2, lang)}${lang === 'ar' ? ' غرام' : ' g'}`;
export const day = (iso: string, lang: Lang = 'en') => displayDate(iso.slice(0, 10), lang);
export const curName = (code: string, lang: Lang = 'en') => CURRENCIES.find((c) => c.code === code)?.[lang] ?? code;
