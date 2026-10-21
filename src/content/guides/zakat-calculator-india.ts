import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');
const hyd = E.zakat({ cur: 'INR', cash: 265000, jewelG: 62, jewelK: 22 });

export default defineGuide({
  id: 'zakat-calculator-india', group: 'country', order: 40, tool: 'zakat', toolArg: { cur: 'INR' },
  related: ['zakat-on-gold', 'nisab', 'zakat-on-pension', 'zakat-on-property', 'zakat-al-fitr', 'who-can-receive-zakat'],
  sources: ['b-nsi-ppf', 'iifa-pension', 'egypt-jewel', 'pk-ordinance', 'bukhari-1447', 'gold-api'],
  en: {
    slug: 'zakat-calculator-india', nav: 'Zakat in India', card: 'Zakat in rupees: wedding gold by carat, PPF and provident fund, fixed deposits and the nisab in tola or grams.',
    title: 'Zakat in India 2026: Gold, PPF and the Nisab in Rupees',
    description: 'Zakat in India for 2026: today’s nisab in rupees on the silver and gold measures, wedding gold by carat, fixed deposits, PPF and EPF balances, with examples.',
    h1: 'Zakat in India, in rupees',
    intro: 'Enter your bank balances and fixed deposits, the gold of the household by weight and carat, and the provident fund you could withdraw now.',
    resume: `At the spot prices of ${E.priceDay}, the nisab in rupees is ${E.money(E.nisab('silver', 'INR'), 'INR')} on ${E.nisabGrams('silver')} g of silver and ${E.money(E.nisab('gold', 'INR'), 'INR')} on ${E.nisabGrams('gold')} g of gold. Zakat is ${E.pct(E.P.rate.lunar)} of the whole if your wealth on the zakat day reaches the measure you follow. India has no government zakat system, so the question is settled at home, often with the local madrasa or imam. In Indian households the largest item is usually gold: jewellery given at weddings, mostly 22 carat. The Hanafi school, followed by most Muslims in the north, counts it even when worn; the Shafi‘i school, followed in much of Kerala and on the Konkan coast, exempts jewellery in normal use. A family in Hyderabad with ${E.money(265000, 'INR')} saved and 62 g of 22 carat jewellery owes ${E.money(hyd.zakat, 'INR')} on the Hanafi count.`,
    faqs: [
      { q: 'Do I pay zakat on money locked in a fixed deposit?', a: 'Yes. A fixed deposit is your money and you can break it, even if the bank cuts the interest for premature closure. Count the amount you would receive if you closed it on your zakat day. The interest itself is a separate question: many scholars advise giving it away rather than keeping it.' },
      { q: 'How should a PPF account be counted for zakat?', a: 'A PPF account matures after fifteen financial years, with loans from the third year and partial withdrawals from the seventh. Scholars who count only what you can reach include the amount you could withdraw this year; those who look at ownership count the whole balance. The calculator lets you enter either figure.' },
      { q: 'Is the nisab in India still worked out in tola?', a: 'Many Indian madrasas and jewellers still think in tola, and printed zakat charts often use tola weights. The calculator uses grams. Pick the international weights of 85 g and 595 g, or the statutory weights of Pakistan, 87.48 g and 612.32 g, which come from the same tola tradition.' },
      { q: 'Who publishes the amount of sadaqat al-fitr in India?', a: 'No national or statutory body does. Regional muftis and madrasas announce figures each Ramadan, which differ from state to state with the price of wheat. The calculator lets you type your own amount per person, based on half a sa’ of wheat in the Hanafi school or one sa’ of rice or dates.' },
    ],
    body: (h) => {
      const sI = h.nisab('silver', 'INR'), gI = h.nisab('gold', 'INR');
      const shafii = h.zakat({ cur: 'INR', cash: 265000, jewelG: 62, jewelK: 22, jewelRule: 'exclude' });
      const ppfWhole = 640000, ppfReach = 180000;
      const withWhole = h.zakat({ cur: 'INR', cash: 95000, pension: ppfWhole });
      const withReach = h.zakat({ cur: 'INR', cash: 95000, pension: ppfReach });
      const rows = ['24', '22', '18'].map((k) => [`${k} carat`, h.money(h.goldGram(Number(k), 'INR'), 'INR'), `${h.dec(h.nisabGrams('gold') * 24 / Number(k), 1)} g`]);
      return `
<h2>Where Indian families start</h2>
<p>Zakat in India is entirely voluntary in the legal sense: no statute governs it and no state agency collects it. That puts the whole calculation in the hands of the family. The usual sequence is to fix a zakat day, often in Ramadan, add up gold, cash and deposits, check the total against the nisab, then pay. At the spot prices of ${h.priceDay} the silver nisab is ${h.money(sI, 'INR')} and the gold nisab ${h.money(gI, 'INR')}. The gold line is ${h.dec(h.ratio(), 1)} times higher, so the measure you choose changes everything for a household with modest savings. The hadith behind both figures is in ${h.src('bukhari-1447', 'Sahih al-Bukhari')}.</p>
${h.mini('nisab', { t: 'Nisab today in Indian rupees', p: ['cur'], d: { cur: 'INR' } })}

<h2>Wedding gold, carat by carat</h2>
<p>Indian jewellery is sold by weight and carat, and the hallmark tells you both. Zakat is counted on the pure gold it contains. The table gives the price of a gram today and how many grams of each carat hold ${h.nisabGrams('gold')} g of pure gold.</p>
${h.table(['Carat', 'Price of 1 g today', 'Weight holding the gold nisab'], rows, `Spot prices of ${h.priceDay}; a jeweller buys below this.`, ['l', 'r', 'r'])}
<p>The schools split on worn jewellery, and the ${h.src('egypt-jewel', 'fatwa of Dar al-Ifta of Egypt')} sets out both sides: the Hanafis count it, the majority of the Malikis, Shafi‘is and Hanbalis do not, while all count gold kept as savings. For the Hyderabad family above, that is the difference between ${h.money(hyd.zakat, 'INR')} and ${h.money(shafii.zakat, 'INR')}. Gold coins and biscuits bought as an investment count on every view, and so does jewellery stored in a bank locker that nobody wears.</p>
${h.mini('zakat', { t: 'Savings and wedding jewellery', p: ['cash', 'jewelG', 'jewelRule'], d: { cur: 'INR', cash: 265000, jewelG: 62, jewelK: '22' } })}

<h2>Fixed deposits, recurring deposits and savings accounts</h2>
<p>Bank deposits of every kind count at the amount you would receive if you closed them on your zakat day. A recurring deposit is simply the instalments paid in so far. Many Indian Muslims keep part of their savings in gold rather than a bank precisely to avoid interest; where interest has been credited, scholars commonly advise giving it away without the intention of reward and counting only the principal for zakat.</p>

<h2>PPF, EPF and other locked savings</h2>
<p>The Public Provident Fund is the clearest example of savings you own but cannot freely spend. According to the ${h.src('b-nsi-ppf', 'National Savings Institute of the Ministry of Finance')}, you may deposit up to ₹1,50,000 in a financial year, take a loan from the third to the sixth year, make a withdrawal every year from the seventh, and the account matures after fifteen full financial years. The Employees’ Provident Fund raises the same question: money set aside for you, released on conditions.</p>
<p>The ${h.src('iifa-pension', 'International Islamic Fiqh Academy')} links zakat to control: a fund you direct is added to your zakatable wealth, while one you cannot touch is zakatable for a single year once you receive it. Applied to a PPF balance of ${h.money(ppfWhole, 'INR')}, of which ${h.money(ppfReach, 'INR')} could be withdrawn this year, with ${h.money(95000, 'INR')} in the bank, the total zakat is ${h.money(withWhole.zakat, 'INR')} if you count the whole balance and ${h.money(withReach.zakat, 'INR')} if you count what you can reach.</p>
${h.mini('zakat', { t: 'Bank balance and a PPF account', p: ['cash', 'pension'], d: { cur: 'INR', cash: 95000, pension: ppfReach } })}

<h2>Debts, loans and EMIs</h2>
<p>Many households carry a home loan, a two-wheeler loan or gold pledged against a loan. Most fatwa bodies let you deduct the instalments falling due in the coming months, not the whole loan outstanding. Gold pledged with a lender still belongs to you and counts, while the loan it secures is deducted to the extent it is due now. A family that owes ₹40,000 of EMIs this quarter enters that figure under debts, and the calculator removes it from the total before comparing with the nisab.</p>

<h2>Plots, flats and the family business</h2>
<p>The flat you live in carries no zakat, nor does a shop building you use. A plot bought to sell at a profit is trade goods and counts at its market value each year; rent you have saved counts like any cash. In a family shop, count the stock at sale value with the cash and money owed to you, then take off what you owe suppliers. The ${h.a('zakat-on-property', 'property page')} goes through the cases.</p>

<h2>Sadaqat al-fitr and who receives zakat</h2>
<p>There is no all-India figure for sadaqat al-fitr; local muftis announce one each Ramadan, and the zakat al-fitr calculator takes your own amount per person. Ramadan 1448 is expected to begin on ${h.day(h.ramadan1448)} on the Umm al-Qura calendar, and Indian moon sighting may fall a day later. On who may receive zakat, the ${h.a('who-can-receive-zakat', 'recipients page')} lists the eight categories of the Qur’an.</p>
`;
    },
  },
});
