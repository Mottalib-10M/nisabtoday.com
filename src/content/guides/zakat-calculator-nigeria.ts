import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');
const kano = E.zakat({ cur: 'NGN', cash: 2350000, stock: 4100000, debts: 760000 });

export default defineGuide({
  id: 'zakat-calculator-nigeria', group: 'country', order: 80, tool: 'zakat', toolArg: { cur: 'NGN' },
  related: ['zakat-on-business', 'nisab', 'zakat-on-pension', 'zakat-on-savings', 'zakat-on-gold', 'who-can-receive-zakat'],
  sources: ['b-pencom-faq', 'iifa-pension', 'bukhari-1483', 'bukhari-1447', 'pk-ordinance', 'islamweb-debts', 'gold-api'],
  en: {
    slug: 'zakat-calculator-nigeria', nav: 'Zakat in Nigeria', card: 'Zakat in naira: a nisab that moves with the exchange rate, shop stock, dollar accounts, RSA pensions and crops.',
    title: 'Zakat in Nigeria 2026: Nisab in Naira, Trade and Harvests',
    description: 'Zakat in Nigeria for 2026: today’s nisab in naira, zakat on shop stock and dollar accounts, how an RSA pension is counted, and the tenth due on crops.',
    h1: 'Zakat in Nigeria, in naira',
    intro: 'Enter cash in naira and the naira value of any dollar savings, the stock of your shop at selling price, and the debts due this month.',
    resume: `At the spot prices of ${E.priceDay}, the nisab in naira is ${E.money(E.nisab('silver', 'NGN'), 'NGN')} on the silver measure and ${E.money(E.nisab('gold', 'NGN'), 'NGN')} on the gold measure. Because gold and silver are priced in dollars, the naira figure moves with the exchange rate as much as with the metal, so last Ramadan’s number is rarely right this Ramadan. Zakat is ${E.pct(E.P.rate.lunar)} of your net zakatable wealth once it reaches the threshold you follow. Nigeria has no federal zakat law; Muslims in Kano, Sokoto, Ilorin or Lagos follow their scholars. Much of the zakat paid in the country is on trade: a provisions trader in Kano with ${E.money(4100000, 'NGN')} of stock at selling price, ${E.money(2350000, 'NGN')} in cash and ${E.money(760000, 'NGN')} owed to suppliers this month has ${E.money(kano.net, 'NGN')} of net wealth and owes ${E.money(kano.zakat, 'NGN')}. Farmers have a separate duty on the harvest.`,
    faqs: [
      { q: 'How do I count dollars held in a domiciliary account?', a: 'Convert them to naira at the rate you could actually get on your zakat day and add them to your other cash. The currency does not change the zakat; it only changes the figure in naira. If you pay in naira, use the same rate so the amount you give matches what you counted.' },
      { q: 'Is my Retirement Savings Account zakatable before I retire?', a: 'Scholars differ. The money in an RSA is held for you but cannot usually be taken before retirement or the age of 50. On the Fiqh Academy’s rule for funds you cannot control, it is zakatable for one year when you receive it. Any 25% withdrawal you are allowed to make counts once it reaches you.' },
      { q: 'Do I pay zakat on grain I harvested this season?', a: 'Yes, if the harvest reaches five awsuq, which Pakistan’s statute converts to 948 kg of wheat. The rate is a tenth for land watered by rain or rivers and a twentieth for land irrigated by pumps or carried water, due at harvest, not after a year.' },
    ],
    body: (h) => {
      const sN = h.nisab('silver', 'NGN'), gN = h.nisab('gold', 'NGN');
      const usd = 3200, usdNgn = usd * (h.nisab('silver', 'NGN') / h.nisab('silver', 'USD'));
      const dom = h.zakat({ cur: 'NGN', cash: 900000 + usdNgn });
      const noDebt = h.zakat({ cur: 'NGN', cash: 2350000, stock: 4100000, debts: 760000, debtRule: 'none' });
      return `
<h2>A nisab that follows the naira</h2>
<p>The nisab is a weight of metal: ${h.nisabGrams('silver')} g of silver or ${h.nisabGrams('gold')} g of gold, from the hadith on five awaq in ${h.src('bukhari-1447', 'Sahih al-Bukhari')}. Its value in naira is that weight times the ${h.src('gold-api', 'spot price')} in dollars times the exchange rate. On ${h.priceDay} that gives ${h.money(sN, 'NGN')} for silver and ${h.money(gN, 'NGN')} for gold. A family whose savings were below the line a year ago may be above it now simply because the naira has moved. Look up the figure on the day you pay, not the one announced in the mosque last year.</p>
${h.mini('nisab', { t: 'Nisab today in naira', p: ['cur'], d: { cur: 'NGN' } })}

<h2>Traders: stock, credit and goods on the way</h2>
<p>Markets such as Kantin Kwari, Onitsha or Alaba run on stock held for sale, and stock in trade is zakatable at the price you would sell it for on your zakat day. Add the cash in the shop and in the bank, money customers owe you and will pay, and goods you have paid for that are still on the road. Subtract what you owe now: suppliers, a loan instalment due, rent due on the shop. The shop itself, shelves, a generator and a delivery van are tools of the trade and carry no zakat.</p>
<p>For the Kano trader, deducting the ${h.money(760000, 'NGN')} owed to suppliers gives ${h.money(kano.zakat, 'NGN')}. The Shafi‘i school does not let debts reduce zakat, and on that view the amount is ${h.money(noDebt.zakat, 'NGN')}. Many traders in the north follow the Maliki school, which, like the Hanafi, deducts debts (${h.src('islamweb-debts', 'Islamweb fatwa 47139')}). The ${h.a('zakat-on-business', 'business page')} covers bad debts and partnerships.</p>
${h.mini('zakat', { t: 'Shop stock, cash and supplier debts', p: ['cash', 'stock', 'debts', 'debtRule'], d: { cur: 'NGN', cash: 2350000, stock: 4100000, debts: 760000 } })}

<h2>Dollar savings and the rate you use</h2>
<p>Many households keep part of their savings in dollars to protect them from inflation. For zakat, all currencies are added together in one currency. Someone with ${h.money(900000, 'NGN')} in naira and ${h.money(usd, 'USD')} in a domiciliary account, converted at the rate used on this page today, holds about ${h.money(900000 + usdNgn, 'NGN')} and owes ${h.money(dom.zakat, 'NGN')}. If the rate you can actually get differs, use yours: the calculator takes any amount in naira.</p>

<h2>RSA pensions under the Contributory Pension Scheme</h2>
<p>Employees in the formal sector have a Retirement Savings Account. According to the ${h.src('b-pencom-faq', 'National Pension Commission')}, the minimum contribution is 18% of monthly emoluments, 10% from the employer and 8% from the employee. You can reach the account on retirement or at 50, whichever is later, and someone who leaves a job and cannot find another after four months may take 25% of the balance. The ${h.src('iifa-pension', 'International Islamic Fiqh Academy')} holds that a fund the worker has no right to control is zakatable for one year when received. On that view, an RSA is left out of the yearly sum until money is paid to you; a 25% withdrawal joins your cash once it arrives. The ${h.a('zakat-on-pension', 'pension page')} shows the opposing view, which counts reachable savings each year.</p>

<h2>Crops: the tenth and the twentieth</h2>
<p>Zakat on harvests works differently from zakat on money. There is no waiting year: it is due at harvest. The rate comes from the hadith in ${h.src('bukhari-1483', 'Sahih al-Bukhari 1483')}: a tenth on land watered by rain, rivers or springs, a twentieth on land irrigated with effort, by pumps or carried water. The threshold is five awsuq, which ${h.src('pk-ordinance', 'Pakistan’s Zakat and Ushr Ordinance')} puts at 948 kg of wheat. A farmer near Zaria who harvests 3,000 kg of rain-fed maize owes a tenth, 300 kg, or its value; with irrigation from a pump, a twentieth, 150 kg. Costs of seed and fertiliser are deducted by some scholars and not by others.</p>

<h2>Gold, recipients and timing</h2>
<p>Gold given at marriage is zakatable on the Hanafi view even when worn and exempt within normal use on the Maliki and Shafi‘i views; the ${h.a('zakat-on-gold', 'gold page')} computes both. Zakat goes to the eight categories in the Qur’an, listed on the ${h.a('who-can-receive-zakat', 'recipients page')}. Ramadan 1448 is expected to begin on ${h.day(h.ramadan1448)} on the Umm al-Qura calendar; in Nigeria the start is announced nationally after the moon is sighted.</p>
`;
    },
  },
});
