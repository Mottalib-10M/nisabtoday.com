/**
 * Every calculator of the site, declared once (fields + run), in English and Arabic. Pages pick one with `tool` and
 * its defaults with `toolArg`; mini-simulators reuse the same specs (`h.mini(kind, …)`). All figures come from the
 * engines (src/lib/engine) and the files of src/data.
 */
import P from '../data/params-2026.json';
import type { Input, ToolSpec, V, ToolOut } from './tool-types';
import type { Lang } from './format';
import { CURRENCIES } from './engine/currencies';
import { gram, goldGram, silverGram, nisab, nisabGrams, PRICE_DAY, MARKET, type Convention, type NisabBasis } from './engine/market';
import { computeZakat, rateOf, DEFAULT_IN, type ZakatIn, type Line } from './engine/zakat';
import { distribute, netEstate, amounts, show, val, HEIR_KEYS, type Heirs, type HeirKey, type Note } from './engine/faraid';
import { hawlEnd, toHijri, showHijri } from './engine/hijri';
import { FITR, fitrRow, type FitrRow } from './engine/fitr';
import { money, money2, pct, num, dec, grams, day, curName } from './fmt';

type Maker = (lang: Lang, a: V) => ToolSpec;
const T = (lang: Lang) => (en: string, ar: string) => (lang === 'ar' ? ar : en);
const N = (x: V[string]) => Number(x) || 0;
const S = (x: V[string]) => String(x);
const defCur = (lang: Lang) => (lang === 'ar' ? 'SAR' : 'USD');
const G = (lang: Lang) => (lang === 'ar' ? 'غ' : 'g');

/* ---------- shared inputs ---------- */
const curIn = (lang: Lang, a: V, adv = false): Input => ({ id: 'cur', kind: 'select', label: T(lang)('Currency', 'العملة'), def: S(a.cur ?? defCur(lang)), adv, options: CURRENCIES.map((c) => ({ value: c.code, label: `${c.code} · ${c[lang]}` })) });
const basisIn = (lang: Lang, a: V, adv = false): Input => ({ id: 'basis', kind: 'choice', label: T(lang)('Nisab measured in', 'النصاب بحسب'), def: S(a.basis ?? 'silver'), adv, options: [{ value: 'silver', label: T(lang)('Silver', 'الفضة') }, { value: 'gold', label: T(lang)('Gold', 'الذهب') }] });
const convIn = (lang: Lang, a: V): Input => ({ id: 'conv', kind: 'select', adv: true, label: T(lang)('Nisab weights', 'أوزان النصاب'), def: S(a.conv ?? 'g85'), options: [
  { value: 'g85', label: T(lang)(`${P.nisab.conventions.g85.gold} g gold · ${P.nisab.conventions.g85.silver} g silver`, `${P.nisab.conventions.g85.gold} غرام ذهب · ${P.nisab.conventions.g85.silver} غرام فضة`) },
  { value: 'pk', label: T(lang)(`${P.nisab.conventions.pk.gold} g gold · ${P.nisab.conventions.pk.silver} g silver (Pakistan, 1980 Ordinance)`, `${P.nisab.conventions.pk.gold} غرام ذهب · ${P.nisab.conventions.pk.silver} غرام فضة (باكستان، مرسوم 1980)`) },
] });
const yearIn = (lang: Lang, a: V): Input => ({ id: 'year', kind: 'choice', adv: true, label: T(lang)('Your zakat year', 'سنة الزكاة'), def: S(a.year ?? 'lunar'), options: [{ value: 'lunar', label: T(lang)('Lunar 2.5 %', 'هجرية 2.5 %') }, { value: 'solar', label: T(lang)(`Solar ${pct(P.rate.solar, 3)}`, `ميلادية ${pct(P.rate.solar, 3, 'ar')}`) }] });
const amountIn = (id: string, label: string, def: number, extra: Partial<Input> = {}): Input => ({ id, label, def, curUnit: true, max: 1e12, ...extra } as Input);
const caratIn = (lang: Lang, id: string, def: string, adv = false): Input => ({ id, kind: 'select', adv, label: T(lang)('Carat', 'العيار'), def, options: ['24', '22', '21', '18', '14'].map((k) => ({ value: k, label: T(lang)(`${k} carat`, `عيار ${k}`) })) });
const priceDayNote = (lang: Lang) => T(lang)(`Gold and silver spot prices of ${day(PRICE_DAY, 'en')} (gold-api.com), exchange rates of the ECB or ExchangeRate-API.`, `أسعار الذهب والفضة الفورية بتاريخ ${day(PRICE_DAY, 'ar')} (gold-api.com)، وأسعار الصرف من البنك المركزي الأوروبي أو ExchangeRate-API.`);

