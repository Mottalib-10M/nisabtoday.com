import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');
const lakemba = E.zakat({ cur: 'AUD', cash: 11600, shares: 23400, sharesMode: 'invest', investPct: 35 });
const lakembaFull = E.zakat({ cur: 'AUD', cash: 11600, shares: 23400 });

export default defineGuide({
  id: 'zakat-calculator-australia', group: 'country', order: 60, tool: 'zakat', toolArg: { cur: 'AUD' },
  related: ['zakat-on-pension', 'zakat-on-shares', 'zakat-on-property', 'zakat-on-gold', 'nisab', 'zakat-on-business'],
  sources: ['iifa-pension', 'iifa-shares-income', 'iifa-property', 'ppz-epf', 'kuwait-calc', 'gold-api'],
  en: {
    slug: 'zakat-calculator-australia', nav: 'Zakat in Australia', card: 'Zakat in Australian dollars: superannuation, ETFs and shares, investment property and bullion.',
    title: 'Zakat in Australia 2026: Super, Shares and Nisab in AUD',
    description: 'Zakat in Australia for 2026: the nisab in Australian dollars at today’s price, the two views on superannuation, ETFs held for years and investment property.',
    h1: 'Zakat in Australia, in Australian dollars',
    intro: 'Enter bank balances, offset accounts, shares and ETFs, bullion, and, if you count it, the super you could access now.',
    resume: `At the spot prices of ${E.priceDay}, the nisab is ${E.money(E.nisab('silver', 'AUD'), 'AUD')} in Australian dollars on the silver measure and ${E.money(E.nisab('gold', 'AUD'), 'AUD')} on the gold measure; above the measure you follow, zakat is ${E.pct(E.P.rate.lunar)} of your zakatable wealth. Australia has no zakat legislation, so households work it out with their imam or a scholar. Superannuation is the Australian question: the money is yours, but in most cases you cannot touch it until retirement. On the International Islamic Fiqh Academy’s reading, wealth you cannot control is zakatable only once you receive it, for one year, so super that is locked away drops out of this year’s sum. The second large item is shares and ETFs held for years. A family in Lakemba with ${E.money(11600, 'AUD')} in the bank and ${E.money(23400, 'AUD')} in an index ETF pays ${E.money(lakembaFull.zakat, 'AUD')} on the full market value, or ${E.money(lakemba.zakat, 'AUD')} if only 35% of the fund is counted as zakatable.`,
    faqs: [
      { q: 'Should I pay zakat on my superannuation every year?', a: 'Scholars differ. Those who follow the Fiqh Academy see super you cannot access as not fully owned and pay for one year when it is released. Others count each year what you could withdraw if a condition of release applied. If your super is fully accessible, for example after retirement, it counts like savings.' },
      { q: 'Does money in a mortgage offset account count for zakat?', a: 'Yes. An offset account is a transaction or savings account whose balance reduces the interest charged on your loan, but the money remains yours and you can withdraw it at any time. Count the balance on your zakat day like any other cash, and deduct only the loan repayments that are due now.' },
      { q: 'How do I count an ETF I hold for the long term?', a: 'Either at full market value, which is simple and cautious, or only for the zakatable part of the companies inside it, cash, receivables and inventory, as the Fiqh Academy allows for shares held for income. Fund reports give the figures needed for an estimate. The calculator accepts a percentage.' },
      { q: 'Is a rental property in Australia subject to zakat?', a: 'The building is not, on the resolution of the International Islamic Fiqh Academy, unless you bought it to sell at a profit. The rent you collect and still hold on your zakat day is counted with your cash. Property bought to renovate and sell is trade goods and counts at market value.' },
    ],
    body: (h) => {
      const sA = h.nisab('silver', 'AUD'), gA = h.nisab('gold', 'AUD');
      const superLocked = h.zakat({ cur: 'AUD', cash: 16800, pension: 92000, pensionRule: 'receipt' });
      const superYearly = h.zakat({ cur: 'AUD', cash: 16800, pension: 92000, pensionRule: 'yearly' });
      const bullion = h.zakat({ cur: 'AUD', cash: 3000, goldG: 31.1 * 2, goldK: 24 });
      const flip = h.zakat({ cur: 'AUD', cash: 9000, stock: 640000, debts: 18500 });
      return `
<h2>The threshold in Australian dollars</h2>
<p>Using the ${h.src('gold-api', 'spot prices')} of ${h.priceDay}, ${h.nisabGrams('silver')} g of silver comes to ${h.money(sA, 'AUD')} and ${h.nisabGrams('gold')} g of gold to ${h.money(gA, 'AUD')}. Gold is ${h.dec(h.ratio(), 1)} times higher. Some zakat bodies abroad, such as ${h.src('kuwait-calc', 'Kuwait Zakat House')}, use the gold measure for cash; many scholars prefer silver. Australian mosques follow both, so the calculator leaves the choice to you.</p>
${h.mini('nisab', { t: 'Nisab today in Australian dollars', p: ['cur'], d: { cur: 'AUD' } })}

<h2>Superannuation: two readings, two amounts</h2>
<p>For most working Australians, super is the largest asset after the home. It is invested in your name, and many funds let you choose the investment option, yet the money is preserved until a condition of release, usually retirement. Zakat law asks two things of wealth: that you own it fully and that it can grow. Super meets the second; the first is where opinions part.</p>
<p>The ${h.src('iifa-pension', 'International Islamic Fiqh Academy’s resolution 143')}, on savings and end-of-service funds, says that money deposited where the employee has no right to control it is zakatable for one year only, when received. Where the employee does control it, it is added to zakatable wealth. Malaysia’s Federal Territories zakat centre applies the first logic to the national retirement fund: ${h.src('ppz-epf', 'PPZ-MAIWP')} levies zakat on EPF savings when they are withdrawn. A worker with ${h.money(16800, 'AUD')} in the bank and a super balance of ${h.money(92000, 'AUD')} owes ${h.money(superLocked.zakat, 'AUD')} on the first reading and ${h.money(superYearly.zakat, 'AUD')} on the reading that counts the whole balance every year.</p>
${h.mini('zakat', { t: 'Bank savings and a superannuation balance', p: ['cash', 'pension', 'pensionRule'], d: { cur: 'AUD', cash: 16800, pension: 92000, pensionRule: 'receipt' } })}
<p>Once you retire and super becomes accessible, the question disappears: a balance you can draw on counts like savings, year after year, whether it sits in an account-based pension or a lump sum.</p>

<h2>Shares, ETFs and the long-term investor</h2>
<p>Australians hold shares widely, directly or through ETFs. If you buy to sell at a profit, the whole market value counts. If you hold for dividends, the ${h.src('iifa-shares-income', 'Fiqh Academy’s resolution 121')} asks for zakat on the zakatable assets of the companies, as far as you can find out: the cash, receivables and inventory, not the buildings and machines. For the Lakemba family, that is the difference between ${h.money(lakembaFull.zakat, 'AUD')} and ${h.money(lakemba.zakat, 'AUD')}. The 35% here is an illustration; the ${h.a('zakat-on-shares', 'shares page')} explains how to estimate your own figure from an annual report.</p>

<h2>Investment property and renovators</h2>
<p>The ${h.src('iifa-property', 'Fiqh Academy’s resolution on real estate')} holds that no zakat is due on rented buildings and land, only on the rent received once a year has passed and the other conditions are met. In practice, rent you have collected and still hold joins your cash. A house bought to renovate and resell is different: it is stock in trade. A renovator holding a house worth ${h.money(640000, 'AUD')} at expected sale price, ${h.money(9000, 'AUD')} in cash and ${h.money(18500, 'AUD')} of loan repayments and trade bills due owes ${h.money(flip.zakat, 'AUD')}; the full loan is not deducted, only what is due now.</p>

<h2>Small business owners and sole traders</h2>
<p>A café, a mechanic’s workshop or an online shop adds business wealth to the household total. Count the stock for sale at its selling price, the money in the business account and the invoices customers will pay. Take off the bills the business must settle now, such as supplier accounts, wages and tax already collected for the government. Fittings, ovens, vehicles and tools are used in the work, not sold, so they carry no zakat. The ${h.a('zakat-on-business', 'business page')} has a calculator built for this, with the same nisab of the day.</p>

<h2>Debts and the family home</h2>
<p>The home you live in carries no zakat, and neither does the car you drive. The mortgage on it is a long debt; most fatwa bodies deduct only the repayments falling due in the coming months, not the full balance owed to the bank. Credit card balances you will clear and bills already received are deducted in full. The Shafi‘i school deducts nothing, and the calculator shows that view under the debts option.</p>

<h2>Bullion and family gold</h2>
<p>Gold and silver coins and bars bought as savings are zakatable on every view. Two ounce coins of pure gold, about ${h.grams(62.2)}, with ${h.money(3000, 'AUD')} in the bank, give zakat of ${h.money(bullion.zakat, 'AUD')} at today’s price. Jewellery that is worn counts on the Hanafi view only; the ${h.a('zakat-on-gold', 'gold page')} converts any carat to pure metal.</p>

<h2>Paying on time</h2>
<p>Ramadan 1448 is expected to begin on ${h.day(h.ramadan1448)} on the Umm al-Qura calendar, and Australian communities announce their own start after sighting. If you keep your zakat day in Ramadan, the ${h.a('when-is-zakat-due', 'zakat date calculator')} gives the date of each following year.</p>
`;
    },
  },
});
