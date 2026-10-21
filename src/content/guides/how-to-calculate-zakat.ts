import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');
const base = { cur: 'AUD', cash: 21300, goldG: 10, goldK: 24, jewelG: 48, jewelK: 22, shares: 9800, debts: 3100 } as const;
const inc = E.zakat({ ...base, jewelRule: 'include', basis: 'silver' });
const exc = E.zakat({ ...base, jewelRule: 'exclude', basis: 'silver' });

export default defineGuide({
  id: 'how-to-calculate-zakat', group: 'zakat', order: 30, tool: 'zakat',
  toolArg: { cash: 21300, goldG: 10, goldK: '24', jewelG: 48, shares: 9800, debts: 3100 },
  related: ['zakat-al-maal', 'nisab', 'zakat-percentage', 'zakat-on-gold', 'zakat-on-debts', 'when-is-zakat-due'],
  sources: ['bukhari-1447', 'a-bukhari-1454', 'egypt-jewel', 'islamweb-debts', 'zatca-reg', 'egypt-nisab', 'gold-api'],
  en: {
    slug: 'how-to-calculate-zakat', nav: 'How to calculate zakat', card: 'Five steps from your bank balances to the amount due, with a worked example and the two results where schools differ.',
    title: 'Zakat Calculation 2026: Five Steps and a Worked Example',
    description: 'Calculate zakat in 2026 in five steps: pick your zakat day, value each asset, take off debts due, test against the nisab, then take 2.5 %. Example in AUD.',
    h1: 'How to calculate zakat, step by step',
    intro: 'Fill in the lines that apply to you, as they stand on your zakat day; the result updates with the nisab and the metal prices of the day.',
    resume: `To calculate zakat, fix one zakat day each lunar year, list everything zakatable you own on that day, value it at that day’s price, subtract the debts that fall due now, and compare the result with the nisab. If the net total reaches it, pay ${E.pct(E.P.rate.lunar)}, one fortieth, of the whole total, not only of the part above the threshold. The nisab at the prices of ${E.priceDay} is ${E.money(E.nisab('silver', 'AUD'), 'AUD')} on the silver measure and ${E.money(E.nisab('gold', 'AUD'), 'AUD')} on the gold measure. Gold is valued by its carat, shares by their market value, and money owed to you counts if the borrower will repay. A Sydney family with ${E.money(21300, 'AUD')} in the bank, 10 g of gold bars, 48 g of worn jewellery, ${E.money(9800, 'AUD')} of shares and ${E.money(3100, 'AUD')} of bills due owes ${E.money(inc.zakat, 'AUD')} if the jewellery is counted, the Hanafi view, and ${E.money(exc.zakat, 'AUD')} if it is not, the view of the other three schools.`,
    faqs: [
      { q: 'Should I value my gold at the price a jeweller would pay me?', a: 'Practice varies. Most calculators, this one included, use the spot price of the metal adjusted for its carat, which is close to the market value. A jeweller buying second-hand pieces pays less, so using his price gives a lower figure. If your local zakat body publishes a gram price for the day, it is reasonable to follow it.' },
      { q: 'Do I pay 2.5 % on everything or only on what is above the nisab?', a: 'On everything. The nisab is a gate, not an allowance: once your net zakatable wealth reaches it, one fortieth of the entire amount is due. Someone just above the threshold therefore pays a little under one fortieth of the nisab itself, and someone just below it pays nothing at all on that wealth.' },
      { q: 'Which exchange rate should I use for savings held in another currency?', a: 'Convert every balance into one currency at the rate of your zakat day, then add them. The calculator works in a single currency for that reason. Use the rate you would actually get, or a published reference rate; the price date is written under each result so you can repeat the sum with the same figures next year.' },
      { q: 'What if my wealth went up and down during the year?', a: 'You do not average it. The Hanafi school looks at the first and last day of the lunar year; the other schools want the wealth to stay above the nisab throughout. Either way the amount you pay on is what you hold on your zakat day, including money that arrived only a few weeks before it.' },
    ],
    body: (h) => {
      const c = 'AUD';
      const zi = h.zakat({ ...base, jewelRule: 'include', basis: 'silver' });
      const ze = h.zakat({ ...base, jewelRule: 'exclude', basis: 'silver' });
      const gi = h.zakat({ ...base, jewelRule: 'include', basis: 'gold' });
      const ge = h.zakat({ ...base, jewelRule: 'exclude', basis: 'gold' });
      const v = (k: string) => zi.lines.find((l) => l.k === k)?.value ?? 0;
      const zs = h.zakat({ ...base, jewelRule: 'include', basis: 'silver', year: 'solar' });
      return `
<h2>Step 1: choose your zakat day</h2>
<p>Zakat is counted on one day, not over the whole year. That day is the anniversary, in the Islamic lunar calendar, of the date your wealth first reached the nisab. Few people know that date, so many families pick a fixed day such as 1 Ramadan or 27 Ramadan and keep it every year. What matters is that the gap between two zakat days is a lunar year; the ${h.a('when-is-zakat-due', 'zakat date calculator')} turns any start date into the matching end date.</p>

<h2>Step 2: list and value what you own on that day</h2>
<p>Write down each kind of zakatable wealth with its value on the zakat day. Bank balances are read from the statement. Cash at home is counted. Gold and silver are valued by weight and purity: a 22 carat ring is 22 parts of gold in 24, so its gold content is less than its weight. Shares bought to trade are taken at market value; long-term holdings have their own method, set out on the ${h.a('zakat-on-shares', 'shares page')}. Business stock is valued at what it would sell for now. Money lent to someone who will repay belongs on the list too.</p>
<p>For the Sydney family of the summary, step 2 gives these lines at the prices of ${h.priceDay}:</p>
${h.table(['Asset', 'Detail', 'Value'], [
        ['Bank accounts', 'Two current accounts and an offset account', h.money(v('cash'), c)],
        ['Gold bars', '10 g of 24 carat', h.money(v('gold'), c)],
        ['Jewellery worn', '48 g of 22 carat', h.money(v('jewel'), c)],
        ['Shares', 'Bought to trade, market value', h.money(v('shares'), c)],
      ], 'Step 2 for a household in Sydney.', ['l', 'l', 'r'])}

<h2>Step 3: take off the debts that fall due</h2>
<p>Most schools reduce the zakatable total by debts you must pay now: the Hanafi, Maliki and Hanbali schools and the older view of al-Shafi‘i; his newer view does not (${h.src('islamweb-debts', 'Islamweb fatwa 47139')}). The amount to subtract is what is due, such as this month’s card balance, overdue bills and the coming instalments, not the full balance of a home loan running for decades. Our family has ${h.money(3100, c)} of such bills, which leaves ${h.money(zi.net, c)} with the jewellery counted.</p>

<h2>Step 4: compare with the nisab</h2>
<p>The nisab comes from the hadith of the five awaq (${h.src('bukhari-1447', 'Sahih al-Bukhari 1447')}). Today it is ${h.money(h.nisab('silver', c), c)} measured in silver or ${h.money(h.nisab('gold', c), c)} measured in gold. The two measures differ by a factor of ${h.dec(h.ratio(), 1)} at current prices, so the choice matters for modest savings. Below the nisab you choose, nothing is due on this wealth this year; at or above it, go on to step 5.</p>

<h2>Step 5: take one fortieth</h2>
<p>The rate is ${h.pct(h.P.rate.lunar)}, written in the letter of Abu Bakr as one fortieth on silver (${h.src('a-bukhari-1454', 'Sahih al-Bukhari 1454')}). Divide the net total by 40. If you count on a solar year of 365 days, the Saudi regulations raise the rate in proportion to the extra days, to ${h.pct(h.P.rate.solar, 3)} (${h.src('zatca-reg', 'ZATCA, article 15')}); for our family that is ${h.money(zs.zakat, c)} instead of ${h.money(zi.zakat, c)}.</p>

<h2>The four results for the same family</h2>
<p>Two choices change the figure: whether worn jewellery is counted and which metal sets the nisab. The Hanafi school counts the jewellery; the Maliki, Shafi‘i and Hanbali schools exempt jewellery in normal personal use (${h.src('egypt-jewel', 'Dar al-Ifta of Egypt, fatwa 22484')}). The table runs all four combinations.</p>
${h.table(['', 'Silver nisab', 'Gold nisab'], [
        ['Jewellery counted (Hanafi)', h.money(zi.zakat, c), h.money(gi.zakat, c)],
        ['Jewellery exempt (other schools)', h.money(ze.zakat, c), h.money(ge.zakat, c)],
      ], `Zakat due for the Sydney example at the prices of ${h.priceDay}.`, ['l', 'r', 'r'])}
<p>Where a row shows the same figure in both columns, the family is above both thresholds; where one column is zero, the measure alone decides whether anything is due.</p>
${h.mini('zakat', { t: 'Run the five steps with your own figures', p: ['cash', 'goldG', 'jewelG', 'shares', 'debts'], d: { cur: c, cash: 21300, goldG: 10, goldK: '24', jewelG: 48, shares: 9800, debts: 3100 } })}

<h2>Five mistakes that change the amount</h2>
<ul>
<li><strong>Paying only on the surplus.</strong> The whole net total is zakatable once it reaches the nisab.</li>
<li><strong>Counting the gross weight of jewellery as pure gold.</strong> A 21 carat bracelet holds 21/24 of its weight in gold. Dar al-Ifta of Egypt explains how the carat affects the nisab in its ${h.src('egypt-nisab', 'fatwa 21692')}.</li>
<li><strong>Subtracting the whole mortgage.</strong> Only what falls due is deducted, on the view of the schools that deduct at all.</li>
<li><strong>Forgetting money owed to you.</strong> A loan to a friend who will repay is still part of your wealth.</li>
<li><strong>Counting the family car or home.</strong> Things kept for use are outside zakat whatever they cost.</li>
</ul>
<p>Write the figures down each year with the date and the price used. The next year you only update the lines, and if a question comes up about one asset, a scholar you trust can see exactly how you reached the amount.</p>
`;
    },
  },
});