/* ---------- zakat on wealth ---------- */
const LINE_LABEL: Record<Line, [string, string]> = {
  cash: ['Cash and bank', 'النقد والحسابات'], gold: ['Gold savings', 'ذهب الادخار'], jewel: ['Gold jewellery worn', 'حلي الذهب الملبوس'], silver: ['Silver', 'الفضة'],
  shares: ['Shares and funds', 'الأسهم والصناديق'], pension: ['Pension you can withdraw', 'التقاعد القابل للسحب'], crypto: ['Cryptocurrency', 'العملات المشفرة'],
  stock: ['Business stock', 'عروض التجارة'], receivable: ['Money owed to you', 'الديون المرجوة لك'], rent: ['Rent saved', 'الإيجار المدخر'],
};
const zakatTool: Maker = (lang, a) => {
  const t = T(lang);
  const inputs: Input[] = [
    curIn(lang, a), basisIn(lang, a),
    amountIn('cash', t('Cash and bank balances', 'النقد وأرصدة الحسابات'), N(a.cash ?? DEFAULT_IN.cash), { help: t('Everything you hold on your zakat day.', 'كل ما تملكه في يوم زكاتك.') }),
    { id: 'goldG', label: t('Gold savings (bars, coins)', 'ذهب الادخار (سبائك، عملات)'), def: N(a.goldG ?? 0), unit: G(lang), max: 100000, decimals: 2 },
    { id: 'jewelG', label: t('Gold jewellery you wear', 'حلي الذهب الملبوس'), def: N(a.jewelG ?? 0), unit: G(lang), max: 100000, decimals: 2 },
    amountIn('shares', t('Shares, funds, ISA, crypto', 'الأسهم والصناديق والعملات المشفرة'), N(a.shares ?? 0)),
    amountIn('pension', t('Pension you could withdraw now', 'التقاعد الذي يمكنك سحبه الآن'), N(a.pension ?? 0), { help: t('After the early-withdrawal penalty and tax.', 'بعد غرامة السحب المبكر والضريبة.') }),
    amountIn('stock', t('Business stock and receivables', 'عروض التجارة والديون المرجوة'), N(a.stock ?? 0)),
    amountIn('debts', t('Debts due now', 'الديون الحالّة الآن'), N(a.debts ?? 0), { help: t('Instalments and bills due this year, not a whole mortgage.', 'الأقساط والفواتير المستحقة هذا العام، لا كامل القرض العقاري.') }),
    caratIn(lang, 'goldK', S(a.goldK ?? '24'), true), caratIn(lang, 'jewelK', S(a.jewelK ?? '22'), true),
    { id: 'jewelRule', kind: 'choice', adv: true, label: t('Jewellery worn', 'الحلي الملبوس'), def: S(a.jewelRule ?? 'include'), options: [{ value: 'include', label: t('Counted (Hanafi)', 'تُزكّى (الحنفية)') }, { value: 'exclude', label: t('Exempt (majority)', 'لا زكاة (الجمهور)') }] },
    { id: 'silverG', adv: true, label: t('Silver', 'الفضة'), def: N(a.silverG ?? 0), unit: G(lang), max: 1000000, decimals: 2 },
    { id: 'sharesMode', kind: 'choice', adv: true, label: t('Shares held', 'الأسهم'), def: S(a.sharesMode ?? 'trade'), options: [{ value: 'trade', label: t('To resell', 'للمتاجرة') }, { value: 'invest', label: t('For dividends', 'للاستثمار') }] },
    { id: 'investPct', adv: true, label: t('Zakatable part of the companies', 'النسبة الزكوية من أصول الشركات'), def: N(a.investPct ?? 100), unit: '%', max: 100, decimals: 1, showIf: { id: 'sharesMode', is: 'invest' } },
    { id: 'pensionRule', kind: 'choice', adv: true, label: t('Pension', 'التقاعد'), def: S(a.pensionRule ?? 'yearly'), options: [{ value: 'yearly', label: t('Each year', 'كل عام') }, { value: 'receipt', label: t('When paid out', 'عند القبض') }] },
    { id: 'debtRule', kind: 'choice', adv: true, label: t('Debts due', 'الديون الحالّة'), def: S(a.debtRule ?? 'deduct'), options: [{ value: 'deduct', label: t('Deducted', 'تُخصم') }, { value: 'none', label: t('Not deducted', 'لا تُخصم') }] },
    convIn(lang, a), yearIn(lang, a),
  ];
  return {
    inputs,
    run: (v) => {
      const cur = S(v.cur);
      const z = computeZakat({ ...DEFAULT_IN, cur, cash: N(v.cash), goldG: N(v.goldG), goldK: N(v.goldK), jewelG: N(v.jewelG), jewelK: N(v.jewelK), jewelRule: S(v.jewelRule) as ZakatIn['jewelRule'],
        silverG: N(v.silverG), silverF: 925, shares: N(v.shares), sharesMode: S(v.sharesMode) as ZakatIn['sharesMode'], investPct: N(v.investPct), pension: N(v.pension), pensionRule: S(v.pensionRule) as ZakatIn['pensionRule'],
        crypto: 0, stock: N(v.stock), receivable: 0, rentSaved: 0, debts: N(v.debts), debtRule: S(v.debtRule) as ZakatIn['debtRule'], basis: S(v.basis) as NisabBasis, conv: S(v.conv) as Convention, year: S(v.year) as ZakatIn['year'] });
      const m = (x: number) => money(x, cur, lang);
      const rows: ToolOut['rows'] = z.lines.map((l) => [t(LINE_LABEL[l.k][0], LINE_LABEL[l.k][1]) + (l.counted < l.value ? t(` (${m(l.counted)} counted)`, ` (يُحتسب ${m(l.counted)})`) : ''), m(l.zakat), l.zakat]);
      if (z.debtsDeducted) rows.push([t('Debts deducted', 'الديون المخصومة'), `-${m(z.debtsDeducted)}`]);
      rows.push([t('Net zakatable wealth', 'صافي المال الزكوي'), m(z.net)]);
      rows.push([t(`Nisab today (${v.basis === 'gold' ? 'gold' : 'silver'})`, `النصاب اليوم (${v.basis === 'gold' ? 'الذهب' : 'الفضة'})`), m(z.nisab)]);
      return {
        label: t('Zakat due', 'الزكاة الواجبة'), value: m(z.zakat),
        sub: z.due ? t(`${pct(z.rate, z.rate === 0.025 ? 1 : 3)} of ${m(z.net)}: above the nisab`, `${pct(z.rate, z.rate === 0.025 ? 1 : 3, 'ar')} من ${m(z.net)}: فوق النصاب`) : t(`Below the nisab of ${m(z.nisab)}: no zakat on this wealth`, `دون النصاب البالغ ${m(z.nisab)}: لا زكاة على هذا المال`),
        rows, note: priceDayNote(lang),
      };
    },
  };
};

/* ---------- nisab ---------- */
const nisabTool: Maker = (lang, a) => {
  const t = T(lang);
  return {
    inputs: [curIn(lang, a), convIn(lang, a)],
    run: (v) => {
      const cur = S(v.cur), conv = S(v.conv) as Convention;
      const g = nisab('gold', cur, conv), s = nisab('silver', cur, conv);
      return {
        label: t(`Silver nisab today in ${cur}`, `نصاب الفضة اليوم بـ${curName(cur, 'ar')}`), value: money(s, cur, lang),
        sub: t(`Gold nisab: ${money(g, cur, lang)}`, `نصاب الذهب: ${money(g, cur, lang)}`),
        rows: [
          [t(`${dec(nisabGrams('silver', conv))} g of silver`, `${dec(nisabGrams('silver', conv), 2, 'ar')} غرام فضة`), money(s, cur, lang), s],
          [t(`${dec(nisabGrams('gold', conv))} g of gold`, `${dec(nisabGrams('gold', conv), 2, 'ar')} غرام ذهب`), money(g, cur, lang), g],
          [t('Gold, 1 g (24 carat)', 'غرام الذهب عيار 24'), money2(Math.round(gram('gold', cur) * 100) / 100, cur, lang)],
          [t('Silver, 1 g (fine)', 'غرام الفضة الخالصة'), money2(Math.round(gram('silver', cur) * 100) / 100, cur, lang)],
        ],
        note: priceDayNote(lang),
      };
    },
  };
};

