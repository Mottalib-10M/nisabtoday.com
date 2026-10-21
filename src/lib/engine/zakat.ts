/**
 * Zakat on wealth (zakat al-mal) for one person: assets valued in one currency on the zakat day, debts due
 * deducted or not, compared with the nisab of the day, 2.5 % for a lunar year or 2.577 % for a solar year.
 * Where the schools differ and the amount changes, the choice is an input and the page shows both results.
 */
import P from '../../data/params-2026.json';
import { goldGram, silverGram, nisab, type NisabBasis, type Convention } from './market';

export interface ZakatIn {
  cur: string;
  /** Cash at home and in bank accounts. */ cash: number;
  /** Gold held as savings (bars, coins), grams and carat. */ goldG: number; goldK: number;
  /** Gold jewellery worn by its owner, grams and carat. */ jewelG: number; jewelK: number;
  /** 'include' (Hanafi) or 'exclude' (Maliki, Shafi'i, Hanbali) for jewellery in normal personal use. */ jewelRule: 'include' | 'exclude';
  /** Silver, grams and fineness (999, 925). */ silverG: number; silverF: number;
  /** Shares and funds at market value. */ shares: number;
  /** 'trade' (bought to resell: whole market value) or 'invest' (held for dividends: zakatable part of the company). */ sharesMode: 'trade' | 'invest';
  /** Zakatable part of the company's assets, per cent, for 'invest'. */ investPct: number;
  /** Pension you could withdraw today, after the penalty and tax of an early withdrawal. */ pension: number;
  /** 'yearly' (zakat each year on the accessible amount) or 'receipt' (nothing until it is paid out). */ pensionRule: 'yearly' | 'receipt';
  /** Cryptocurrency held, market value. */ crypto: number;
  /** Business stock at sale value, and business cash not counted above. */ stock: number;
  /** Money others owe you and will repay. */ receivable: number;
  /** Rent and other income saved and still held (not the value of the property you live in or rent out). */ rentSaved: number;
  /** Debts due now (instalments due, bills, money owed this year). */ debts: number;
  /** 'deduct' (Hanafi, Hanbali, most fatwa bodies for debts due) or 'none' (Shafi'i). */ debtRule: 'deduct' | 'none';
  basis: NisabBasis; conv: Convention;
  /** 'lunar' 2.5 % or 'solar' 2.577 % (Gregorian year). */ year: 'lunar' | 'solar';
}
export const DEFAULT_IN: ZakatIn = {
  cur: 'USD', cash: 12000, goldG: 0, goldK: 22, jewelG: 0, jewelK: 22, jewelRule: 'include', silverG: 0, silverF: 925,
  shares: 0, sharesMode: 'trade', investPct: 100, pension: 0, pensionRule: 'yearly', crypto: 0, stock: 0, receivable: 0, rentSaved: 0,
  debts: 0, debtRule: 'deduct', basis: 'silver', conv: 'g85', year: 'lunar',
};
export type Line = 'cash' | 'gold' | 'jewel' | 'silver' | 'shares' | 'pension' | 'crypto' | 'stock' | 'receivable' | 'rent';
export interface ZakatOut {
  lines: Array<{ k: Line; value: number; counted: number; zakat: number }>;
  gross: number; debtsDeducted: number; net: number; nisab: number; due: boolean; rate: number; zakat: number;
}
export const rateOf = (year: 'lunar' | 'solar') => (year === 'solar' ? P.rate.solar : P.rate.lunar);

export function computeZakat(i: ZakatIn): ZakatOut {
  const pos = (x: number) => (Number.isFinite(x) && x > 0 ? x : 0);
  const gold = pos(i.goldG) * goldGram(i.goldK, i.cur);
  const jewel = pos(i.jewelG) * goldGram(i.jewelK, i.cur);
  const silver = pos(i.silverG) * silverGram(i.silverF, i.cur);
  const shareCounted = i.sharesMode === 'trade' ? pos(i.shares) : pos(i.shares) * Math.min(100, pos(i.investPct)) / 100;
  const raw: Array<[Line, number, number]> = [
    ['cash', pos(i.cash), pos(i.cash)],
    ['gold', gold, gold],
    ['jewel', jewel, i.jewelRule === 'include' ? jewel : 0],
    ['silver', silver, silver],
    ['shares', pos(i.shares), shareCounted],
    ['pension', pos(i.pension), i.pensionRule === 'yearly' ? pos(i.pension) : 0],
    ['crypto', pos(i.crypto), pos(i.crypto)],
    ['stock', pos(i.stock), pos(i.stock)],
    ['receivable', pos(i.receivable), pos(i.receivable)],
    ['rent', pos(i.rentSaved), pos(i.rentSaved)],
  ];
  const gross = raw.reduce((a, [, , c]) => a + c, 0);
  const debtsDeducted = i.debtRule === 'deduct' ? Math.min(pos(i.debts), gross) : 0;
  const net = gross - debtsDeducted;
  const n = nisab(i.basis, i.cur, i.conv);
  const due = net >= n && net > 0;
  const rate = rateOf(i.year);
  const zakat = due ? net * rate : 0;
  const factor = gross > 0 ? net / gross : 0;
  const lines = raw.filter(([, v]) => v > 0).map(([k, value, counted]) => ({ k, value, counted, zakat: due ? counted * factor * rate : 0 }));
  return { lines, gross, debtsDeducted, net, nisab: n, due, rate, zakat };
}

/** Zakat on a single amount (one asset type) with the nisab of the day; the threshold applies to the whole wealth. */
export function zakatOn(amount: number, cur: string, basis: NisabBasis = 'silver', conv: Convention = 'g85', year: 'lunar' | 'solar' = 'lunar') {
  const a = Math.max(0, amount);
  const n = nisab(basis, cur, conv);
  return { amount: a, nisab: n, due: a >= n && a > 0, zakat: a >= n ? a * rateOf(year) : 0 };
}
