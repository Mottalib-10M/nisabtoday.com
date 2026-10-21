import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');
const isaCase = E.zakat({ cur: 'GBP', cash: 6400, shares: 11800, debts: 900 });

export default defineGuide({
  id: 'zakat-calculator-uk', group: 'country', order: 10, tool: 'zakat', toolArg: { cur: 'GBP' },
  related: ['nisab', 'zakat-on-savings', 'zakat-on-pension', 'zakat-on-shares', 'zakat-al-fitr', 'zakat-on-gold'],
  sources: ['b-gov-isa', 'b-gov-lisa', 'b-gov-pension-age', 'iifa-pension', 'iifa-shares', 'bukhari-1447'],
  en: {
    slug: 'zakat-calculator-uk', nav: 'Zakat in the UK', card: 'Zakat in pounds sterling: ISAs, workplace pensions, Lifetime ISA and the nisab of the day.',
    title: 'Zakat in the UK 2026: ISAs, Pensions and Nisab in Pounds',
    description: 'Zakat in the UK for 2026: the nisab in pounds at today’s gold and silver price, how cash ISAs, stocks and shares ISAs and workplace pensions are counted.',
    h1: 'Zakat in the United Kingdom, in pounds sterling',
    intro: 'Enter your balances in pounds on your zakat day: current and savings accounts, ISAs, gold, and the part of a pension you could draw now.',
    resume: `In pounds, the nisab is ${E.money(E.nisab('silver', 'GBP'), 'GBP')} on the silver measure and ${E.money(E.nisab('gold', 'GBP'), 'GBP')} on the gold measure, at the spot prices of ${E.priceDay}. If what you own on your zakat day reaches the threshold you follow, zakat is ${E.pct(E.P.rate.lunar)} of the whole amount. Britain has no state zakat body and no law on zakat, so every household works it out itself. The British questions are about wrappers: a cash ISA is money in the bank and counts in full; a stocks and shares ISA holds shares and funds, counted at their value on the day; a workplace or personal pension can usually be drawn only from 55, which is why scholars split on whether to count it each year. Someone holding ${E.money(6400, 'GBP')} in current accounts and ${E.money(11800, 'GBP')} in an ISA, with ${E.money(900, 'GBP')} of bills due, owes ${E.money(isaCase.zakat, 'GBP')} today on the silver measure.`,
    faqs: [
      { q: 'Is a cash ISA treated differently from a normal savings account for zakat?', a: 'No. The tax shelter changes what HMRC sees, not what you own. Money in a cash ISA is yours, you can withdraw it, and it counts in full on your zakat day like any bank balance. The yearly ISA allowance limits what you can pay in, not what is zakatable.' },
      { q: 'Do I count my workplace pension before I can draw it?', a: 'Scholars differ. The International Islamic Fiqh Academy says money you cannot control is not counted until you receive it, then for one year. Others count each year what you could take out now, after tax and charges. The calculator has both options under Pension, so you can see the two amounts side by side.' },
      { q: 'Is there an official UK amount for zakat al-fitr in 2026?', a: 'No government body or statutory council in Britain publishes one. The figures circulating each Ramadan come from charities, which this site does not quote. Use the price of about one sa’ of the rice or flour your household eats, and type it into the field My own amount of the zakat al-fitr calculator.' },
      { q: 'Should I deduct my mortgage before paying zakat in Britain?', a: 'Most fatwa bodies deduct only debts due now: the instalments of the coming months and bills you must settle, not the whole outstanding loan. Deducting a full mortgage would erase the zakat of most homeowners. The Debts field of the calculator is meant for the part due this year.' },
    ],
    body: (h) => {
      const sG = h.nisab('silver', 'GBP'), gG = h.nisab('gold', 'GBP');
      const pot = 26000, drawable = 18200;
      const yearly = h.zakat({ cur: 'GBP', cash: 7300, pension: drawable, pensionRule: 'yearly' });
      const receipt = h.zakat({ cur: 'GBP', cash: 7300, pension: drawable, pensionRule: 'receipt' });
      const lisa = h.zakat({ cur: 'GBP', cash: 2100, shares: 9600 });
      return `
<h2>The nisab in pounds, and why it moves every morning</h2>
<p>The nisab, the minimum of wealth on which zakat falls, is fixed in weight: ${h.nisabGrams('silver')} g of silver or ${h.nisabGrams('gold')} g of gold, from the hadith of five awaq in ${h.src('bukhari-1447', 'Sahih al-Bukhari')}. In sterling it follows the market. At the spot prices of ${h.priceDay} the silver figure is ${h.money(sG, 'GBP')} and the gold figure ${h.money(gG, 'GBP')}. Gold is ${h.dec(h.ratio(), 1)} times the silver threshold, so a teacher in Bradford with ${h.money(Math.round((sG + gG) / 2 / 500) * 500, 'GBP')} in the bank is above one line and below the other. Mosques in Britain do not speak with one voice on the choice: some advise silver for cash because it brings more people into paying, others gold. The ${h.a('nisab', 'nisab page')} sets out both lines of reasoning; here the calculator uses silver by default and lets you switch.</p>
${h.mini('nisab', { t: 'Nisab today in pounds', p: ['cur'], d: { cur: 'GBP' } })}

<h2>ISAs: the wrapper does not change the zakat</h2>
<p>An Individual Savings Account is a tax shelter. In the 2026 to 2027 tax year you can put up to £20,000 into ISAs, spread over cash, stocks and shares, innovative finance and Lifetime ISAs (${h.src('b-gov-isa', 'GOV.UK')}). For zakat the allowance is irrelevant: what matters is what sits inside on your zakat day.</p>
<ul>
<li><strong>Cash ISA.</strong> Money on deposit. It counts in full, with any interest you have not yet given away. Many British Muslims hold a profit-based account at an Islamic bank instead; the zakat is the same.</li>
<li><strong>Stocks and shares ISA.</strong> Funds and shares. If you trade them, count the market value. If you hold an index fund for the long term, the ${h.src('iifa-shares', 'International Islamic Fiqh Academy')} allows you to count only the zakatable part of the companies behind it; the ${h.a('zakat-on-shares', 'shares page')} shows how to estimate it.</li>
<li><strong>Lifetime ISA.</strong> You can pay in up to £4,000 a year until you are 50, and the government adds a 25% bonus, up to £1,000 a year (${h.src('b-gov-lisa', 'GOV.UK')}). Taking the money out for anything other than a first home or later life costs you a charge, so what you could really withdraw today is less than the balance on the screen. Count that lower figure.</li>
</ul>
<p>Take a nurse in Leicester: ${h.money(2100, 'GBP')} in her current account and ${h.money(9600, 'GBP')} in a stocks and shares ISA she trades. Together they come to ${h.money(lisa.net, 'GBP')}, above the silver nisab, and her zakat is ${h.money(lisa.zakat, 'GBP')}.</p>
${h.mini('zakat', { t: 'Bank accounts plus a stocks and shares ISA', p: ['cash', 'shares'], d: { cur: 'GBP', cash: 2100, shares: 9600 } })}

<h2>Workplace and personal pensions</h2>
<p>Most employees in Britain now pay into a workplace pension. Money in it is held for you, but you usually cannot take it before 55, depending on the rules of your scheme (${h.src('b-gov-pension-age', 'GOV.UK')}). Classical zakat law asks whether you have full ownership and control of the wealth. The ${h.src('iifa-pension', 'Fiqh Academy’s resolution on savings and end-of-service funds')} draws the line on control: where you choose how the money is invested, add it to your zakatable assets; where you have no right to control it, pay for one year only when you receive it.</p>
<p>A self-invested personal pension sits closer to the first case, a defined benefit scheme closer to the second. Suppose a pot of ${h.money(pot, 'GBP')} that, cashed in today with tax and any charges taken off, would leave ${h.money(drawable, 'GBP')}, alongside ${h.money(7300, 'GBP')} of savings. Counted each year, the zakat is ${h.money(yearly.zakat, 'GBP')}. Counted only on receipt, this year it is ${h.money(receipt.zakat, 'GBP')}, on the savings alone. Both readings are held by scholars; the ${h.a('zakat-on-pension', 'pension page')} has a dedicated calculator.</p>
${h.mini('zakat', { t: 'Savings and a pension you could draw', p: ['cash', 'pension', 'pensionRule'], d: { cur: 'GBP', cash: 7300, pension: drawable, pensionRule: 'yearly' } })}

<h2>Gold in British households</h2>
<p>Gold given at weddings in South Asian families is usually 22 carat. The Hanafi school, followed by many British Pakistanis and Bangladeshis, counts jewellery that is worn; the Shafi‘i school, common among Somali families, exempts it within normal use. Bars and sovereigns bought as savings count under every school. Weigh the pieces, note the carat stamp, and enter them under gold; the ${h.a('zakat-on-gold', 'gold page')} converts each carat to pure metal before comparing with the nisab.</p>

<h2>Debts, mortgages and student loans</h2>
<p>The calculator deducts debts due now if you choose to. In Britain the usual candidates are the next instalments of a mortgage, a credit card balance you will clear, and council tax or rent owed. Long loans whose repayments fall in future years, such as most student loans, are usually left out apart from the instalments due in the coming months; a repayment already taken from your pay is no longer in your account anyway.</p>

<h2>Zakat al-fitr and the zakat date</h2>
<p>No statutory body in the United Kingdom fixes a zakat al-fitr amount, and the figures charities announce are not quoted here. The ${h.a('zakat-al-fitr', 'zakat al-fitr page')} explains the measure, about one sa’ of staple food per person, so you can price it at your local supermarket. Ramadan 1448 is expected to begin on ${h.day(h.ramadan1448)} on the Umm al-Qura calendar; British mosques may differ by a day after moon sighting. Many families take the first of Ramadan as their zakat day, which also fixes the date of the next one.</p>
`;
    },
  },
});