/* ---------- gold and silver ---------- */
const goldTool: Maker = (lang, a) => {
  const t = T(lang);
  return {
    inputs: [
      { id: 'g', label: t('Weight of gold', 'وزن الذهب'), def: N(a.g ?? 100), unit: G(lang), max: 1e6, decimals: 2 },
      caratIn(lang, 'k', S(a.k ?? '22')),
      curIn(lang, a),
      { id: 'worn', kind: 'choice', label: t('Jewellery you wear', 'حلي ملبوس'), def: S(a.worn ?? 'no'), options: [{ value: 'no', label: t('No', 'لا') }, { value: 'yes', label: t('Yes', 'نعم') }] },
      yearIn(lang, a),
    ],
    run: (v) => {
      const cur = S(v.cur), k = N(v.k), g = Math.max(0, N(v.g));
      const pure = (g * k) / 24, value = g * goldGram(k, cur), r = rateOf(S(v.year) as 'lunar');
      const nis = nisabGrams('gold');
      const reaches = pure >= nis;
      const z = reaches ? value * r : 0;
      const worn = S(v.worn) === 'yes';
      return {
        label: worn ? t('Zakat on this jewellery (Hanafi)', 'زكاة هذا الحلي (عند الحنفية)') : t('Zakat on this gold', 'زكاة هذا الذهب'), value: money(z, cur, lang),
        sub: worn ? t(`Maliki, Shafi'i and Hanbali: ${money(0, cur, lang)} on jewellery in normal personal use`, `المالكية والشافعية والحنابلة: ${money(0, cur, 'ar')} على الحلي المعدّ للاستعمال المباح`) : (reaches ? t(`${dec(pure)} g of pure gold: above the ${nis} g nisab`, `${dec(pure, 2, 'ar')} غرام ذهب خالص: فوق نصاب ${nis} غرامًا`) : t(`${dec(pure)} g of pure gold: below ${nis} g, zakat only with your other wealth`, `${dec(pure, 2, 'ar')} غرام ذهب خالص: دون ${nis} غرامًا، فلا زكاة إلا بضمه إلى بقية مالك`)),
        rows: [
          [t('Value today', 'القيمة اليوم'), money(value, cur, lang), value],
          [t('Pure gold content', 'الذهب الخالص'), grams(pure, lang)],
          [t(`Price of 1 g, ${k} carat`, `سعر الغرام عيار ${k}`), money2(Math.round(goldGram(k, cur) * 100) / 100, cur, lang)],
          [t('Gold nisab today', 'نصاب الذهب اليوم'), money(nisab('gold', cur), cur, lang)],
        ],
        note: priceDayNote(lang),
      };
    },
  };
};
const silverTool: Maker = (lang, a) => {
  const t = T(lang);
  return {
    inputs: [
      { id: 'g', label: t('Weight of silver', 'وزن الفضة'), def: N(a.g ?? 1000), unit: G(lang), max: 1e7, decimals: 2 },
      { id: 'f', kind: 'select', label: t('Fineness', 'درجة النقاء'), def: S(a.f ?? '925'), options: [{ value: '999', label: t('999 fine', '999') }, { value: '925', label: t('925 sterling', '925') }, { value: '900', label: '900' }, { value: '800', label: '800' }] },
      curIn(lang, a),
    ],
    run: (v) => {
      const cur = S(v.cur), f = N(v.f), g = Math.max(0, N(v.g));
      const pure = (g * f) / 1000, value = g * silverGram(f, cur), nis = nisabGrams('silver');
      const z = pure >= nis ? value * P.rate.lunar : 0;
      return {
        label: t('Zakat on this silver', 'زكاة هذه الفضة'), value: money(z, cur, lang),
        sub: pure >= nis ? t(`${dec(pure)} g of fine silver: above the ${nis} g nisab`, `${dec(pure, 2, 'ar')} غرام فضة خالصة: فوق نصاب ${nis} غرامًا`) : t(`${dec(pure)} g of fine silver: below ${nis} g on its own`, `${dec(pure, 2, 'ar')} غرام فضة خالصة: دون ${nis} غرامًا وحدها`),
        rows: [[t('Value today', 'القيمة اليوم'), money(value, cur, lang), value], [t('Fine silver content', 'الفضة الخالصة'), grams(pure, lang)], [t('Silver nisab today', 'نصاب الفضة اليوم'), money(nisab('silver', cur), cur, lang)]],
        note: priceDayNote(lang),
      };
    },
  };
};

/* ---------- one asset against the nisab ---------- */
const single = (cfg: { id: string; en: string; ar: string; def: number; help?: [string, string] }): Maker => (lang, a) => {
  const t = T(lang);
  return {
    inputs: [amountIn('amt', t(cfg.en, cfg.ar), N(a.amt ?? cfg.def), cfg.help ? { help: t(cfg.help[0], cfg.help[1]) } : {}), curIn(lang, a), basisIn(lang, a), yearIn(lang, a)],
    run: (v) => {
      const cur = S(v.cur), amt = Math.max(0, N(v.amt)), n = nisab(S(v.basis) as NisabBasis, cur), r = rateOf(S(v.year) as 'lunar');
      const z = amt >= n ? amt * r : 0;
      return {
        label: t('Zakat due', 'الزكاة الواجبة'), value: money(z, cur, lang),
        sub: amt >= n ? t(`${pct(r, r === 0.025 ? 1 : 3)} of ${money(amt, cur, lang)}`, `${pct(r, r === 0.025 ? 1 : 3, 'ar')} من ${money(amt, cur, lang)}`) : t(`Below the nisab of ${money(n, cur, lang)} on its own`, `دون النصاب البالغ ${money(n, cur, lang)} وحده`),
        rows: [[t('Amount counted', 'المبلغ المحتسب'), money(amt, cur, lang), amt], [t('Nisab today', 'النصاب اليوم'), money(n, cur, lang)], [t('Per month of saving', 'لكل شهر'), money(z / 12, cur, lang)]],
        note: priceDayNote(lang),
      };
    },
  };
};

