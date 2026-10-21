import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');

const S = E.nisabGrams('silver');
const sterlingNeed = (S * 1000) / 925;

export default defineGuide({
  id: 'zakat-on-silver', group: 'assets', order: 20, tool: 'silver', toolArg: { g: 750, f: '925' },
  related: ['nisab', 'zakat-on-gold', 'zakat-on-savings', 'how-to-calculate-zakat', 'zakat-percentage'],
  sources: ['ppz-silver', 'bukhari-1447', 'a-bukhari-1454', 'kuwait-calc', 'pk-calc', 'egypt-jewel'],
  en: {
    slug: 'zakat-on-silver', nav: 'Zakat on silver', card: 'Silver coins, bars, cutlery and jewellery: the fine weight, the 595 g threshold and the amount due.',
    title: 'Zakat on Silver 2026: 595 g Nisab, Sterling and Fine Silver',
    description: 'Zakat on silver in 2026: the 595 g threshold of two hundred dirhams, how sterling, 900 and 800 silver convert to fine weight, and silver jewellery and cutlery.',
    h1: 'Zakat on silver: fine weight, threshold and amount',
    intro: 'Type the weight of your silver and its fineness (999, 925, 900 or 800): the calculator converts it to fine silver and values it at today’s spot price.',
    resume: `Zakat on silver is one fortieth, ${E.pct(E.P.rate.lunar)}, of the value of the silver you have held for a lunar year, once it reaches ${S} g of fine silver, the two hundred dirhams of the hadith. At the spot price of ${E.priceDay}, that threshold is worth ${E.money(E.nisab('silver', 'MYR'), 'MYR')} or ${E.money(E.nisab('silver', 'USD'), 'USD')}. Most silver people own is not pure: sterling is 925 parts in a thousand, older coins and cutlery are often 900 or 800. Only the fine content is weighed against the threshold, so a sterling hoard needs about ${E.dec(sterlingNeed, 0)} g before it reaches ${S} g on its own. The value counted is the whole piece at the price of its silver. Silver also matters beyond itself: it is the lower of the two thresholds, and many scholars apply it to cash, so a household with modest savings and a drawer of silver often owes zakat on both together.`,
    faqs: [
      { q: 'Is sterling silver cutlery subject to zakat?', a: 'The Punjab Zakat and Ushr Department lists household silver utensils, artefacts and jewellery as zakatable in its calculator and notes that utensils are usually about 90 % pure. Cutlery kept in a cabinet is stored silver rather than jewellery, so the debate on worn ornaments does not reach it. Weigh it, enter the fineness stamped on it, and add it to your other wealth.' },
      { q: 'Do I use the weight of the piece or the weight of pure silver?', a: 'For the threshold, the fine silver inside the piece: 1,000 g of sterling holds 925 g of fine silver. For the value, use what the piece is worth today, which the calculator takes as its fine content times the spot price. A buyer may pay less than spot, and some people prefer to value at the price a dealer would actually give them.' },
      { q: 'My silver alone is under 595 g. Is it still counted?', a: 'Yes, when you also hold cash, gold or other zakatable wealth. The amounts are added together and the total is compared with the nisab, which is how the calculators of Kuwait Zakat House and the Punjab Zakat and Ushr Department work. Silver below the threshold on its own only escapes zakat when it is all you have and the rest of your wealth is nothing.' },
      { q: 'Are silver coins bought as an investment treated differently from jewellery?', a: 'Coins and bars bought to keep or resell are savings, and zakat is due on them every lunar year under every school. The disagreement concerns jewellery worn in normal use. A coin set in a pendant that is worn sits in between; many people count it to be safe, and a scholar you trust can settle a doubtful case.' },
    ],
    body: (h) => {
      const cur = 'MYR';
      const n = h.nisab('silver', cur);
      const fines = [999, 925, 900, 800];
      const rows = fines.map((f) => [`${f}`, h.grams((S * 1000) / f), h.money2(Math.round(h.gram('silver', cur) * f / 1000 * 100) / 100, cur), h.money(n, cur)]);
      const tray = h.tool('silver', { g: 1200, f: '900', cur });
      const withSilver = h.zakat({ cur, cash: 3000, silverG: 500, silverF: 925, basis: 'silver' });
      const withoutSilver = h.zakat({ cur, cash: 3000, basis: 'silver' });
      return `
<h2>Two hundred dirhams in grams</h2>
<p>The threshold for silver is the oldest figure in the law of zakat. Al-Bukhari reports that no zakat is due on less than five awaq of silver (${h.src('bukhari-1447', 'Sahih al-Bukhari 1447')}); five awaq are two hundred dirhams. The letter Abu Bakr gave to his collector for Bahrain fixes the rate in the same breath: on silver, one fortieth, and nothing when it falls short of two hundred dirhams (${h.src('a-bukhari-1454', 'Sahih al-Bukhari 1454')}). One fortieth is ${h.pct(h.P.rate.lunar)}.</p>
<p>The dirham is no longer minted, so its weight has to be rebuilt. The ${h.src('ppz-silver', 'Federal Territories zakat centre in Malaysia')} quotes Yusuf al-Qaradawi: the jurists agree that two hundred dirhams equal ${S} g. That is the weight this site uses. Pakistan’s statute writes ${h.dec(h.nisabGrams('silver', 'pk'))} g instead, a figure you can select in the options of the main calculator on the nisab page. At today’s prices, ${S} g of fine silver are worth ${h.money(n, cur)}, or ${h.money(h.nisab('silver', 'GBP'), 'GBP')} and ${h.money(h.nisab('silver', 'INR'), 'INR')} for readers elsewhere.</p>

<h2>Fine silver, sterling and the stamp on your piece</h2>
<p>Bullion is sold at 999 fine, almost pure. Jewellery and tableware are alloyed to make them harder: sterling is 925 parts of silver in a thousand, some older coins and trays are 900, and a good deal of Middle Eastern and Indian work is 800. ${h.src('kuwait-calc', 'Kuwait Zakat House')} offers three rows for silver in its calculator, pure silver at 99.9, coin silver at 90 and jewellery silver at 80, and the ${h.src('pk-calc', 'Punjab Zakat and Ushr Department')} tells users that utensils are usually 90 % pure and to take 90 % of their weight.</p>
<p>The threshold is a weight of fine silver, so a lower fineness means more grams of metal before you reach it. The table shows how many grams of each grade make ${S} g of fine silver, and the price of one gram of each grade in ringgit at the spot price of ${h.priceDay}.</p>
${h.table(['Fineness', 'Grams to reach the nisab', 'Price of 1 g', 'Nisab value'], rows, `Silver grades at the spot price of ${h.priceDay}.`, ['l', 'r', 'r', 'r'])}
<p>If a piece carries no stamp, a jeweller can test it. Weigh it on a kitchen scale without stones or wooden handles, since only the metal counts.</p>
${h.mini('silver', { t: 'Sterling silver in ringgit', p: ['g', 'f'], d: { g: 700, f: '925', cur } })}

<h2>A worked example: a family tray</h2>
<p>Take a serving set handed down in a family in Penang: trays, a teapot and cups weighing 1,200 g in all, stamped 900. The fine content is ${h.grams(1200 * 900 / 1000)}, comfortably above ${S} g, so the silver reaches the threshold by itself. Its value today is ${tray.rows[0][1]}, and the zakat on it for one lunar year is ${tray.value}. Most people pay it in money rather than by sawing a corner off the tray.</p>
<p>The calculation does not care how old or beautiful the pieces are. Craftsmanship can make a piece sell for more than its metal, and some people value at that higher price; others take the metal value, which is what the calculator gives. Either way, the rate stays one fortieth.</p>

<h2>Silver jewellery you wear</h2>
<p>The question that divides scholars on gold divides them on silver too, because the texts treat the two metals together. ${h.src('egypt-jewel', 'Dar al-Ifta of Egypt')} reports the words of Abu Hanifa through al-Shaybani: no jewellery of gold or silver that reaches the zakat threshold escapes zakat. The same fatwa sets out the majority position of the Maliki school, the preferred Shafi‘i view and the main Hanbali view: jewellery kept for permitted personal use owes nothing, while metal held as savings or investment does.</p>
<p>Here is the effect on a household in Kuala Lumpur with ${h.money(3000, cur)} in the bank and 500 g of sterling bangles worn every week. If the bangles count, as the Hanafi school holds, the zakatable total is ${h.money(withSilver.net, cur)} and the zakat ${withSilver.due ? h.money(withSilver.zakat, cur) : 'nothing, because the total is still under the nisab'}. If they are exempt, as the majority holds, only the cash is weighed and the zakat is ${withoutSilver.due ? h.money(withoutSilver.zakat, cur) : 'nothing, since the cash alone is below the silver nisab'}.</p>
${h.mini('zakat', { t: 'Cash and silver together', p: ['cash', 'basis'], d: { cur, cash: 3000, silverG: 500, basis: 'silver' } })}
<p>Silverware, ornaments on a shelf and coins in a box are not jewellery in use, so the exemption the majority grants does not cover them. Pakistan’s provincial calculator includes household silver, utensils and artefacts without distinction.</p>

<h2>Why silver sets the bar for everything else</h2>
<p>The gold threshold is now ${h.dec(h.ratio(), 1)} times the silver one, because gold has risen far faster than silver since the seventh century. For gold, the choice of threshold is settled: gold uses its own. For cash, shares and business stock, which are neither metal, the body or scholar you follow decides whether silver or gold is the yardstick. Many scholars prefer silver for that wealth, so the price of silver quietly decides whether a family with a few thousand ringgit in savings pays zakat at all. The Kuala Lumpur zakat centre uses gold for savings; the ${h.a('zakat-on-savings', 'page on savings')} shows both results side by side.</p>
<p>Mixing metals follows the same logic. If you own some gold, some silver and some cash, add their values and compare the total with the threshold you use. The ${h.a('how-to-calculate-zakat', 'step by step method')} walks through that addition, and the ${h.a('zakat-on-gold', 'gold page')} explains the carat conversion that mirrors the fineness one above.</p>
`;
    },
  },
});
