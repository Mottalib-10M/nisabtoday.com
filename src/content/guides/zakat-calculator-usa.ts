import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');
const us = E.fitr('usa');
const k401 = 48000, k401Net = k401 * 0.9 * 0.78;
const houston = E.zakat({ cur: 'USD', cash: 15500, pension: k401Net });

export default defineGuide({
  id: 'zakat-calculator-usa', group: 'country', order: 20, tool: 'zakat', toolArg: { cur: 'USD' },
  related: ['zakat-on-pension', 'zakat-on-shares', 'zakat-on-crypto', 'nisab', 'zakat-al-fitr', 'fidya'],
  sources: ['b-irs-early', 'iifa-pension', 'b-fcna-1447', 'iifa-shares-income', 'zatca-reg', 'gold-api'],
  en: {
    slug: 'zakat-calculator-usa', nav: 'Zakat in the USA', card: 'Zakat in dollars: 401(k) and IRA balances after the early withdrawal tax, brokerage accounts and the 2026 fitr amount.',
    title: 'Zakat in the USA 2026: 401(k), IRA and Nisab in Dollars',
    description: 'Zakat in the USA for 2026: the nisab in dollars at today’s metal prices, counting a 401(k) or IRA after the 10% early withdrawal tax, and the 2026 fitr amount.',
    h1: 'Zakat in the United States, in dollars',
    intro: 'Type your checking and savings balances, brokerage holdings and what a 401(k) or IRA would pay you today after tax.',
    resume: `In dollars, the nisab is ${E.money(E.nisab('silver', 'USD'), 'USD')} on the silver measure and ${E.money(E.nisab('gold', 'USD'), 'USD')} on the gold measure, at the spot prices of ${E.priceDay}; zakat is ${E.pct(E.P.rate.lunar)} of everything you own if the total reaches the threshold you follow. The American difficulty is retirement money. A withdrawal from a 401(k) or a traditional IRA before age 59½ usually costs an extra 10% on top of income tax, according to the IRS, so the sum you could actually take out is well below the balance on your statement. One common method counts that reachable sum each year. Take a family in Houston with ${E.money(15500, 'USD')} in the bank and a ${E.money(k401, 'USD')} 401(k): after the 10% and an assumed 22% income tax, about ${E.money(k401Net, 'USD')} is reachable, and the zakat comes to ${E.money(houston.zakat, 'USD')}. For zakat al-fitr, the Fiqh Council of North America recommended ${E.money(us.fitr!, 'USD')} a person in 2026.`,
    faqs: [
      { q: 'Should I pay zakat on the full balance of my 401(k)?', a: 'Few scholars ask for that. The usual choices are to count each year what you could withdraw now, after the 10% additional tax and income tax, or to wait until the money is paid out and then pay for one year. Counting the full balance overstates what you can actually reach.' },
      { q: 'Does a Roth IRA count differently from a traditional IRA?', a: 'The principle is the same: count what you could take out today, net of any tax or penalty that would apply. With a Roth account part of the money may come out without tax, so the reachable amount is often closer to the balance. Your plan statement shows the figures.' },
      { q: 'How much was zakat al-fitr in America for Ramadan 2026?', a: 'The Fiqh Council of North America recommended $10 per person. It estimated the staple food of one sa’ at about six dollars and asked people to round up out of caution, because prices vary so much between rice, flour and dates. The amount for 1448 is to be published before Ramadan.' },
      { q: 'Are employer stock and RSUs zakatable once they vest?', a: 'Once shares vest and are yours to sell, they are shares like any other: their market value on your zakat day counts. Unvested units are not yet owned. If you keep vested shares for the long term rather than to trade, some scholars count only the zakatable part of the company.' },
    ],
    body: (h) => {
      const sU = h.nisab('silver', 'USD');
      const ira = h.zakat({ cur: 'USD', cash: 15500, pension: k401Net, pensionRule: 'receipt' });
      const broker = h.zakat({ cur: 'USD', cash: 4200, shares: 31000, sharesMode: 'invest', investPct: 30 });
      const brokerTrade = h.zakat({ cur: 'USD', cash: 4200, shares: 31000, sharesMode: 'trade' });
      return `
<h2>No zakat authority, so the household decides</h2>
<p>The United States collects no zakat and has no statute on it. American Muslims follow their mosque, a scholar or one of the national councils. On the threshold, the ${h.src('gold-api', 'spot prices')} of ${h.priceDay} put the silver nisab at ${h.money(sU, 'USD')}, an amount almost any working household with a savings account passes. That is why many American families pay every year, and why the questions that matter here are less about the nisab than about which accounts to put in the total.</p>
${h.mini('nisab', { t: 'Nisab today in dollars', p: ['cur'], d: { cur: 'USD' } })}

<h2>401(k), 403(b) and traditional IRA</h2>
<p>The ${h.src('b-irs-early', 'IRS')} adds a 10% tax to most distributions taken before age 59½, on top of ordinary income tax. There are exceptions: leaving your employer in or after the year you turn 55 lifts the 10% on a 401(k) (not on an IRA), and so do death and total disability. A SIMPLE IRA emptied within its first two years of participation pays 25% instead of 10%.</p>
<p>For zakat this matters because the question is what you truly own and can reach. Three readings are found among scholars:</p>
<ul>
<li><strong>Count what you could withdraw now.</strong> Take the vested balance, subtract the 10% and the income tax you would owe, and add the rest to your wealth each year. This follows the ${h.src('iifa-pension', 'Fiqh Academy’s rule')} for savings funds the employee invests and controls.</li>
<li><strong>Count nothing until it is paid out.</strong> Treat the account as not yet fully owned, and pay for one year when the money reaches you.</li>
<li><strong>Count the full balance.</strong> A minority position; the calculator shows it as a comparison line.</li>
</ul>
<p>Back to the Houston family: counting the reachable part each year gives ${h.money(houston.zakat, 'USD')}; waiting for the payout gives ${h.money(ira.zakat, 'USD')} this year, on the bank money alone. The 22% income tax is an assumption for the example; put your own bracket in the calculator.</p>
${h.mini('pension', { t: '401(k) after the 10% and income tax', p: ['bal', 'pen', 'tax', 'acc'], d: { bal: k401, pen: 10, tax: 22, cur: 'USD' } })}

<h2>Brokerage accounts, index funds and RSUs</h2>
<p>A taxable brokerage account holds shares and funds at market value. Someone who trades counts it all. For a long-term holder of an S&P 500 fund, the ${h.src('iifa-shares-income', 'Fiqh Academy’s resolution 121')} asks for zakat on the zakatable assets of the companies (their cash, receivables and stock in trade), estimated as best one can. With ${h.money(4200, 'USD')} in checking and ${h.money(31000, 'USD')} in funds, counting the full market value gives ${h.money(brokerTrade.zakat, 'USD')}; counting 30% of it as zakatable gives ${h.money(broker.zakat, 'USD')}. The 30% is an illustration, not a published figure; the ${h.a('zakat-on-shares', 'shares page')} explains how to estimate it from a fund’s holdings.</p>
${h.mini('zakat', { t: 'Checking account and a long-term index fund', p: ['cash', 'shares', 'sharesMode', 'investPct'], d: { cur: 'USD', cash: 4200, shares: 31000, sharesMode: 'invest', investPct: 30 } })}

<h2>HSA, 529 plans and crypto</h2>
<p>A health savings account and a 529 college plan belong to you, but their tax rules tie the money to a purpose. Families who count the reachable part of a 401(k) usually apply the same logic: what you could take out today, after any tax and penalty, is the zakatable amount. Coins held on an exchange or in a wallet are valued at their market price on the day; the ${h.a('zakat-on-crypto', 'crypto page')} covers staking and tokens.</p>

<h2>Paying on December 31 instead of in Ramadan</h2>
<p>Many American households keep their accounts on the calendar year, because statements, W-2 forms and tax returns all close on December 31. Zakat is due on a lunar year of about 354 days, eleven days shorter. If you prefer to pay on a fixed Gregorian date, the ${h.src('zatca-reg', 'Saudi zakat authority’s regulation')} scales the rate to the number of days: ${h.pct(h.P.rate.solar, 3)} for a 365-day year. On ${h.money(42000, 'USD')} of zakatable wealth that is ${h.money(h.zakat({ cur: 'USD', cash: 42000, year: 'solar' }).zakat, 'USD')} instead of ${h.money(h.zakat({ cur: 'USD', cash: 42000 }).zakat, 'USD')}. The calculator has the option under the year setting, and the ${h.a('when-is-zakat-due', 'zakat date page')} converts your date to the Hijri calendar.</p>

<h2>Zakat al-fitr and fidya in 2026</h2>
<p>The ${h.src('b-fcna-1447', 'Fiqh Council of North America')} published its figures on ${h.day(us.date)}: ${h.money(us.fitr!, 'USD')} per person for zakat al-fitr and ${h.money(us.fidya!, 'USD')} a day for fidya. Its reasoning is spelled out: one sa’ of staple food would cost about six dollars, rounded up to ten because prices vary so much; the fidya follows the cost of a day’s food, which it put at $13.78 before rounding. A household of five pays ${h.money(5 * us.fitr!, 'USD')} for zakat al-fitr. Amounts for 1448 are to be published before Ramadan, which on the Umm al-Qura calendar is expected to begin on ${h.day(h.ramadan1448)}.</p>
${h.mini('fitr', { t: 'Zakat al-fitr for an American household', p: ['n', 'body'], d: { n: 5, body: 'usa' } })}
`;
    },
  },
});
