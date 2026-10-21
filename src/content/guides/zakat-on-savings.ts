import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');

export default defineGuide({
  id: 'zakat-on-savings', group: 'assets', order: 30, tool: 'cash', toolArg: { amt: 7400, cur: 'EUR' },
  related: ['nisab', 'how-to-calculate-zakat', 'zakat-on-debts', 'when-is-zakat-due', 'zakat-calculator-pakistan', 'zakat-on-silver'],
  sources: ['ppz-savings', 'pk-faq', 'pk-nisab-1447', 'islamweb-debts', 'kuwait-calc', 'ecb'],
  en: {
    slug: 'zakat-on-savings', nav: 'Zakat on savings', card: 'Bank balances, cash at home and foreign currency: which balance to take and which nisab applies.',
    title: 'Zakat on Savings 2026: Bank Balances, Cash and the Nisab',
    description: 'Zakat on savings in 2026: current and savings accounts, cash at home and foreign currency, the balance to use on your zakat day, and the silver or gold nisab.',
    h1: 'Zakat on savings and money in the bank',
    intro: 'Enter the total of your accounts and cash on your zakat day and pick silver or gold as the measure: the calculator compares it with today’s nisab.',
    resume: `Zakat on savings is ${E.pct(E.P.rate.lunar)} of the money you hold on your zakat day, in every account and in cash, once that total has stayed above the nisab for a lunar year. The open question is which nisab. On the silver measure the threshold is ${E.money(E.nisab('silver', 'EUR'), 'EUR')} today; on the gold measure it is ${E.money(E.nisab('gold', 'EUR'), 'EUR')}, at the spot prices of ${E.priceDay}. Many scholars apply silver to cash; the Kuala Lumpur zakat centre and Kuwait Zakat House apply gold. The Kuala Lumpur centre takes the last balance at the end of the year rather than an average, and that is what most households do: add every current account, savings account, cash at home and money held in other currencies at the day’s rate. Debts due now are deducted on the majority view. If the result reaches the threshold you follow, one fortieth of the whole is due, not of the part above it.`,
    faqs: [
      { q: 'Do I pay zakat on my current account as well as my savings account?', a: 'Yes. Zakat looks at money you own, not at the label of the account. A current account, an instant access saver, a fixed term deposit, a joint account in proportion to your share and cash kept at home are all added together on your zakat day. Only money already owed to someone else and due now is set against them.' },
      { q: 'My balance went up and down all year. Which figure do I use?', a: 'The figure on your zakat day. The Kuala Lumpur zakat centre writes that zakat is charged on the last balance of the year of saving once the nisab and the year are complete. Swings in between do not need to be averaged, though the schools differ on whether a drop below the nisab during the year restarts the count.' },
      { q: 'I keep money in dollars and pounds as well as euros. How do I add them?', a: 'Convert each balance at the exchange rate of your zakat day, add them, then compare the total with the nisab in that same currency. The calculator does the conversion for 40 currencies using the reference rates of the European Central Bank or ExchangeRate-API, and writes the date of the rates under the result so you can check it.' },
      { q: 'Is money set aside for a house deposit or hajj exempt?', a: 'The conditions the zakat bodies cited here list for savings are two: the total reaches the nisab and a lunar year has passed. A planned use does not appear among them, so money saved for a deposit, a wedding or hajj is counted like any other balance while it sits in your account. If the purchase is made before your zakat day, the money is gone and nothing is due on it.' },
    ],
    body: (h) => {
      const cur = 'EUR';
      const mid = 6500;
      const s = h.zakat({ cur, cash: mid, basis: 'silver' });
      const g = h.zakat({ cur, cash: mid, basis: 'gold' });
      const big = 24800;
      const bs = h.zakat({ cur, cash: big, basis: 'silver' });
      const bd = h.zakat({ cur, cash: big, debts: 3100, basis: 'silver' });
      const bdn = h.zakat({ cur, cash: big, debts: 3100, debtRule: 'none', basis: 'silver' });
      const rows = [
        ['Current account', h.money(4300, cur)],
        ['Instant access savings', h.money(15200, cur)],
        ['Fixed term deposit', h.money(4000, cur)],
        ['Cash at home', h.money(1300, cur)],
        ['<strong>Total on the zakat day</strong>', `<strong>${h.money(big, cur)}</strong>`],
      ];
      return `
<h2>What goes into the total</h2>
<p>Savings, for zakat, means money you own and can use. That covers more than the account with “savings” in its name. A current account, an instant access saver, a notice account, a fixed term deposit, the cash in a drawer and the euros you brought back from a trip all belong in the same sum. So does your share of a joint account. Money you have lent out is a separate question, covered on the ${h.a('zakat-on-debts', 'page on debts')}; money you owe and must pay now is taken off.</p>
<p>Foreign currency is converted at the rate of your zakat day. The calculator reads the reference rates of the ${h.src('ecb', 'European Central Bank')} each working day, and those of ExchangeRate-API for the currencies the ECB does not publish, so a balance in dollars, pounds or dirhams becomes euros on the same basis as the nisab itself.</p>
${h.table(['Where the money is', 'Balance'], rows, 'A household in Lyon on its zakat day. All figures are examples.', ['l', 'r'])}

<h2>The balance on the day, not an average</h2>
<p>Bank balances move every week. The ${h.src('ppz-savings', 'Federal Territories zakat centre in Kuala Lumpur')} answers the practical question directly: zakat of ${h.pct(h.P.rate.lunar)} is charged on the last balance at the end of the year of saving, once the nisab and the year are both met. That is the figure you read on your zakat day, the day your lunar year ends. A salary paid in last week is part of the balance you read; a bonus already spent before the day is not.</p>
<p>The schools differ on what happens if the balance dips below the nisab in the middle of the year. The Hanafi school looks only at the start and the end; the Maliki, Shafi‘i and Hanbali schools require the threshold to hold all year. For most salaried households with a steady cushion, the two readings give the same result.</p>
${h.mini('cash', { t: 'Savings in euros', p: ['amt', 'basis'], d: { amt: big, cur } })}

<h2>Silver or gold: the euro amounts</h2>
<p>For cash, nobody can point to a coin, so the threshold is borrowed from one of the metals. On the silver measure, ${h.nisabGrams('silver')} g, it stands at ${h.money(s.nisab, cur)} today. On the gold measure, ${h.nisabGrams('gold')} g, it stands at ${h.money(g.nisab, cur)}. The ${h.src('ppz-savings', 'Kuala Lumpur centre')} sets the nisab of savings at the value of 85 g of gold, and ${h.src('kuwait-calc', 'Kuwait Zakat House')} states the nisab of money as 85 g of 24 carat gold. Many scholars prefer silver for cash, because more households then pay and more reaches those in need.</p>
<p>For someone holding ${h.money(mid, cur)} the choice is everything. On the silver measure the zakat is ${s.due ? h.money(s.zakat, cur) : 'nothing, as the amount is below even the silver threshold today'}. On the gold measure it is ${g.due ? h.money(g.zakat, cur) : 'nothing, because the amount is below the gold threshold'}. Above both thresholds the measure no longer matters: the ${h.money(big, cur)} of the table owe ${h.money(bs.zakat, cur)} either way, provided the total also clears the gold line on the day.</p>

<h2>Debts and the instalments of the coming months</h2>
<p>Most schools deduct debts that are due before counting. Islamweb sets out the positions in its ${h.src('islamweb-debts', 'fatwa 47139')}: Abu Hanifa, Malik, the earlier view of al-Shafi‘i and Ahmad hold that debt reduces the zakat on money; the later view of al-Shafi‘i holds that it does not. Take the same household with a credit card bill and three months of car finance due, ${h.money(3100, cur)} in all. With the deduction, the zakat is ${h.money(bd.zakat, cur)}. Without it, ${h.money(bdn.zakat, cur)}.</p>
<p>The field asks only for what falls due now. A mortgage with twenty years to run is not set against one year of savings; the instalments of the coming months are.</p>

<h2>Pakistan: deduction at source on 1 Ramadan</h2>
<p>In Pakistan the state collects zakat from savings directly. The ${h.src('pk-faq', 'Punjab Zakat and Ushr Department')} explains that banks deduct it on the 1st of Ramadan every year from savings accounts of the profit and loss sharing type. The deduction applies when the balance is above the nisab notified for that year, which was ${h.money(h.P.nisab.pk1447.pkr, 'PKR')} for the deduction of 1 Ramadan 1447 (${h.src('pk-nisab-1447', 'Administrator General Zakat')}). The figure for 1448 has not been published yet. The ${h.a('zakat-calculator-pakistan', 'Pakistan page')} sets out how the deduction works with the rest of your wealth.</p>

<h2>Money saved for a purpose</h2>
<p>A deposit for a flat, a fund for a child’s wedding, the cost of hajj: these are among the largest balances many families hold. The conditions the zakat bodies list for savings are the nisab and the year, nothing more. Money set aside for a plan therefore counts while it sits in the bank on your zakat day. Once it is paid out, to a seller or a travel agent, it has left your ownership, and the house or the trip is not zakatable wealth. If the timing is close, the ${h.a('when-is-zakat-due', 'date calculator')} tells you exactly which day your year ends.</p>
`;
    },
  },
});
