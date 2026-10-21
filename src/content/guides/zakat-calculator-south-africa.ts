import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');
const savingsPot = 38000, savingsNet = savingsPot * 0.74;
const durban = E.zakat({ cur: 'ZAR', cash: 54000, shares: 72000, pension: savingsNet });

export default defineGuide({
  id: 'zakat-calculator-south-africa', group: 'country', order: 70, tool: 'zakat', toolArg: { cur: 'ZAR' },
  related: ['zakat-on-pension', 'zakat-on-savings', 'zakat-on-gold', 'nisab', 'zakat-on-business', 'when-is-zakat-due'],
  sources: ['b-sars-twopot', 'b-sars-tfi', 'iifa-pension', 'iifa-shares', 'gold-api', 'bukhari-1447'],
  en: {
    slug: 'zakat-calculator-south-africa', nav: 'Zakat in South Africa', card: 'Zakat in rand: the two-pot retirement system, tax-free savings accounts, unit trusts and the nisab of the day.',
    title: 'Zakat in South Africa 2026: Rand Nisab and Two-Pot Savings',
    description: 'Zakat in South Africa for 2026: the nisab in rand at today’s metal prices, how the two-pot savings pot and a tax-free account are counted, with an example.',
    h1: 'Zakat in South Africa, in rand',
    intro: 'Enter bank balances, tax-free savings and unit trusts, gold, and what you could take from your retirement savings pot this year.',
    resume: `In rand, the nisab is ${E.money(E.nisab('silver', 'ZAR'), 'ZAR')} on the silver measure and ${E.money(E.nisab('gold', 'ZAR'), 'ZAR')} on the gold measure at the spot prices of ${E.priceDay}. Zakat is ${E.pct(E.P.rate.lunar)} of the whole once your zakatable wealth reaches the measure you follow. There is no zakat statute in South Africa; communities in Cape Town, Durban and Johannesburg follow their ulama. Since 1 September 2024 the two-pot retirement system has changed one part of the calculation: one third of new retirement contributions goes to a savings component you may draw on once a tax year, with a minimum of R2,000, taxed at your marginal rate, according to SARS. That savings pot is reachable money; the retirement pot is not. A Durban family with ${E.money(54000, 'ZAR')} in the bank, ${E.money(72000, 'ZAR')} in unit trusts and a savings pot of ${E.money(savingsPot, 'ZAR')}, worth about ${E.money(savingsNet, 'ZAR')} after an assumed 26% tax, owes ${E.money(durban.zakat, 'ZAR')}.`,
    faqs: [
      { q: 'Should the two-pot savings component be included in zakat?', a: 'On the view that counts what you can reach, yes: you may withdraw from it once in each tax year, so it is accessible wealth. Enter what you would receive after tax, not the gross balance. Scholars who wait until retirement money is paid out leave it aside until you actually withdraw it.' },
      { q: 'What about the retirement component and vested savings?', a: 'The retirement component is held until you retire and is not available as cash before then. Under the Fiqh Academy’s rule on funds you cannot control, it is zakatable for one year once you receive it. The vested component follows the rules of your fund, so ask the administrator what you could take now.' },
      { q: 'Is a tax-free savings account zakatable in full?', a: 'Yes. The tax exemption only shelters growth from SARS; the money is yours and can be withdrawn. Count cash at face value and unit trusts or ETFs inside it at their market value on your zakat day. The annual and lifetime limits restrict deposits, not your zakat.' },
    ],
    body: (h) => {
      const sZ = h.nisab('silver', 'ZAR'), gZ = h.nisab('gold', 'ZAR');
      const without = h.zakat({ cur: 'ZAR', cash: 54000, shares: 72000, pension: savingsNet, pensionRule: 'receipt' });
      const krugerrand = h.zakat({ cur: 'ZAR', cash: 21000, goldG: 34, goldK: 22 });
      const shop = h.zakat({ cur: 'ZAR', cash: 87000, stock: 265000, debts: 96000 });
      return `
<h2>Rand, gold and a threshold that moves with the exchange rate</h2>
<p>The rand price of gold and silver depends on two markets at once: the metal in dollars and the rand against the dollar. When the currency weakens, the nisab in rand rises even if the metal has not moved. At the ${h.src('gold-api', 'spot prices')} of ${h.priceDay} it stands at ${h.money(sZ, 'ZAR')} on ${h.nisabGrams('silver')} g of silver and ${h.money(gZ, 'ZAR')} on ${h.nisabGrams('gold')} g of gold, both from the hadith on five awaq of silver and twenty dinars of gold in ${h.src('bukhari-1447', 'Sahih al-Bukhari')}. Check it on your zakat day rather than relying on last year’s figure.</p>
${h.mini('nisab', { t: 'Nisab today in rand', p: ['cur'], d: { cur: 'ZAR' } })}

<h2>The two-pot system, pot by pot</h2>
<p>From 1 September 2024 retirement fund contributions are split. According to ${h.src('b-sars-twopot', 'SARS')}, one third of a member’s contributions is allocated to the savings component; a member may withdraw a minimum of R2,000 from it once every tax year, and the withdrawal is taxed at the member’s marginal rate, as income. The rest of new contributions goes to the retirement component, kept for retirement, while savings built up before that date remain under the earlier rules of each fund.</p>
<ul>
<li><strong>Savings component.</strong> Reachable once a year. Scholars who count accessible retirement money include it, net of the tax you would pay.</li>
<li><strong>Retirement component.</strong> Not available before retirement. On the ${h.src('iifa-pension', 'International Islamic Fiqh Academy’s resolution 143')}, funds the employee cannot control are zakatable for one year when received.</li>
<li><strong>Vested component.</strong> Depends on the fund’s rules for leaving or resigning; count what you could actually take.</li>
</ul>
<p>For the Durban family, counting the savings pot gives ${h.money(durban.zakat, 'ZAR')}; leaving it out until a withdrawal is made gives ${h.money(without.zakat, 'ZAR')}. The 26% is an assumed marginal rate for the example.</p>
${h.mini('pension', { t: 'Two-pot savings component after tax', p: ['bal', 'tax', 'acc'], d: { bal: savingsPot, pen: 0, tax: 26, cur: 'ZAR' } })}

<h2>Tax-free savings accounts and unit trusts</h2>
<p>${h.src('b-sars-tfi', 'SARS')} sets the annual limit for tax-free investments at R46,000 from the 2027 year of assessment, up from R36,000, with a lifetime limit of R500,000; contributions above either limit are taxed at 40% of the excess. None of this changes the zakat: the account is yours. A unit trust or ETF inside it counts at its value on the day, or, for a long-term holder, at the zakatable share of the underlying companies as the ${h.src('iifa-shares', 'Fiqh Academy')} allows. The ${h.a('zakat-on-savings', 'savings page')} covers notice deposits and fixed terms.</p>

<h2>Bullion coins and family gold</h2>
<p>Many South African families keep gold coins as a store of value. Coins and bars kept as savings are zakatable on every view; weigh them and read the carat, since the calculator converts the weight to pure gold. With 34 g of 22 carat coins and ${h.money(21000, 'ZAR')} in the bank, the zakat is ${h.money(krugerrand.zakat, 'ZAR')} at today’s price. Jewellery that is worn counts on the Hanafi view, followed by many Indian-origin families in KwaZulu-Natal and Gauteng; the Shafi‘i view, common in the Cape, exempts it. The ${h.a('zakat-on-gold', 'gold page')} handles each carat.</p>
${h.mini('zakat', { t: 'Coins kept as savings and a bank balance', p: ['cash', 'goldG', 'goldK'], d: { cur: 'ZAR', cash: 21000, goldG: 34, goldK: '22' } })}

<h2>Traders and family businesses</h2>
<p>For a spaza, a clothing store in Fordsburg or a wholesale business, count the stock at selling price, cash in the business, and money customers owe, then deduct what is due now to suppliers and the bank. A shop with ${h.money(265000, 'ZAR')} of stock, ${h.money(87000, 'ZAR')} in cash and ${h.money(96000, 'ZAR')} of bills due owes ${h.money(shop.zakat, 'ZAR')}. The ${h.a('zakat-on-business', 'business page')} goes into receivables and bad debts.</p>

<h2>Debts: bonds, vehicle finance and store accounts</h2>
<p>A home loan, which South Africans call a bond, runs for many years. Most fatwa bodies deduct only the instalments due in the coming months, not the full bond. Vehicle finance, store accounts and credit card balances are treated the same way: what you must pay now is deducted, the rest is not. The Shafi‘i school deducts no debts at all, and the calculator offers both settings.</p>

<h2>Ramadan, the zakat day and fitr</h2>
<p>Ramadan 1448 is expected to begin on ${h.day(h.ramadan1448)} on the Umm al-Qura calendar; South African ulama confirm the start by sighting. Many families pay zakat in Ramadan and use the same day each year, which the ${h.a('when-is-zakat-due', 'zakat date calculator')} works out. No government body sets a zakat al-fitr amount in South Africa; enter the figure announced by your local ulama as your own amount in the zakat al-fitr calculator.</p>
`;
    },
  },
});