const sharesTool: Maker = (lang, a) => {
  const t = T(lang);
  return {
    inputs: [
      amountIn('amt', t('Market value of your shares', 'القيمة السوقية لأسهمك'), N(a.amt ?? 20000)),
      { id: 'mode', kind: 'choice', label: t('You hold them', 'تملكها'), def: S(a.mode ?? 'trade'), options: [{ value: 'trade', label: t('To resell', 'للمتاجرة') }, { value: 'invest', label: t('For dividends', 'للاستثمار') }] },
      { id: 'pc', label: t('Zakatable assets of the company', 'الأصول الزكوية للشركة'), def: N(a.pc ?? 30), unit: '%', max: 100, decimals: 1, showIf: { id: 'mode', is: 'invest' }, wide: true, help: t('Cash, receivables and stock ÷ total assets, from its accounts.', 'النقد والذمم والمخزون ÷ مجموع الأصول، من قوائمها المالية.') },
      curIn(lang, a), basisIn(lang, a, true),
    ],
    run: (v) => {
      const cur = S(v.cur), amt = Math.max(0, N(v.amt)), inv = S(v.mode) === 'invest';
      const counted = inv ? (amt * Math.min(100, Math.max(0, N(v.pc)))) / 100 : amt;
      const n = nisab(S(v.basis) as NisabBasis, cur);
      const z = counted >= n ? counted * P.rate.lunar : 0;
      return {
        label: t('Zakat on these shares', 'زكاة هذه الأسهم'), value: money(z, cur, lang),
        sub: inv ? t(`On ${money(counted, cur, lang)}, the zakatable part of the companies`, `على ${money(counted, cur, lang)}، الجزء الزكوي من أصول الشركات`) : t('On the whole market value, like trade goods', 'على كامل القيمة السوقية، كعروض التجارة'),
        rows: [[t('Market value', 'القيمة السوقية'), money(amt, cur, lang), amt], [t('Value counted', 'القيمة المحتسبة'), money(counted, cur, lang), counted], [t('If held to resell', 'لو كانت للمتاجرة'), money(amt >= n ? amt * P.rate.lunar : 0, cur, lang)], [t('Nisab today', 'النصاب اليوم'), money(n, cur, lang)]],
        note: t('Below the nisab on its own, the shares still count with the rest of your wealth.', 'إن كانت دون النصاب وحدها فإنها تُضم إلى بقية مالك.'),
      };
    },
  };
};

const pensionTool: Maker = (lang, a) => {
  const t = T(lang);
  return {
    inputs: [
      amountIn('bal', t('Pension pot value', 'رصيد صندوق التقاعد'), N(a.bal ?? 60000)),
      { id: 'pen', label: t('Early withdrawal penalty', 'غرامة السحب المبكر'), def: N(a.pen ?? 10), unit: '%', max: 100, decimals: 1 },
      { id: 'tax', label: t('Tax on a withdrawal', 'الضريبة على السحب'), def: N(a.tax ?? 20), unit: '%', max: 100, decimals: 1 },
      { id: 'acc', kind: 'choice', label: t('Can you withdraw today?', 'هل يمكنك السحب اليوم؟'), def: S(a.acc ?? 'yes'), options: [{ value: 'yes', label: t('Yes', 'نعم') }, { value: 'no', label: t('No', 'لا') }] },
      curIn(lang, a), basisIn(lang, a, true),
    ],
    run: (v) => {
      const cur = S(v.cur), bal = Math.max(0, N(v.bal));
      const net = bal * (1 - Math.min(100, N(v.pen)) / 100) * (1 - Math.min(100, N(v.tax)) / 100);
      const acc = S(v.acc) === 'yes';
      const n = nisab(S(v.basis) as NisabBasis, cur);
      const z = acc && net >= n ? net * P.rate.lunar : 0;
      return {
        label: t('Zakat this year on the pension', 'زكاة التقاعد هذا العام'), value: money(z, cur, lang),
        sub: acc ? t(`On ${money(net, cur, lang)} you could take out after penalty and tax`, `على ${money(net, cur, lang)} يمكنك سحبها بعد الغرامة والضريبة`) : t('Not accessible: no zakat until it is paid to you, on the view that counts only what you can reach', 'غير متاح: لا زكاة حتى تقبضه، على القول باعتبار ما يمكن الوصول إليه'),
        rows: [[t('Pot value', 'رصيد الصندوق'), money(bal, cur, lang), bal], [t('Accessible after penalty and tax', 'المتاح بعد الغرامة والضريبة'), money(net, cur, lang), net], [t('If counted at full value', 'لو احتُسب بكامل رصيده'), money(bal >= n ? bal * P.rate.lunar : 0, cur, lang)]],
        note: t('Views differ on locked pensions: see the page for each position and its source.', 'تختلف الآراء في التقاعد المقفل: انظر الصفحة لكل رأي ومصدره.'),
      };
    },
  };
};

const businessTool: Maker = (lang, a) => {
  const t = T(lang);
  return {
    inputs: [
      amountIn('stock', t('Stock at today’s sale value', 'المخزون بسعر البيع اليوم'), N(a.stock ?? 40000)),
      amountIn('cash', t('Business cash and bank', 'نقد المنشأة وحساباتها'), N(a.cash ?? 15000)),
      amountIn('rec', t('Customer debts you expect to collect', 'ديون العملاء المرجوة'), N(a.rec ?? 8000)),
      amountIn('pay', t('Supplier bills and debts due', 'ديون الموردين الحالّة'), N(a.pay ?? 12000)),
      curIn(lang, a), basisIn(lang, a, true), yearIn(lang, a),
    ],
    run: (v) => {
      const cur = S(v.cur), gross = Math.max(0, N(v.stock)) + Math.max(0, N(v.cash)) + Math.max(0, N(v.rec));
      const net = Math.max(0, gross - Math.max(0, N(v.pay)));
      const n = nisab(S(v.basis) as NisabBasis, cur), r = rateOf(S(v.year) as 'lunar');
      const z = net >= n ? net * r : 0;
      return {
        label: t('Zakat on the business', 'زكاة عروض التجارة'), value: money(z, cur, lang),
        sub: t(`${pct(r, r === 0.025 ? 1 : 3)} of ${money(net, cur, lang)} of working capital`, `${pct(r, r === 0.025 ? 1 : 3, 'ar')} من ${money(net, cur, lang)} صافي رأس المال العامل`),
        rows: [[t('Stock, cash and receivables', 'المخزون والنقد والذمم'), money(gross, cur, lang), gross], [t('Debts due deducted', 'الديون الحالّة المخصومة'), `-${money(Math.min(gross, Math.max(0, N(v.pay))), cur, lang)}`], [t('Nisab today', 'النصاب اليوم'), money(n, cur, lang)]],
        note: t('Premises, machines and vehicles used in the business are not counted.', 'لا تُحتسب المباني والآلات والسيارات المستعملة في النشاط.'),
      };
    },
  };
};

