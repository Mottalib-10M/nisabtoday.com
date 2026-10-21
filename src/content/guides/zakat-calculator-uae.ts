import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');
const u = E.fitr('uae');
const sharjah = E.zakat({ cur: 'AED', cash: 58000, goldG: 40, goldK: 22 });

export default defineGuide({
  id: 'zakat-calculator-uae', group: 'country', order: 100, tool: 'zakat', toolArg: { cur: 'AED' },
  related: ['zakat-al-fitr', 'kaffarah', 'fidya', 'zakat-on-gold', 'zakat-on-pension', 'nisab'],
  sources: ['b-uae-fatwa-1447', 'b-uae-gratuity', 'iifa-pension', 'kuwait-calc', 'egypt-nisab', 'gold-api'],
  en: {
    slug: 'zakat-calculator-uae', nav: 'Zakat in the UAE', card: 'Zakat in dirhams: savings and gold bought in the souk, the end-of-service gratuity, and the 1447 amounts of the UAE Council for Fatwa.',
    title: 'Zakat in the UAE 2026: Nisab in Dirhams and Fatwa Amounts',
    description: 'Zakat in the UAE for 2026: the nisab in dirhams at today’s price, gold from the souk, the end-of-service gratuity and the 1447 fitr, fidya and kaffarah amounts.',
    h1: 'Zakat in the United Arab Emirates, in dirhams',
    intro: 'Enter your balances in dirhams, gold by weight and carat, and any gratuity that has already been paid to you.',
    resume: `At the spot prices of ${E.priceDay}, the nisab in dirhams is ${E.money(E.nisab('silver', 'AED'), 'AED')} on the silver measure and ${E.money(E.nisab('gold', 'AED'), 'AED')} on the gold measure, and zakat is ${E.pct(E.P.rate.lunar)} of zakatable wealth held for a lunar year above it. The UAE Council for Fatwa publishes fixed amounts for the duties of Ramadan. For 1447 it set zakat al-fitr at 2.5 kg of rice a person or ${E.money(u.fitr!, 'AED')} in cash, fidya at ${E.money(u.fidya!, 'AED')} a day, kaffarah for a broken fast at ${E.money(60 * u.kaffarah!, 'AED')} for sixty poor people and kaffarah for an oath at ${E.money(10 * u.kaffarah!, 'AED')} for ten. Many residents are expatriates whose largest future sum is the end-of-service gratuity; on the International Islamic Fiqh Academy’s resolution it is not zakatable while you are still employed. An engineer in Sharjah with ${E.money(58000, 'AED')} saved and 40 g of 22 carat gold bars owes ${E.money(sharjah.zakat, 'AED')} today.`,
    faqs: [
      { q: 'Do I owe zakat on my end-of-service gratuity before I leave my job?', a: 'On the resolution of the International Islamic Fiqh Academy, no: during service the worker does not fully own the benefit. Once it is calculated and paid, or decided and available to you, it joins your zakatable wealth like any other money, and from then on follows the normal year.' },
      { q: 'How much was zakat al-fitr in the UAE for Ramadan 2026?', a: `The UAE Council for Fatwa fixed it at 2.5 kg of rice per person, or ${E.money(u.fitr!, 'AED')} in cash, based on a field study carried out with the Ministry of Economy and Tourism. A family of six paid ${E.money(6 * u.fitr!, 'AED')}. The amount for 1448 is to be published before Ramadan.` },
      { q: 'Should expatriates in Dubai pay zakat in dirhams or in their home currency?', a: 'Zakat is worked out on everything you own, wherever it is, in one currency. Living in the Emirates, most people count in dirhams and convert savings held at home at the day’s rate. You may pay in either currency as long as the value matches what you counted.' },
    ],
    body: (h) => {
      const sA = h.nisab('silver', 'AED'), gA = h.nisab('gold', 'AED');
      const basic = 9000, years = 8, grat = basic / 30 * (21 * 5 + 30 * (years - 5));
      const paidOut = h.zakat({ cur: 'AED', cash: 22000 + grat });
      const rows = ['24', '22', '21', '18'].map((k) => [`${k} carat`, h.money2(h.goldGram(Number(k), 'AED'), 'AED'), `${h.dec(h.nisabGrams('gold') * 24 / Number(k), 1)} g`]);
      const jewelH = h.zakat({ cur: 'AED', cash: 30000, jewelG: 120, jewelK: 21 });
      const jewelM = h.zakat({ cur: 'AED', cash: 30000, jewelG: 120, jewelK: 21, jewelRule: 'exclude' });
      return `
<h2>The threshold in dirhams</h2>
<p>The nisab in dirhams follows the world price of gold and silver, converted at the exchange rate of the day. At the ${h.src('gold-api', 'spot prices')} of ${h.priceDay}, ${h.nisabGrams('silver')} g of silver is worth ${h.money(sA, 'AED')} and ${h.nisabGrams('gold')} g of gold ${h.money(gA, 'AED')}. Zakat bodies in the Gulf often apply gold to cash, as ${h.src('kuwait-calc', 'Kuwait Zakat House')} does with 85 g of 24 carat gold; many scholars prefer silver. The calculator starts on silver, and a single option switches to gold.</p>
${h.mini('nisab', { t: 'Nisab today in dirhams', p: ['cur'], d: { cur: 'AED' } })}

<h2>The Fatwa Council’s amounts for 1447</h2>
<p>On ${h.day(u.date)} the ${h.src('b-uae-fatwa-1447', 'UAE Council for Fatwa')} published the values for Ramadan 1447, set after a field study with the Ministry of Economy and Tourism. They are the only official amounts for the Emirates, and the calculators on this site use them.</p>
${h.table(['Duty', 'In kind', 'In dirhams'], [['Zakat al-fitr, per person', '2.5 kg of rice', h.money(u.fitr!, 'AED')], ['Fidya, per day of fasting missed for good', '3.25 kg of wheat', h.money(u.fidya!, 'AED')], ['Kaffarah for breaking a Ramadan fast', '60 poor people fed', h.money(60 * u.kaffarah!, 'AED')], ['Kaffarah for a broken oath', '10 poor people fed', h.money(10 * u.kaffarah!, 'AED')]], 'UAE Council for Fatwa, Ramadan 1447 (2026).', ['l', 'l', 'r'])}
<p>The ${h.a('zakat-al-fitr', 'zakat al-fitr page')}, the ${h.a('fidya', 'fidya page')} and the ${h.a('kaffarah', 'kaffarah page')} explain who owes each one and where the schools differ. Amounts for 1448 are to be published before Ramadan, expected to begin on ${h.day(h.ramadan1448)} on the Umm al-Qura calendar.</p>
${h.mini('fitr', { t: 'Zakat al-fitr for a family in the Emirates', p: ['n', 'body'], d: { n: 6, body: 'uae' } })}

<h2>End-of-service gratuity</h2>
<p>For expatriates in the private sector on full-time contracts, the ${h.src('b-uae-gratuity', 'UAE Government portal')} sets the gratuity at 21 days of basic salary for each of the first five years and 30 days for each year after that, with nothing before one year of service and a total capped at two years’ wage. After eight years on a basic salary of ${h.money(basic, 'AED')}, that comes to about ${h.money(grat, 'AED')}.</p>
<p>The ${h.src('iifa-pension', 'International Islamic Fiqh Academy’s resolution 143')} addresses exactly this kind of benefit: the worker does not owe zakat on it during service, because he does not fully own it; once it is calculated and paid, it joins his zakatable assets. In the example, the gratuity adds nothing to zakat while the engineer works. The day it is paid, with ${h.money(22000, 'AED')} of other savings, the total reaches ${h.money(paidOut.net, 'AED')} and, if still held on the next zakat day, owes ${h.money(paidOut.zakat, 'AED')}. A savings plan you can withdraw from at will is a different case and counts like any savings.</p>

<h2>Gold from the souk</h2>
<p>Gold bought in Dubai or Sharjah is sold by weight and carat, most often 22, 21 and 18. Bars and coins bought as savings are zakatable on every view. The table shows a gram of each carat today and the weight holding ${h.nisabGrams('gold')} g of pure gold.</p>
${h.table(['Carat', 'Price of 1 g today', 'Weight holding the gold nisab'], rows, `Spot prices of ${h.priceDay}; shop prices include making charges.`, ['l', 'r', 'r'])}
<p>For jewellery that is worn, the schools differ: the Hanafi school counts it, the majority does not. With ${h.money(30000, 'AED')} saved and 120 g of 21 carat jewellery, the Hanafi count gives ${h.money(jewelH.zakat, 'AED')} and the majority view ${h.money(jewelM.zakat, 'AED')}. Dar al-Ifta of Egypt takes ${h.src('egypt-nisab', '85 g of 21 carat')} as the nisab of jewellery on the Hanafi reading, slightly lower than the pure-gold reading used here.</p>
${h.mini('zakat', { t: 'Savings and gold jewellery', p: ['cash', 'jewelG', 'jewelRule'], d: { cur: 'AED', cash: 30000, jewelG: 120, jewelK: '21' } })}

<h2>Traders, freelancers and shares on the local markets</h2>
<p>A trading licence in Deira or a freelance permit in a free zone turns part of your money into business wealth. Count the stock you hold for sale at selling price, the business bank account and invoices clients will settle, and deduct what the business owes now, such as supplier bills and rent due on the shop. Fit-out, vehicles and equipment are used in the work and carry no zakat. Shares bought on the Dubai or Abu Dhabi exchanges to resell count at market value; shares held for dividends can be counted on the zakatable part of the company, as the ${h.a('zakat-on-shares', 'shares page')} explains. A trader with ${h.money(185000, 'AED')} of stock, ${h.money(42000, 'AED')} in the account and ${h.money(37000, 'AED')} due to suppliers owes ${h.money(h.zakat({ cur: 'AED', cash: 42000, stock: 185000, debts: 37000 }).zakat, 'AED')}.</p>

<h2>Savings in two countries</h2>
<p>Many residents keep money both in the Emirates and at home: a flat being paid off in Kerala, a savings account in Lahore, family gold in Cairo. Zakat is owed on the total, whichever country it sits in. Convert each balance at the rate of the day, add it to the dirham figure, and compare the whole with the nisab. A flat you live in or plan to live in carries no zakat; one bought to resell counts at market value.</p>
`;
    },
  },
});
