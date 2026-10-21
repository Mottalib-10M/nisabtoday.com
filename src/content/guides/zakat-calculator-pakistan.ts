import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');
const pkN = E.P.nisab.pk1447.pkr;
const lahore = E.zakat({ cur: 'PKR', cash: 380000, jewelG: 46, jewelK: 22, conv: 'pk' });

export default defineGuide({
  id: 'zakat-calculator-pakistan', group: 'country', order: 30, tool: 'zakat', toolArg: { cur: 'PKR', conv: 'pk' },
  related: ['nisab', 'fitrana', 'zakat-on-gold', 'zakat-on-savings', 'when-is-zakat-due', 'zakat-on-shares'],
  sources: ['pk-ordinance', 'pk-nisab-1447', 'b-pk-rules', 'pk-faq', 'pk-calc', 'b-cii-1447'],
  en: {
    slug: 'zakat-calculator-pakistan', nav: 'Zakat in Pakistan', card: 'Zakat in rupees under the 1980 Ordinance: bank deduction on 1 Ramadan, the notified nisab, CZ-50 and gold in tola weights.',
    title: 'Zakat 2026 in Pakistan: Nisab in Rupees and Bank Deduction',
    description: `Zakat in Pakistan for 2026: the notified nisab of ${E.money(pkN, 'PKR')}, deduction at source on 1 Ramadan, the CZ-50 declaration and the 612.32 g silver nisab in rupees.`,
    h1: 'Zakat in Pakistan, in rupees',
    intro: 'Enter your savings, gold and shares in rupees; the calculator already uses the weights of the 1980 Ordinance, 612.32 g of silver and 87.48 g of gold.',
    resume: `Pakistan is one of the few countries where zakat is a matter of law. Under the Zakat and Ushr Ordinance of 1980, banks deduct ${E.pct(E.P.rate.lunar)} at source on the first day of Ramadan from savings and profit-and-loss sharing accounts above a nisab notified each year: ${E.money(pkN, 'PKR')} for the deduction of 1 Ramadan 1447, set by the Administrator General Zakat. The Ordinance defines the nisab as ${E.dec(E.nisabGrams('silver', 'pk'))} g of silver, or ${E.dec(E.nisabGrams('gold', 'pk'))} g of gold for someone who owns only gold. At the spot prices of ${E.priceDay}, ${E.dec(E.nisabGrams('silver', 'pk'))} g of silver is worth ${E.money(E.nisab('silver', 'PKR', 'pk'), 'PKR')}. The bank deduction covers only certain accounts; gold, cash at home, shares held privately and business stock are left to you. A family in Lahore with ${E.money(380000, 'PKR')} saved and 46 g of 22 carat jewellery owes ${E.money(lahore.zakat, 'PKR')} on the Hanafi reading.`,
    faqs: [
      { q: 'Why did my bank deduct zakat on the first of Ramadan?', a: 'Because the 1980 Ordinance makes banks zakat deducting agencies. On the valuation date, the first of Ramadan, they take 2.5% from savings and PLS accounts whose balance is at or above the nisab notified for that year. The deduction is made by the bank under the law; the account holder does not choose it, unless an exemption has been filed in time.' },
      { q: 'How do I stop zakat being deducted from my savings account?', a: 'The law allows an exemption on grounds of faith and fiqh. You swear a declaration in Form CZ-50 on stamp paper and give an attested copy to the bank at least thirty days before the valuation date, under rule 20 of the Collection and Refund Rules. The declaration stays valid while the account remains with that bank.' },
      { q: 'If the bank already took zakat, do I still owe anything?', a: 'Most families treat the deduction as the zakat of that account for the year and do not pay it twice. On everything else you own, gold, cash at home, a current account, shares in your own name or business stock, nothing has been deducted and you work it out yourself. Add the deducted account to the total only to check the nisab.' },
      { q: 'Is the tola still used for the nisab in Pakistan?', a: 'In conversation and at the jeweller, yes: families still weigh gold in tolas. The law itself writes grams, 87.48 g of gold and 612.32 g of silver, so a tola figure should be converted before comparing. The calculator uses the grams of the statute when you pick the Pakistani weights.' },
    ],
    body: (h) => {
      const sP = h.nisab('silver', 'PKR', 'pk'), gP = h.nisab('gold', 'PKR', 'pk'), s85 = h.nisab('silver', 'PKR');
      const higher = pkN > sP;
      const hanafi = h.zakat({ cur: 'PKR', cash: 380000, jewelG: 46, jewelK: 22, conv: 'pk' });
      const shafii = h.zakat({ cur: 'PKR', cash: 380000, jewelG: 46, jewelK: 22, jewelRule: 'exclude', conv: 'pk' });
      const shop = h.zakat({ cur: 'PKR', cash: 260000, stock: 1450000, debts: 310000, conv: 'pk' });
      return `
<h2>A zakat system written into law</h2>
<p>The ${h.src('pk-ordinance', 'Zakat and Ushr Ordinance of 1980')} created the system Pakistan still runs. Its section 2 defines the nisab as ${h.dec(h.nisabGrams('silver', 'pk'))} g of silver, or cash, gold, goods for trade and other zakatable assets worth as much, as notified by the Administrator General for each zakat year; a person whose zakatable assets are only gold uses ${h.dec(h.nisabGrams('gold', 'pk'))} g of gold. These are the metric forms of the tola weights long used in South Asia. The ${h.src('pk-faq', 'Punjab Zakat and Ushr Department')} lists banks, offices and financial institutions as the deducting agencies and the first of Ramadan as the day of deduction on profit-and-loss sharing accounts.</p>

<h2>The notified nisab and today’s price</h2>
<p>For the deduction of 1 Ramadan 1447 the nisab was notified at ${h.money(pkN, 'PKR')} (${h.src('pk-nisab-1447', 'Administrator General Zakat, via APP')}). It is fixed once for the year, from the silver price at the time. Your own calculation uses the price of the day. At the spot prices of ${h.priceDay}, ${h.dec(h.nisabGrams('silver', 'pk'))} g of silver is worth ${h.money(sP, 'PKR')}, which is ${higher ? 'below' : 'above'} the notified figure; ${h.dec(h.nisabGrams('gold', 'pk'))} g of gold is worth ${h.money(gP, 'PKR')}. On the more common international weight of ${h.nisabGrams('silver')} g, the silver nisab would be ${h.money(s85, 'PKR')}.</p>
${h.table(['Measure', 'Weight', 'Value in rupees'], [['Notified for 1 Ramadan 1447', 'silver, fixed in February 2026', h.money(pkN, 'PKR')], ['Ordinance, silver', `${h.dec(h.nisabGrams('silver', 'pk'))} g`, h.money(sP, 'PKR')], ['Ordinance, gold only', `${h.dec(h.nisabGrams('gold', 'pk'))} g`, h.money(gP, 'PKR')], ['International silver', `${h.nisabGrams('silver')} g`, h.money(s85, 'PKR')]], `Values at the spot prices of ${h.priceDay}.`, ['l', 'l', 'r'])}
<p>The notified figure only decides which bank accounts are touched. For the rest of your wealth, a household that wants to follow the statute compares its total with the silver weight of the Ordinance at today’s price. The calculator above starts with those weights.</p>

<h2>What the bank takes, and what it leaves to you</h2>
<p>Deduction at source applies to the assets listed in the First Schedule of the Ordinance: savings bank accounts, profit-and-loss sharing accounts and similar deposits among them. Under the ${h.src('b-pk-rules', 'Zakat (Collection and Refund) Rules 1981')}, the valuation date is the first day of Ramadan and the zakat is computed on the balance of that day. A current account, gold kept at home, foreign currency in a locker, plots bought for resale and the stock of a shop are not deducted by anyone. They are where most Pakistani families owe the bulk of their zakat.</p>
<p>Take a cloth merchant in Faisalabad with ${h.money(260000, 'PKR')} in a current account, stock worth ${h.money(1450000, 'PKR')} at sale price, and ${h.money(310000, 'PKR')} owed to suppliers this month. The net is ${h.money(shop.net, 'PKR')} and the zakat ${h.money(shop.zakat, 'PKR')}. None of it would have been deducted by the bank.</p>
${h.mini('zakat', { t: 'Shop stock, current account and supplier debts', p: ['cash', 'stock', 'debts'], d: { cur: 'PKR', cash: 260000, stock: 1450000, debts: 310000, conv: 'pk' } })}

<p>Listed shares are a special case. The First Schedule of the Ordinance values shares quoted on the exchange at their closing rate on the valuation date and unlisted shares at their paid-up value, which means zakat on them can be taken at source from shareholders who have not filed an exemption. If your statement shows such a deduction, do not count those shares again; if your broker account holds shares on which nothing was deducted, enter their market value in the calculator, as the ${h.a('zakat-on-shares', 'shares page')} explains.</p>

<h2>CZ-50: the declaration of exemption</h2>
<p>The law lets a Muslim who, by his faith and fiqh, does not consider the state deduction binding on him file a sworn declaration in Form CZ-50, on stamp paper. Rule 20 of the 1981 Rules requires the attested copy to reach the bank at least thirty days before the valuation date, and it stays valid while the declaration and the account remain with the same bank. Filing it does not cancel zakat: it means you pay it yourself, to recipients you choose.</p>

<h2>Gold, the Hanafi way</h2>
<p>Most Pakistanis follow the Hanafi school, which counts gold jewellery that is worn. The ${h.src('pk-calc', 'Punjab department’s own calculator')} has rows for 24, 22 and 18 carat gold and jewellery, and lists household silver too. With ${h.money(380000, 'PKR')} saved and 46 g of 22 carat jewellery, the Hanafi count gives ${h.money(hanafi.zakat, 'PKR')}. A family following the Shafi‘i view, which exempts jewellery in normal use, would pay ${h.money(shafii.zakat, 'PKR')}. The ${h.a('zakat-on-gold', 'gold page')} converts any carat to pure metal.</p>
${h.mini('zakat', { t: 'Savings and worn 22 carat jewellery', p: ['cash', 'jewelG', 'jewelRule'], d: { cur: 'PKR', cash: 380000, jewelG: 46, jewelK: '22', conv: 'pk' } })}

<h2>Fitrana and fidya</h2>
<p>The Council of Islamic Ideology fixes the sadqa-i-fitr each Ramadan: ${h.money(h.fitr('pakistan').fitr!, 'PKR')} per person at the minimum, on wheat, for 1447 (${h.src('b-cii-1447', 'CII, via APP')}). The ${h.a('fitrana', 'fitrana page')} gives the amounts on barley, dates and raisins. Figures for 1448 are to be published before Ramadan, expected to begin on ${h.day(h.ramadan1448)} on the Umm al-Qura calendar; in Pakistan the date follows the official moon sighting.</p>
`;
    },
  },
});