const debtsTool: Maker = (lang, a) => {
  const t = T(lang);
  return {
    inputs: [amountIn('assets', t('Zakatable assets', 'الأموال الزكوية'), N(a.assets ?? 15000)), amountIn('debts', t('Debts due now', 'الديون الحالّة الآن'), N(a.debts ?? 6000)), amountIn('owed', t('Money owed to you, sure to be repaid', 'دين لك مرجو السداد'), N(a.owed ?? 2000)), curIn(lang, a), basisIn(lang, a, true)],
    run: (v) => {
      const cur = S(v.cur), assets = Math.max(0, N(v.assets)) + Math.max(0, N(v.owed)), d = Math.max(0, N(v.debts));
      const n = nisab(S(v.basis) as NisabBasis, cur);
      const ded = Math.max(0, assets - d), zd = ded >= n ? ded * P.rate.lunar : 0, zn = assets >= n ? assets * P.rate.lunar : 0;
      return {
        label: t('Zakat with debts deducted', 'الزكاة مع خصم الديون'), value: money(zd, cur, lang),
        sub: t(`Without deducting them: ${money(zn, cur, lang)}`, `دون خصمها: ${money(zn, cur, lang)}`),
        rows: [[t('Assets with money owed to you', 'الأموال مع الدين المرجو'), money(assets, cur, lang), assets], [t('After debts due', 'بعد الديون الحالّة'), money(ded, cur, lang), ded], [t('Nisab today', 'النصاب اليوم'), money(n, cur, lang)]],
      };
    },
  };
};

const rateTool: Maker = (lang, a) => {
  const t = T(lang);
  return {
    inputs: [amountIn('amt', t('Zakatable wealth', 'المال الزكوي'), N(a.amt ?? 10000)), curIn(lang, a)],
    run: (v) => {
      const cur = S(v.cur), amt = Math.max(0, N(v.amt));
      return {
        label: t('2.5 % of your wealth (lunar year)', '2.5 % من مالك (سنة هجرية)'), value: money(amt * P.rate.lunar, cur, lang),
        rows: [[t(`Solar year, ${pct(P.rate.solar, 3)}`, `سنة ميلادية ${pct(P.rate.solar, 3, 'ar')}`), money(amt * P.rate.solar, cur, lang)], [t('One fortieth (÷ 40)', 'ربع العشر (÷ 40)'), money(amt / 40, cur, lang)], [t('Difference solar − lunar', 'الفرق بين الميلادية والهجرية'), money(amt * (P.rate.solar - P.rate.lunar), cur, lang)]],
      };
    },
  };
};

