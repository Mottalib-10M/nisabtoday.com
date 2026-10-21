import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');
const rrsp = 21000, rrspNet = rrsp * 0.7;
const mississauga = E.zakat({ cur: 'CAD', cash: 8800, shares: 19500, pension: rrspNet });

export default defineGuide({
  id: 'zakat-calculator-canada', group: 'country', order: 50, tool: 'zakat', toolArg: { cur: 'CAD' },
  related: ['zakat-on-pension', 'zakat-on-shares', 'zakat-on-savings', 'nisab', 'zakat-on-debts', 'zakat-al-fitr'],
  sources: ['b-cra-limits', 'b-cra-rrsp-withholding', 'iifa-pension', 'iifa-shares', 'zatca-reg', 'gold-api'],
  en: {
    slug: 'zakat-calculator-canada', nav: 'Zakat in Canada', card: 'Zakat in Canadian dollars: TFSA, RRSP after withholding tax, RESP and the nisab of the day.',
    title: 'Zakat in Canada 2026: TFSA, RRSP and the Nisab in CAD',
    description: 'Zakat in Canada for 2026: today’s nisab in Canadian dollars, how a TFSA and an RRSP are counted after the withholding tax on withdrawals, and a worked example.',
    h1: 'Zakat in Canada, in Canadian dollars',
    intro: 'Enter chequing and savings balances, your TFSA, and what an RRSP would pay you today once the withholding tax is taken off.',
    resume: `At the spot prices of ${E.priceDay}, the nisab is ${E.money(E.nisab('silver', 'CAD'), 'CAD')} in Canadian dollars on the silver measure and ${E.money(E.nisab('gold', 'CAD'), 'CAD')} on the gold measure. Above the threshold you follow, zakat is ${E.pct(E.P.rate.lunar)} of all your zakatable wealth. Canada has no zakat law and no official zakat body, so families decide with their mosque or a scholar. Two registered accounts shape the Canadian calculation. A TFSA can be emptied at any time without tax, so its whole value counts. An RRSP can also be cashed in, but the bank withholds tax on every withdrawal: 10% up to $5,000, 20% up to $15,000 and 30% above, outside Quebec, according to the Canada Revenue Agency. A family in Mississauga with ${E.money(8800, 'CAD')} in the bank, a ${E.money(19500, 'CAD')} TFSA and an RRSP of ${E.money(rrsp, 'CAD')} worth about ${E.money(rrspNet, 'CAD')} after withholding owes ${E.money(mississauga.zakat, 'CAD')} this year.`,
    faqs: [
      { q: 'Does my whole TFSA count for zakat even if I keep it for retirement?', a: 'Yes on the usual reading. A Tax-Free Savings Account can be withdrawn at any time without tax, so nothing stands between you and the money. Count cash in it at face value and investments at their market value on your zakat day. The yearly contribution room only limits deposits.' },
      { q: 'Is the RRSP withholding tax the final tax on the money?', a: 'Not necessarily. The withholding is a prepayment, and the withdrawal is added to your income on your return, so the final tax can be higher or lower. For zakat, use a realistic estimate of what you would keep. The calculator accepts the tax rate you think applies.' },
      { q: 'What about an RESP saved for my children?', a: 'An RESP mixes your own savings with money set aside for a child’s education. Ask the plan provider which part you could take back for yourself today: many families count that part as reachable wealth and leave the rest out. If you see the plan as your child’s, discuss it with a scholar you trust.' },
      { q: 'Does Quebec change anything for zakat?', a: 'Only the arithmetic. The federal withholding rates on RRSP withdrawals are lower in Quebec, so the amount left after withholding looks different there, and your final tax still depends on your return. The zakat rule itself, count what you can reach, is the same in every province.' },
    ],
    body: (h) => {
      const sC = h.nisab('silver', 'CAD'), gC = h.nisab('gold', 'CAD');
      const w = (x: number) => (x <= 5000 ? 0.1 : x <= 15000 ? 0.2 : 0.3);
      const rows = [4000, 12000, 30000].map((x) => [h.money(x, 'CAD'), h.pct(w(x), 0), h.money(x * (1 - w(x)), 'CAD'), h.money(x * (1 - w(x)) * h.P.rate.lunar, 'CAD')]);
      const receipt = h.zakat({ cur: 'CAD', cash: 8800, shares: 19500, pension: rrspNet, pensionRule: 'receipt' });
      const mortgage = h.zakat({ cur: 'CAD', cash: 14000, shares: 9000, debts: 5400 });
      const noDeduct = h.zakat({ cur: 'CAD', cash: 14000, shares: 9000, debts: 5400, debtRule: 'none' });
      return `
<h2>The Canadian threshold today</h2>
<p>The nisab follows the market price of metal. At the ${h.src('gold-api', 'spot prices')} of ${h.priceDay}, ${h.nisabGrams('silver')} g of silver is worth ${h.money(sC, 'CAD')} and ${h.nisabGrams('gold')} g of gold ${h.money(gC, 'CAD')}. Mosques in Toronto, Montreal, Calgary and Vancouver do not share one ruling on which to use; the calculator starts with silver and switches with one click. The gap matters for students and newcomers whose savings fall between the two figures.</p>
${h.mini('nisab', { t: 'Nisab today in Canadian dollars', p: ['cur'], d: { cur: 'CAD' } })}

<h2>TFSA: count it like a bank account</h2>
<p>The Tax-Free Savings Account is the most common Canadian savings vehicle. The ${h.src('b-cra-limits', 'Canada Revenue Agency')} sets the dollar limit for 2026 at $7,000, added to any room carried over. Since withdrawals are tax-free and available at any time, the whole value counts for zakat. A TFSA invested in a broad equity fund held for years raises the same question as any share portfolio: the ${h.src('iifa-shares', 'International Islamic Fiqh Academy')} distinguishes trading from long-term holding, and the ${h.a('zakat-on-shares', 'shares page')} explains how to count only the zakatable part of the companies.</p>

<h2>RRSP: what you would keep after withholding</h2>
<p>The RRSP limit for 2026 is $33,810 (${h.src('b-cra-limits', 'CRA')}). An RRSP can be cashed in before retirement, but the financial institution withholds tax on each lump sum. Outside Quebec the rates are 10% on amounts up to $5,000, 20% on amounts over $5,000 up to $15,000 and 30% over $15,000; in Quebec they are 5%, 10% and 15% (${h.src('b-cra-rrsp-withholding', 'CRA, tax rates on withdrawals')}).</p>
${h.table(['Withdrawal', 'Withheld outside Quebec', 'Left after withholding', 'Zakat on it at 2.5%'], rows, 'Withholding is a prepayment; the final income tax is settled on your return.', ['r', 'r', 'r', 'r'])}
<p>Scholars who count retirement accounts each year use the reachable amount. Those who follow the ${h.src('iifa-pension', 'Fiqh Academy’s rule for funds you cannot control')} wait until the money is paid out. For the Mississauga family, the first reading gives ${h.money(mississauga.zakat, 'CAD')} and the second ${h.money(receipt.zakat, 'CAD')}, on the bank account and the TFSA alone. A defined benefit pension from an employer, which you cannot cash in, belongs firmly in the second case.</p>
${h.mini('zakat', { t: 'Bank, TFSA and an RRSP after withholding', p: ['cash', 'shares', 'pension', 'pensionRule'], d: { cur: 'CAD', cash: 8800, shares: 19500, pension: rrspNet } })}

<h2>Mortgages, car loans and credit cards</h2>
<p>Canadian households often carry a mortgage for decades. Deducting the whole balance would wipe out zakat for nearly every homeowner, and most fatwa bodies do not do so: they deduct only what is due now, such as the next payments and a card balance you will clear this month. With ${h.money(14000, 'CAD')} in the bank, ${h.money(9000, 'CAD')} in a TFSA and ${h.money(5400, 'CAD')} of payments due within the next months, the zakat is ${h.money(mortgage.zakat, 'CAD')} with the deduction and ${h.money(noDeduct.zakat, 'CAD')} on the Shafi‘i view, which does not deduct debts. The ${h.a('zakat-on-debts', 'debts page')} sets out each school.</p>

<h2>Self-employed, contractors and small shops</h2>
<p>A sole proprietor or incorporated contractor adds the business side to the personal one. Count the stock you hold for sale at the price you would sell it, the cash in the business account and invoices clients will pay. Then take off what the business owes now: supplier bills, wages due and sales tax you have collected and must pass on. Equipment, a van or a laptop used for the work are tools, not trade goods, and carry no zakat. A courier with ${h.money(6200, 'CAD')} in the business account, ${h.money(3100, 'CAD')} of unpaid invoices and ${h.money(1900, 'CAD')} of tax to remit has ${h.money(6200 + 3100 - 1900, 'CAD')} of business wealth to add to the household total.</p>

<h2>Gold brought from home</h2>
<p>Newcomers from South Asia, the Middle East and East Africa often hold family gold rather than investments. Weigh it, read the carat stamp, and enter it in the calculator’s advanced options: gold kept as savings counts on every view, worn jewellery only on the Hanafi one.</p>

<h2>Calendar year or lunar year</h2>
<p>Many Canadians prefer to pay in December, when T4 slips and year-end statements are at hand. A Gregorian year is eleven days longer than a lunar one, so the ${h.src('zatca-reg', 'Saudi zakat authority’s regulation')} raises the rate to ${h.pct(h.P.rate.solar, 3)} for 365 days. Ramadan 1448 is expected to begin on ${h.day(h.ramadan1448)} on the Umm al-Qura calendar, for families who keep their zakat day in Ramadan.</p>

<h2>Zakat al-fitr in Canada</h2>
<p>No statutory or government body in Canada publishes a zakat al-fitr amount, and figures announced by charities are not quoted on this site. The ${h.a('zakat-al-fitr', 'zakat al-fitr page')} explains the measure of one sa’ of staple food, so you can price rice or flour at your grocer and enter it as your own amount per person.</p>
`;
    },
  },
});
