import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');

const ded = E.zakat({ cur: 'KES', cash: 2400000, debts: 560000, debtRule: 'deduct', basis: 'silver' });
const none = E.zakat({ cur: 'KES', cash: 2400000, debts: 560000, debtRule: 'none', basis: 'silver' });

export default defineGuide({
  id: 'zakat-on-debts', group: 'assets', order: 90, tool: 'debts', toolArg: { assets: 2400000, debts: 560000, owed: 350000, cur: 'KES' },
  related: ['how-to-calculate-zakat', 'zakat-on-business', 'zakat-on-property', 'zakat-on-savings', 'zakat-al-maal', 'nisab'],
  sources: ['quran-9-60', 'islamweb-debts', 'islamweb-debts2', 'iifa-debts', 'pk-calc', 'ppz-business', 'gold-api'],
  en: {
    slug: 'zakat-on-debts', nav: 'Debts and loans', card: 'What you owe and what others owe you: when a debt lowers your zakat, and when a loan you made still counts.',
    title: 'Zakat on Debts 2026: Loans You Owe and Money Owed to You',
    description: 'Zakat on debts in 2026: debts due deducted on the majority view and not on the newer Shafi‘i one, both amounts shown, and when money lent to others is counted.',
    h1: 'Zakat and debts, in both directions',
    intro: 'Enter your zakatable assets, the debts you must pay now and the money others owe you that you expect back.',
    resume: `Debts work in two directions. Debts you owe that are due now are deducted from your zakatable wealth on the view of Abu Hanifa, Malik, Ahmad and the older opinion of al-Shafi‘i, as Islamweb reports in fatwa 47139; the newer opinion of al-Shafi‘i does not deduct them. With ${E.money(2400000, 'KES')} of savings and ${E.money(560000, 'KES')} of debts due, a household in Nairobi owes ${E.money(ded.zakat, 'KES')} with the deduction and ${E.money(none.zakat, 'KES')} without it, at ${E.pct(E.P.rate.lunar)} and the silver nisab of ${E.money(E.nisab('silver', 'KES'), 'KES')} on the prices of ${E.priceDay}. Money you have lent is the other side. The International Islamic Fiqh Academy ruled in 1985 that zakat on a debt is due from the lender every year when the borrower is solvent and willing to pay, and only after a year from the day it is received when the borrower is insolvent or delays.`,
    faqs: [
      { q: 'Does the Shafi‘i school deduct my debts before zakat?', a: 'Not in the newer opinion of al-Shafi‘i, which Islamweb reports in fatwa 47139: a debt does not stop zakat from being due on what you hold. His older opinion, like the Hanafi, Maliki and Hanbali schools, deducts debts from cash, gold, silver and trade goods. The calculator shows both results so you can follow your school.' },
      { q: 'I lent money to my brother. Do I pay zakat on it?', a: 'If he is able and willing to repay, the International Islamic Fiqh Academy says zakat on that debt is due from you every year, as if the money were still in your account. If he cannot pay or keeps delaying, you pay for one year only, after a year has passed from the day the money comes back to you.' },
      { q: 'Should I deduct my credit card balance and student loan?', a: 'The calculator asks for debts due now: a credit card bill you must settle this month, the instalments of the coming months, rent or tax already owed. A student loan or car loan repaid over years enters only through the instalments falling due, not through its whole balance, which would otherwise cancel the zakat of most borrowers.' },
      { q: 'Do debts reduce the zakat on crops as well?', a: 'Not in the Hanafi school. Islamweb’s fatwa 64373 explains that for the Hanafis a debt prevents zakat on hidden wealth, meaning gold, silver, cash and trade goods, and on grazing livestock, but not on what the earth produces. The crop zakat, a tenth or a twentieth, is taken from the harvest whatever the farmer owes.' },
    ],
    body: (h) => {
      const c = 'KES';
      const a = h.zakat({ cur: c, cash: 2400000, debts: 560000, debtRule: 'deduct', basis: 'silver' });
      const b = h.zakat({ cur: c, cash: 2400000, debts: 560000, debtRule: 'none', basis: 'silver' });
      const small = h.zakat({ cur: c, cash: 180000, debts: 60000, debtRule: 'deduct', basis: 'silver' });
      const smallN = h.zakat({ cur: c, cash: 180000, debts: 60000, debtRule: 'none', basis: 'silver' });
      const lent = h.zakat({ cur: c, cash: 2400000, receivable: 350000, debts: 560000, basis: 'silver' });
      const rows = [
        ['Abu Hanifa, Malik, Ahmad, al-Shafi‘i (older view)', 'Deducted from cash, gold, silver and trade goods', h.money(a.zakat, c)],
        ['al-Shafi‘i (newer view)', 'Not deducted', h.money(b.zakat, c)],
      ];
      return `
<h2>The debts you owe</h2>
<p>A household with savings in the bank often has bills, loan instalments or a family debt waiting to be paid. Whether those debts lower the zakat is one of the questions on which the schools of law clearly differ, and the difference shows up in the amount. ${h.src('islamweb-debts', 'Islamweb, in fatwa 47139')}, sets out the two positions. The majority of scholars, the school of Abu Hanifa, Malik, al-Shafi‘i in his older opinion and Ahmad, hold that a debt prevents zakat on hidden wealth, that is gold, silver, cash and trade goods: if the debt swallows the nisab or brings the wealth below it, nothing is due; if it does not, its amount is deducted and zakat is paid on the rest. Al-Shafi‘i in the newer of his two opinions holds that a debt does not prevent zakat.</p>
${h.table(['Position', 'Debts due', `Zakat on ${h.money(2400000, c)} with ${h.money(560000, c)} owed`], rows, `Two answers for the same household, silver nisab of ${h.priceDay}.`, ['l', 'l', 'r'])}
<p>The gap is ${h.money(b.zakat - a.zakat, c)} here: one fortieth of the debt. For a family close to the threshold, the choice can decide whether anything is due at all. With ${h.money(180000, c)} in savings and ${h.money(60000, c)} of bills due, the deducting view gives ${small.due ? h.money(small.zakat, c) : 'nothing, since what is left is below the nisab'}, the other ${smallN.due ? h.money(smallN.zakat, c) : 'nothing either'}.</p>
${h.mini('debts', { t: 'Your debts and savings in Kenyan shillings', p: ['assets', 'debts', 'owed'], d: { assets: 2400000, debts: 560000, owed: 0, cur: c } })}

<h2>Which debts count as due</h2>
<p>The question is not how much you will owe over your lifetime, but what you must pay now. The calculator asks for debts due on your zakat day: a credit card balance to be cleared this month, the instalments of the coming months on a car or a student loan, rent and school fees already invoiced, tax assessed and unpaid, money promised to a relative for a fixed date. A mortgage enters through its instalments, not its full balance. If the whole twenty year balance were deducted, almost no homeowner would ever pay zakat, while holding savings far above the nisab.</p>
<p>Business owners do the same with their trade debts. The ${h.src('pk-calc', 'Punjab Zakat and Ushr Department’s calculator')} asks to deduct direct payables or liabilities not deducted elsewhere, and adds that the loan should have been used on zakatable wealth only. The ${h.src('ppz-business', 'Malaysian zakat centre')} subtracts current liabilities from current assets before applying 2.5 %. The ${h.a('zakat-on-business', 'business calculator')} applies this to stock, cash and receivables.</p>
<p>One more limit comes from the Hanafi school. ${h.src('islamweb-debts2', 'Islamweb’s fatwa 64373')} explains that for the Hanafis a debt prevents zakat on hidden wealth and on grazing livestock, but not on what the earth produces; the tenth or twentieth due on a harvest is taken in full.</p>

<h2>The money others owe you</h2>
<p>The other side of the ledger is money you have lent or are owed: a loan to a friend, wages not yet paid, a deposit held by a landlord, an invoice to a client. The ${h.src('iifa-debts', 'International Islamic Fiqh Academy')}, in its first resolution of December 1985, notes that the schools differ clearly here and settles on two rules. When the debtor is solvent and willing to pay, zakat on the debt is due from its owner every year, as if the money were still in hand. When the debtor is insolvent or keeps delaying, zakat is due after a year has passed from the day the money is received.</p>
<p>In practice, a debt you are sure to get back is added to your wealth each zakat day. If the Nairobi household is also owed ${h.money(350000, c)} by a cousin who will repay, its sum becomes ${h.money(lent.net, c)} after deducting its own debts, and its zakat ${h.money(lent.zakat, c)}. A debt you doubt you will see again is left aside until it comes back; you then count it once, a year after receiving it. The debts calculator above lets you enter the first kind in its third field.</p>

<h2>A debt forgiven as zakat</h2>
<p>People sometimes ask whether they can simply cancel what a poor borrower owes them and count it as their zakat. Debtors are among the eight categories of ${h.src('quran-9-60', 'Qur’an 9:60')}, so a struggling borrower can receive zakat; the forgiving of a debt in place of paying is a separate question on which scholars hold different views, and the sources read for this page do not settle it. Ask a scholar you trust before treating a written off loan as zakat paid, and see the page on ${h.a('who-can-receive-zakat', 'who can receive zakat')} for the categories.</p>
`;
    },
  },
});