/* ---------- hawl ---------- */
const MONTHS: Record<Lang, string[]> = { en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'] };
const BUILD_DAY: string = typeof __BUILD_DAY__ !== 'undefined' ? __BUILD_DAY__ : PRICE_DAY;
const hawlTool: Maker = (lang, a) => {
  const t = T(lang);
  return {
    inputs: [
      { id: 'd', label: t('Day', 'اليوم'), def: N(a.d ?? Number(BUILD_DAY.slice(8, 10))), max: 31, now: a.d === undefined ? 'd' : undefined },
      { id: 'm', kind: 'select', label: t('Month', 'الشهر'), def: S(a.m ?? Number(BUILD_DAY.slice(5, 7))), now: a.m === undefined ? 'm' : undefined, options: MONTHS[lang].map((x, i) => ({ value: String(i + 1), label: x })) },
      { id: 'y', kind: 'select', label: t('Year', 'السنة'), def: S(a.y ?? BUILD_DAY.slice(0, 4)), now: a.y === undefined ? 'y' : undefined, options: ['2024', '2025', '2026', '2027'].map((x) => ({ value: x, label: x })) },
    ],
    run: (v) => {
      const y = N(v.y), m = N(v.m), dmax = new Date(Date.UTC(y, m, 0)).getUTCDate();
      const d = Math.min(dmax, Math.max(1, Math.round(N(v.d)) || 1));
      const iso = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const h = hawlEnd(iso);
      return {
        label: t('Your zakat falls due on', 'تجب زكاتك في'), value: day(h.end, lang),
        sub: showHijri(h.hEnd, lang),
        rows: [[t('Start of your year', 'بداية حولك'), `${day(iso, lang)} · ${showHijri(h.hStart, lang)}`], [t('Length of the lunar year', 'مدة الحول الهجري'), t(`${h.days} days`, `${h.days} يومًا`)], [t('A solar year would end', 'تنتهي السنة الميلادية في'), day(`${y + 1}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`, lang)]],
        note: t('Umm al-Qura calendar. Where the month starts by moon sighting, the date can move by one day.', 'تقويم أم القرى. حيث يبدأ الشهر برؤية الهلال قد يتقدم التاريخ أو يتأخر يومًا.'),
      };
    },
  };
};

/* ---------- who can receive ---------- */
const receiveTool: Maker = (lang, a) => {
  const t = T(lang);
  return {
    inputs: [amountIn('own', t('What the person owns beyond basic needs', 'ما يملكه الشخص زائدًا عن حاجاته الأصلية'), N(a.own ?? 300), { wide: true, help: t('Savings, gold, goods for sale; not the home, clothes or tools of work.', 'المدخرات والذهب وعروض التجارة؛ لا المسكن ولا الثياب ولا أدوات العمل.') }), curIn(lang, a), basisIn(lang, a, true)],
    run: (v) => {
      const cur = S(v.cur), own = Math.max(0, N(v.own)), n = nisab(S(v.basis) as NisabBasis, cur);
      const below = own < n;
      return {
        label: t('Under the nisab test', 'بحسب معيار النصاب'), value: below ? t('Can receive', 'يجوز له الأخذ') : t('Owns the nisab', 'يملك النصاب'),
        sub: below ? t(`Owns ${money(own, cur, lang)}, less than the nisab of ${money(n, cur, lang)}`, `يملك ${money(own, cur, lang)}، أقل من النصاب البالغ ${money(n, cur, lang)}`) : t('Hanafi test: someone who owns the nisab beyond needs does not take zakat as poor', 'معيار الحنفية: من ملك نصابًا فاضلًا عن حاجته لا يأخذ الزكاة بوصف الفقر'),
        rows: [[t('Surplus wealth', 'المال الفاضل'), money(own, cur, lang), own], [t('Nisab today', 'النصاب اليوم'), money(n, cur, lang), n]],
        note: t('The other schools measure need differently; ask a scholar you trust. Debtors, travellers and the other categories have their own rules.', 'وللمذاهب الأخرى ضابط آخر للحاجة، فاسأل عالمًا تثق به. وللغارمين وابن السبيل وبقية الأصناف أحكامهم.'),
      };
    },
  };
};

/* ---------- inheritance ---------- */
export const HEIR_LABEL: Record<HeirKey, [string, string]> = {
  husband: ['Husband', 'الزوج'], wives: ['Wife or wives', 'الزوجة أو الزوجات'], sons: ['Sons', 'الأبناء'], daughters: ['Daughters', 'البنات'],
  sonsSons: ["Son's sons", 'أبناء الابن'], sonsDaughters: ["Son's daughters", 'بنات الابن'], father: ['Father', 'الأب'], mother: ['Mother', 'الأم'],
  grandfather: ['Paternal grandfather', 'الجد لأب'], patGrandmother: ['Paternal grandmother', 'الجدة لأب'], matGrandmother: ['Maternal grandmother', 'الجدة لأم'],
  fullBrothers: ['Full brothers', 'الإخوة الأشقاء'], fullSisters: ['Full sisters', 'الأخوات الشقيقات'], patBrothers: ['Paternal half-brothers', 'الإخوة لأب'], patSisters: ['Paternal half-sisters', 'الأخوات لأب'], matSiblings: ['Maternal half-siblings', 'الإخوة لأم'],
};
export const NOTE_TEXT: Record<Note, [string, string]> = {
  awl: ["'Awl: the fixed shares add up to more than the estate, so each is reduced in proportion.", 'عَول: زادت الفروض على التركة فنقص كل فرض بنسبته.'],
  radd: ['Radd: no residuary heir, so the surplus returns to the fixed-share heirs other than the spouse.', 'ردّ: لا عاصب، فيُردّ الباقي على أصحاب الفروض عدا الزوجين.'],
  'spouse-surplus': ['Only the spouse inherits: the rest goes to distant kindred, or by many modern laws back to the spouse. Not allocated here.', 'لا وارث إلا الزوج أو الزوجة: الباقي لذوي الأرحام، أو يُردّ على الزوج في كثير من القوانين الحديثة. لم يُوزع هنا.'],
  'grandfather-siblings': ['Grandfather with brothers or sisters: computed on the view of Abu Hanifa (he excludes them). The other schools let them share with him.', 'الجد مع الإخوة: حُسب على قول أبي حنيفة (يحجبهم). وعند بقية المذاهب يقاسمونه.'],
  mushtaraka: ["Al-mushtaraka: Hanafi and Hanbali give the full brothers nothing; Maliki and Shafi'i let them share the maternal siblings' third. Switch the option to see both.", 'المسألة المشتركة: لا شيء للأشقاء عند الحنفية والحنابلة، ويشاركون الإخوة لأم في الثلث عند المالكية والشافعية. غيّر الخيار لترى الحالتين.'],
  'distant-residuaries': ['A nephew, paternal uncle or cousin through males would take the remainder before any radd. They are not part of this calculator.', 'ابن الأخ والعم وابن العم يأخذون الباقي قبل الرد، وهم خارج هذه الحاسبة.'],
  'paternal-grandmother-father': ['Paternal grandmother with the father: excluded on the majority view; the Hanbali school lets her inherit.', 'الجدة لأب مع الأب: محجوبة عند الجمهور، وترث عند الحنابلة.'],
  umariyya: ["Al-'umariyyatan: the mother takes one third of what is left after the spouse.", 'العُمَريتان: للأم ثلث الباقي بعد فرض الزوج أو الزوجة.'],
  'no-heirs': ['None of the listed heirs: the estate goes to more distant relatives.', 'لا وارث من المذكورين: تذهب التركة إلى أقارب أبعد.'],
};
const BASIS_TEXT: Record<string, [string, string]> = { fard: ['fixed share', 'فرض'], 'fard+residue': ['1/6 and the rest', 'السدس والباقي تعصيبًا'], residue: ['residue', 'تعصيب'], umariyya: ['1/3 of the rest', 'ثلث الباقي'], takmila: ['1/6 completing 2/3', 'السدس تكملة الثلثين'], mushtaraka: ['shares the third', 'تشارك في الثلث'] };
const faraidTool: Maker = (lang, a) => {
  const t = T(lang);
  const cnt = (id: HeirKey, def: number, max: number, adv = false, showIf?: { id: string; is: string }): Input => ({ id, label: t(HEIR_LABEL[id][0], HEIR_LABEL[id][1]), def: N(a[id] ?? def), max, adv, showIf });
  const yn = (id: HeirKey, def: number, adv = false): Input => ({ id, kind: 'choice', label: t(HEIR_LABEL[id][0], HEIR_LABEL[id][1]), def: String(a[id] ?? def), adv, options: [{ value: '0', label: t('No', 'لا') }, { value: '1', label: t('Yes', 'نعم') }] });
  return {
    inputs: [
      { id: 'dec', kind: 'choice', label: t('The deceased', 'المتوفى'), def: S(a.dec ?? 'male'), options: [{ value: 'male', label: t('A man', 'رجل') }, { value: 'female', label: t('A woman', 'امرأة') }] },
      amountIn('estate', t('Estate after funeral costs', 'التركة بعد تجهيز الميت'), N(a.estate ?? 120000)),
      cnt('wives', 1, 4, false, { id: 'dec', is: 'male' }), yn('husband', 1, false), cnt('sons', 1, 30), cnt('daughters', 1, 30), yn('father', 0), yn('mother', 1),
      curIn(lang, a, true),
      amountIn('debts', t('Debts of the deceased', 'ديون المتوفى'), N(a.debts ?? 0), { adv: true }),
      amountIn('beq', t('Bequest (wasiyya)', 'الوصية'), N(a.beq ?? 0), { adv: true, help: t('At most one third, never to an heir.', 'في حدود الثلث، ولا وصية لوارث.') }),
      cnt('sonsSons', 0, 30, true), cnt('sonsDaughters', 0, 30, true), yn('grandfather', 0, true), yn('patGrandmother', 0, true), yn('matGrandmother', 0, true),
      cnt('fullBrothers', 0, 30, true), cnt('fullSisters', 0, 30, true), cnt('patBrothers', 0, 30, true), cnt('patSisters', 0, 30, true), cnt('matSiblings', 0, 30, true),
      { id: 'mush', kind: 'choice', adv: true, label: t('Al-mushtaraka', 'المسألة المشتركة'), def: S(a.mush ?? 'exclude'), options: [{ value: 'exclude', label: t('Hanafi, Hanbali', 'الحنفية والحنابلة') }, { value: 'share', label: t("Maliki, Shafi'i", 'المالكية والشافعية') }] },
    ].map((i) => (i.id === 'husband' ? { ...i, showIf: { id: 'dec', is: 'female' } } : i)) as Input[],
    run: (v) => {
      const cur = S(v.cur), dec2 = S(v.dec) as Heirs['deceased'];
      const h = { deceased: dec2 } as Heirs;
      for (const k of HEIR_KEYS) (h as unknown as Record<string, number>)[k] = Math.max(0, Math.round(N(v[k])));
      const r = distribute(h, { mushtaraka: S(v.mush) as 'share' | 'exclude' });
      const est = netEstate(Math.max(0, N(v.estate)), N(v.debts), N(v.beq));
      const rows = amounts(r, est.net);
      const lead = rows.find((x) => x.key === (dec2 === 'male' ? 'wives' : 'husband')) ?? rows[0];
      return {
        label: lead ? t(`${HEIR_LABEL[lead.key][0]}: share of the estate`, `نصيب ${HEIR_LABEL[lead.key][1]}`) : t('No heir entered', 'لم يُدخل وارث'),
        value: lead ? money(lead.groupAmount, cur, lang) : money(0, cur, lang),
        sub: lead ? `${show(lead.total)} · ${pct(val(lead.total), 1, lang)}` : undefined,
        rows: rows.slice(0, 6).map((x) => [`${t(HEIR_LABEL[x.key][0], HEIR_LABEL[x.key][1])}${x.count > 1 ? ` ×${x.count}` : ''}`, money(x.groupAmount, cur, lang), x.groupAmount]),
        table: {
          caption: t(`Estate shared: ${money(est.net, cur, lang)} after debts and a bequest of ${money(est.bequestPaid, cur, lang)}${est.capped ? ' (capped at one third)' : ''}. Common base ${r.base}${r.awl ? `, 'awl from ${r.awl.from} to ${r.awl.to}` : ''}.`, `التركة الموزعة: ${money(est.net, cur, lang)} بعد الديون ووصية قدرها ${money(est.bequestPaid, cur, lang)}${est.capped ? ' (رُدّت إلى الثلث)' : ''}. أصل المسألة ${r.base}${r.awl ? `، عالت من ${r.awl.from} إلى ${r.awl.to}` : ''}.`),
          headers: [t('Heir', 'الوارث'), t('Basis', 'السبب'), t('Share', 'النصيب'), t('Each', 'لكل واحد'), t('Amount each', 'المبلغ لكل واحد')],
          rows: [
            ...rows.map((x) => [`${t(HEIR_LABEL[x.key][0], HEIR_LABEL[x.key][1])}${x.count > 1 ? ` ×${x.count}` : ''}`, t(BASIS_TEXT[x.basis][0], BASIS_TEXT[x.basis][1]), show(x.total), show(x.perHead), money(x.headAmount, cur, lang)]),
            ...r.excluded.map((e) => [t(HEIR_LABEL[e.key][0], HEIR_LABEL[e.key][1]), t(`excluded by ${e.by.map((b) => HEIR_LABEL[b][0].toLowerCase()).join(', ')}`, `محجوب بـ${e.by.map((b) => HEIR_LABEL[b][1]).join('، ')}`), '0', '0', money(0, cur, lang)]),
          ],
          align: ['l', 'l', 'r', 'r', 'r'],
        },
        note: r.notes.map((n) => t(NOTE_TEXT[n][0], NOTE_TEXT[n][1])).join(' ') || undefined,
      };
    },
  };
};

/* ---------- zakat al-fitr, fidya, kaffarah ---------- */
const bodyIn = (lang: Lang, a: V, kind: 'fitr' | 'fidya' | 'kaffarah'): Input => {
  const rows = FITR.filter((r) => r[kind] !== undefined);
  return { id: 'body', kind: 'select', label: T(lang)('Amount published by', 'المبلغ المعلن من'), def: S(a.body ?? rows[0]?.id ?? 'own'), options: [...rows.map((r) => ({ value: r.id, label: `${r.country[lang]} · ${r.body[lang]}` })), { value: 'own', label: T(lang)('My own amount', 'مبلغ أحدده بنفسي') }] };
};
const perIn = (lang: Lang, a: V, label: [string, string]): Input => ({ id: 'per', label: T(lang)(label[0], label[1]), def: N(a.per ?? 10), max: 1e9, decimals: 2, showIf: { id: 'body', is: 'own' } });
const fromBody = (v: V, kind: 'fitr' | 'fidya' | 'kaffarah'): { amt: number; cur: string; row?: FitrRow } => {
  const r = fitrRow(S(v.body));
  if (r && r[kind] !== undefined) return { amt: r[kind]!, cur: r.cur, row: r };
  return { amt: Math.max(0, N(v.per)), cur: '' };
};
const fitrTool: Maker = (lang, a) => {
  const t = T(lang);
  return {
    inputs: [{ id: 'n', label: t('People in your household', 'عدد أفراد الأسرة'), def: N(a.n ?? 4), max: 100 }, bodyIn(lang, a, 'fitr'), perIn(lang, a, ['Amount per person', 'المبلغ عن الفرد'])],
    run: (v) => {
      const n = Math.max(0, Math.round(N(v.n))), b = fromBody(v, 'fitr');
      const m = (x: number) => (b.cur ? money2(Math.round(x * 100) / 100, b.cur, lang) : num(x, 2, lang));
      return {
        label: t('Zakat al-fitr for the household', 'زكاة الفطر عن الأسرة'), value: m(n * b.amt),
        sub: b.row ? t(`${m(b.amt)} per person, ${b.row.body.en}, Ramadan ${b.row.year}`, `${m(b.amt)} عن الفرد، ${b.row.body.ar}، رمضان ${b.row.year}`) : t('Your amount per person', 'المبلغ الذي حددته عن الفرد'),
        rows: [[t('People', 'الأفراد'), num(n, 0, lang)], [t('Per person', 'عن الفرد'), m(b.amt)], ...(b.row?.basis ? [[t('Basis', 'الأساس'), b.row.basis[lang]] as [string, string]] : [])],
        note: b.row ? t(`Published ${day(b.row.date, 'en')}. Amounts for 1448 (2027) are to be published before Ramadan.`, `نُشر في ${day(b.row.date, 'ar')}. مبالغ 1448 (2027) لم تُعلن بعد وتصدر قبل رمضان.`) : undefined,
      };
    },
  };
};
const fidyaTool: Maker = (lang, a) => {
  const t = T(lang);
  return {
    inputs: [{ id: 'days', label: t('Fasts missed and not made up', 'الأيام التي لا يُستطاع قضاؤها'), def: N(a.days ?? 30), max: 3000 }, bodyIn(lang, a, 'fidya'), perIn(lang, a, ['Meal for one poor person', 'إطعام مسكين واحد'])],
    run: (v) => {
      const d = Math.max(0, Math.round(N(v.days))), b = fromBody(v, 'fidya');
      const m = (x: number) => (b.cur ? money2(Math.round(x * 100) / 100, b.cur, lang) : num(x, 2, lang));
      return {
        label: t('Fidya to pay', 'الفدية الواجبة'), value: m(d * b.amt),
        sub: b.row ? t(`${m(b.amt)} a day, ${b.row.body.en}`, `${m(b.amt)} عن اليوم، ${b.row.body.ar}`) : t('Your amount per day', 'المبلغ الذي حددته عن اليوم'),
        rows: [[t('Days', 'الأيام'), num(d, 0, lang)], [t('Per day', 'عن اليوم'), m(b.amt)], [t('Poor people fed, one per day', 'المساكين المطعَمون، واحد عن كل يوم'), num(d, 0, lang)]],
      };
    },
  };
};
const kaffarahTool: Maker = (lang, a) => {
  const t = T(lang);
  return {
    inputs: [
      { id: 'type', kind: 'choice', label: t('Kaffarah for', 'الكفارة عن'), def: S(a.type ?? 'fast'), options: [{ value: 'fast', label: t('A broken fast', 'إفساد الصوم') }, { value: 'oath', label: t('A broken oath', 'اليمين') }] },
      { id: 'times', label: t('How many times', 'عدد المرات'), def: N(a.times ?? 1), max: 100 },
      bodyIn(lang, a, 'kaffarah'), perIn(lang, a, ['Meal for one poor person', 'إطعام مسكين واحد']),
    ],
    run: (v) => {
      const fast = S(v.type) === 'fast', poor = fast ? 60 : 10, k = Math.max(0, Math.round(N(v.times)));
      const b0 = fromBody(v, 'kaffarah'), skip = !fast && !!b0.row?.kaffarahFastOnly, b = b0;
      const m = (x: number) => (b.cur ? money2(Math.round(x * 100) / 100, b.cur, lang) : num(x, 2, lang));
      return {
        label: t('Feeding option', 'خيار الإطعام'), value: skip ? t('Not published', 'غير منشور') : m(k * poor * b.amt),
        sub: fast ? t('Only if 60 consecutive days of fasting are beyond you', 'لمن عجز عن صيام شهرين متتابعين') : t('Feed or clothe ten, or fast three days if you cannot', 'إطعام عشرة مساكين أو كسوتهم، فإن عجز صام ثلاثة أيام'),
        note: skip ? t(`${b0.row!.body.en} published its rate for a broken fast only. Choose My own amount and enter the price of one meal.`, `أعلن ${b0.row!.body.ar} مبلغ كفارة الصوم وحدها. اختر مبلغًا أحدده بنفسي وأدخل ثمن الوجبة.`) : undefined,
        rows: [[t('Poor people per kaffarah', 'المساكين في الكفارة'), num(poor, 0, lang)], [t('Per meal', 'عن الوجبة'), m(b.amt)], [t('Fasting instead', 'الصيام بدلًا'), fast ? t(`${60 * k} days (60 in a row each)`, `${60 * k} يومًا (60 متتابعة لكل كفارة)`) : t(`${3 * k} days`, `${3 * k} أيام`)]],
      };
    },
  };
};

/* ---------- registry ---------- */
const TOOLS: Record<string, Maker> = {
  zakat: zakatTool, nisab: nisabTool, gold: goldTool, silver: silverTool,
  cash: single({ id: 'cash', en: 'Savings and cash', ar: 'المدخرات والنقد', def: 15000 }),
  crypto: single({ id: 'crypto', en: 'Crypto held, market value', ar: 'القيمة السوقية للعملات المشفرة', def: 8000, help: ['Coins and tokens held on your zakat day.', 'ما تملكه منها في يوم زكاتك.'] }),
  rent: single({ id: 'rent', en: 'Rent received and still saved', ar: 'الإيجار المقبوض والمدخر', def: 9000, help: ['Not the value of the property itself.', 'لا قيمة العقار نفسه.'] }),
  shares: sharesTool, pension: pensionTool, business: businessTool, debts: debtsTool, rate: rateTool, hawl: hawlTool, receive: receiveTool,
  faraid: faraidTool, fitr: fitrTool, fidya: fidyaTool, kaffarah: kaffarahTool,
};
export const TOOL_KINDS = Object.keys(TOOLS);
export function getTool(kind: string, args: V = {}, lang: Lang = 'en'): ToolSpec {
  const make = TOOLS[kind];
  if (!make) throw new Error(`Unknown calculator: ${kind}`);
  return make(lang, args ?? {});
}
export { MARKET };
