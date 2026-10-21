import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');

export default defineGuide({
  id: 'zakat-percentage', group: 'zakat', order: 40, tool: 'rate',
  toolArg: { amt: 250000 },
  related: ['how-to-calculate-zakat', 'nisab', 'zakat-al-maal', 'when-is-zakat-due', 'zakat-calculator-india', 'zakat-calculator-pakistan'],
  sources: ['a-bukhari-1454', 'a-abudawud-1573', 'zatca-reg', 'zatca-faq', 'bukhari-1483', 'pk-ordinance', 'ppz-gold', 'a-egypt-past-years'],
  en: {
    slug: 'zakat-percentage', nav: 'Zakat percentage', card: 'Why zakat is 2.5 %, one fortieth, the solar-year rate and the rates on crops.',
    title: 'Zakat Percentage 2026: 2.5 %, One Fortieth, and Why',
    description: 'Zakat percentage 2026: 2.5 % of wealth held a lunar year, one fortieth from the hadith, about 2.578 % on a solar year, and 10 % or 5 % on harvests. With tables.',
    h1: 'The zakat percentage: 2.5 % and the other rates',
    intro: 'Type the zakatable total you have already worked out; the tool gives 2.5 %, the solar-year figure and the difference between them.',
    resume: `The zakat rate on money, gold, silver, shares and trade goods is ${E.pct(E.P.rate.lunar)}, one fortieth, on wealth that has reached the nisab and been held for a lunar year. The figure comes from the letter of Abu Bakr in Sahih al-Bukhari, “on silver, one fortieth”, and from the hadith in Abu Dawud: five dirhams on two hundred, half a dinar on twenty. It does not rise with wealth and has no bands: ${E.money(100000, 'INR')} gives ${E.money(100000 * E.P.rate.lunar, 'INR')} and ${E.money(10000000, 'INR')} gives ${E.money(10000000 * E.P.rate.lunar, 'INR')}. Someone who counts on a solar year of 365 days pays ${E.pct(E.P.rate.solar, 3)}, the rate Saudi Arabia’s zakat authority derives by spreading 2.5 % over the days of the Hijri year. Crops follow other rates: a tenth when watered by rain and a twentieth when irrigated by effort, and Pakistan’s 1980 law levies a flat 5 % ushr. The quickest check by hand is to divide your total by 40.`,
    faqs: [
      { q: 'Is the zakat rate ever higher than 2.5 % on savings?', a: `Not on a lunar year. The rate is fixed at one fortieth whatever the size of the wealth, with no higher band for large fortunes. The only common reason to pay slightly more is counting on a solar year: the extra eleven days or so of the Gregorian year raise the rate in proportion, to about ${E.pct(E.P.rate.solar, 3)} for 365 days.` },
      { q: 'Why is zakat 2.5 % and not 10 % like the tithe on crops?', a: 'Because the texts set different rates for different wealth. Harvests carry a tenth when watered by rain and a twentieth when watered by labour, paid at each harvest. Money and trade goods carry one fortieth, paid once a year on what is held. The lower rate falls on a stock of wealth, the higher one on a yearly yield.' },
      { q: 'How do I work out 2.5 % without a calculator?', a: 'Divide by 40, or divide by 10 and then by 4. For a total of 3,20,000 rupees, a tenth is 32,000 and a quarter of that is 8,000. The same trick works in any currency. Round up rather than down if you want to be sure the full amount is paid.' },
      { q: 'Does the percentage change if I pay zakat late?', a: 'Dar al-Ifta of Egypt rules that zakat for past years is still owed when its conditions were met in those years. The rate on each of them stays one fortieth of what you held on that year’s zakat day; there is no penalty rate. If you are unsure what you owned back then, use your best estimate and ask a scholar you trust.' },
    ],
    body: (h) => {
      const c = 'INR';
      const amounts = [100000, 250000, 500000, 1000000, 2500000, 10000000];
      const rows = amounts.map((x) => [h.money(x, c), h.money(x * h.P.rate.lunar, c), h.money(x * h.P.rate.solar, c), h.money(x * (h.P.rate.solar - h.P.rate.lunar), c)]);
      const n = h.nisab('silver', c);
      return `
<h2>Where 2.5 % comes from</h2>
<p>No verse of the Qur’an gives the rate; the Sunnah does. When Abu Bakr sent Anas to collect zakat in Bahrain, he wrote out the rates set by the Prophet, and the letter, reported by al-Bukhari, ends its list with “on silver, one fortieth” (${h.src('a-bukhari-1454', 'Sahih al-Bukhari 1454')}). The Arabic phrase is rub‘ al-‘ushr, a quarter of a tenth. A hadith reported by Abu Dawud gives the same proportion in coins: on two hundred dirhams held for a year, five dirhams; on twenty dinars, half a dinar (${h.src('a-abudawud-1573', 'Sunan Abi Dawud 1573')}). Five out of two hundred and one half out of twenty are both one fortieth.</p>
<p>Jurists extended the rate from silver and gold to money in general, then to trade goods and shares, because they stand in for the same thing: wealth that can be invested. Zakat bodies state it the same way today; the ${h.src('ppz-gold', 'Federal Territories zakat centre in Malaysia')} writes 2.5 % on gold held a full year above 85 g.</p>

<h2>The rate on round sums in rupees</h2>
<p>The table applies the rate to a few totals. The solar column is for those who keep their zakat on the Gregorian calendar; the last column is what the extra days add.</p>
${h.table(['Zakatable wealth', 'Lunar year, 2.5 %', `Solar year, ${h.pct(h.P.rate.solar, 3)}`, 'Difference'], rows, 'Zakat at the two rates, Indian rupees.', ['r', 'r', 'r', 'r'])}
<p>The first line only applies if it reaches the nisab: on the silver measure that is ${h.money(n, c)} at the prices of ${h.priceDay}, on the gold measure ${h.money(h.nisab('gold', c), c)}. Below the threshold you choose, the rate does not apply at all to that wealth.</p>
${h.mini('rate', { t: '2.5 % of your total in rupees', p: ['amt'], d: { amt: 640000, cur: c } })}

<h2>2.5 % of the whole, not of the excess</h2>
<p>A common misreading treats the nisab like a tax-free allowance and applies the rate only above it. The hadith of Abu Dawud rules that out: two hundred dirhams, exactly the threshold, already owe five. So someone holding ${h.money(Math.ceil(n / 1000) * 1000, c)} on the silver measure owes ${h.money(Math.ceil(n / 1000) * 1000 * h.P.rate.lunar, c)}, a fortieth of the full amount. The other side of the rule is the cliff edge: a rupee below the nisab and nothing is due. This is one reason many families keep a margin in mind and do not try to land just under the line.</p>

<h2>The solar-year rate</h2>
<p>A lunar year has about ${h.P.rate.lunarDays} days, a Gregorian year ${h.P.rate.solarDays}. Paying 2.5 % every Gregorian year would mean paying a little less over a lifetime, because each payment covers more days. Saudi Arabia’s zakat authority sets out the correction in its ${h.src('zatca-reg', 'implementing regulations, article 15')}: divide 2.5 % by the days of the Hijri year and multiply by the days of the payer’s year. Its ${h.src('zatca-faq', 'questions and answers')} repeat the formula. For 365 days the result is ${h.pct(h.P.rate.solar, 3)}. The rule is written for companies that keep accounts on the calendar year, but households who pay every 1 January or every tax year use the same logic.</p>

<h2>Rates on harvests</h2>
<p>Crops and fruit are taxed by a different rule, at each harvest and without waiting a year. Al-Bukhari reports a tenth on land watered by rain, springs or natural channels, and half a tenth on land watered from wells by labour (${h.src('bukhari-1483', 'Sahih al-Bukhari 1483')}). Pakistan applies a single rate instead: its ${h.src('pk-ordinance', 'Zakat and Ushr Ordinance of 1980')} levies ushr at five per cent of the grower’s share of the produce. Harvest zakat is outside the calculators of this site, which deal with wealth held for a year.</p>
<p>Missed years follow the ordinary rate too. ${h.src('a-egypt-past-years', 'Dar al-Ifta of Egypt, fatwa 16544')} holds that zakat for years already past must still be paid if the nisab, freedom from debt and a full lunar year were there at the time, at 2.5 % of each year’s wealth.</p>
${h.table(['Wealth', 'Rate', 'When'], [
        ['Cash, gold, silver, shares, trade goods', h.pct(h.P.rate.lunar), 'Each lunar year on the zakat day'],
        ['Same, counted on a 365-day year', h.pct(h.P.rate.solar, 3), 'Each Gregorian year'],
        ['Crops watered by rain or rivers', '10 %', 'At harvest'],
        ['Crops watered by wells or pumps', '5 %', 'At harvest'],
      ], 'Main zakat rates and their timing.', ['l', 'r', 'l'])}

<h2>Checking your figure</h2>
<p>Whatever tool you use, the last step can be checked by hand: divide the net total by 40. If the result differs from what a calculator shows, look first at the nisab measure, the treatment of jewellery and whether debts were deducted, since those change the base rather than the rate. The ${h.a('how-to-calculate-zakat', 'step by step page')} walks through the base, and the ${h.a('when-is-zakat-due', 'zakat date page')} tells you which day to measure it on.</p>
`;
    },
  },
});
