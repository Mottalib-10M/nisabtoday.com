import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');

export default defineGuide({
  id: 'zakat-on-crypto', group: 'assets', order: 60, tool: 'crypto', toolArg: { amt: 31500, cur: 'AED' },
  related: ['zakat-on-shares', 'zakat-on-business', 'zakat-on-savings', 'nisab', 'how-to-calculate-zakat'],
  sources: ['ppz-digital', 'a-egypt-bitcoin', 'ppz-business', 'kuwait-calc', 'iifa-debts'],
  en: {
    slug: 'zakat-on-crypto', nav: 'Zakat on crypto', card: 'Coins and tokens valued on your zakat day, the only official zakat ruling found, and the nisab test.',
    title: 'Zakat on Crypto 2026: Bitcoin, Tokens and Official Rulings',
    description: 'Zakat on crypto in 2026: the Malaysian fatwa treating compliant digital assets as trade goods, Egypt’s 2017 bitcoin ruling, and valuing coins on your zakat day.',
    h1: 'Zakat on cryptocurrency and digital assets',
    intro: 'Enter the market value of the coins and tokens you hold on your zakat day: the calculator compares it with today’s nisab and applies the rate.',
    resume: `The only official zakat ruling on cryptocurrency we could find and read comes from the Federal Territories of Malaysia: a fatwa of October 2021, gazetted on 14 November 2022, holds that any digital asset confirmed as Shariah compliant, which has value and is traded, is subject to business zakat at ${E.pct(E.P.rate.lunar)} once it exceeds the nisab and a full year has passed. The Kuala Lumpur zakat centre writes the formula as units held times the current price, less related costs, times ${E.pct(E.P.rate.lunar)}. Dar al-Ifta of Egypt took the opposite line on the asset itself in December 2017, ruling that trading such currencies is not permitted, and did not issue a zakat ruling. In practice, holders who pay value their coins at the market price on their zakat day and add them to their cash and other wealth. Today the silver nisab is ${E.money(E.nisab('silver', 'AED'), 'AED')} and the gold nisab ${E.money(E.nisab('gold', 'AED'), 'AED')}.`,
    faqs: [
      { q: 'Which price do I use for my bitcoin on my zakat day?', a: 'The market price on that day, in your own currency, for the units you hold. The Kuala Lumpur zakat centre writes the formula as the number of units times the current price, minus related costs. If your exchange shows a value in dollars, convert it at the rate of the same day. A price from another day, or what you paid when you bought, is not the figure.' },
      { q: 'Are coins locked in staking still counted?', a: 'None of the rulings cited on this page addresses staking. The Malaysian fatwa speaks of digital assets that have value and are traded. A token locked for a fixed period raises the same question of control that scholars discuss for locked pensions; many holders count it at its value, and a scholar you trust can settle the case for your own wallet.' },
      { q: 'My crypto lost half its value this year. Is zakat based on what I paid?', a: 'No. Zakat on trade goods and digital assets is reckoned on the value on your zakat day, not on the purchase price. A fall in price lowers the zakat; a rise raises it. If the value on the day, added to your other wealth, is under the nisab, nothing is due on it for that year.' },
      { q: 'Do NFTs and stablecoins follow the same rule?', a: 'The Malaysian fatwa covers any digital asset confirmed as Shariah compliant that has value and is traded, without listing types. A stablecoin pegged to a currency behaves much like cash held abroad and is usually counted at its value. An NFT bought to resell is close to trade goods. Neither is named in a ruling we could read.' },
    ],
    body: (h) => {
      const cur = 'AED';
      const coins = 26000, cash = 9000;
      const s = h.zakat({ cur, cash, crypto: coins, basis: 'silver' });
      const g = h.zakat({ cur, cash, crypto: coins, basis: 'gold' });
      const wallet = 31500, cost = 150;
      const net = wallet - cost;
      const rows = [
        ['Value of the wallet on the zakat day', h.money(wallet, cur)],
        ['Less: cost of selling (exchange fee)', `-${h.money(cost, cur)}`],
        ['Value counted', h.money(net, cur)],
        [`Zakat at ${h.pct(h.P.rate.lunar)}`, h.money(net * h.P.rate.lunar, cur)],
      ];
      return `
<h2>What the official bodies have said</h2>
<p>Few fatwa councils or statutory zakat bodies have published a ruling on cryptocurrency, and fewer still on its zakat. Two are on record, and they point in different directions.</p>
<p>The first is Malaysian. At its meeting of 26 and 27 October 2021, the fatwa committee of the Federal Territories decided that any digital asset confirmed as Shariah compliant, which has value and is traded, is subject to business zakat at ${h.pct(h.P.rate.lunar)}. Digital assets above the nisab and held for a full year owe zakat. The fatwa was gazetted on 14 November 2022, and the ${h.src('ppz-digital', 'Kuala Lumpur zakat centre')} publishes it with a formula: units held times the current price, less related costs, times ${h.pct(h.P.rate.lunar)}. Because the ruling treats coins as trade goods, the nisab is the one the same centre applies to ${h.src('ppz-business', 'business zakat')}: the value of 85 g of gold.</p>
<p>The second is Egyptian. On 28 December 2017, ${h.src('a-egypt-bitcoin', 'Dar al-Ifta of Egypt')} ruled that trading bitcoin and similar currencies, buying, selling or renting through them, is not permitted. That fatwa is about the asset, not about zakat, and it says nothing on what a holder owes on coins already bought.</p>

<h2>Valuing a wallet on your zakat day</h2>
<p>Crypto moves every minute, so the date matters more than for any other asset. Pick one moment on your zakat day, read the price of each coin you hold, multiply by your units and convert into your own currency at that day’s rate. The calculator covers 40 currencies; for a wallet priced in dollars, enter the converted figure. The Malaysian formula allows related costs to be taken off, which most people read as the fee they would pay to sell.</p>
${h.table(['Step', 'Amount'], rows, 'A worked example for one wallet. The wallet value and fee are inputs you replace with your own.', ['l', 'r'])}
<p>The table assumes the holding is above the nisab on its own. Most of the time it will not stand alone: your bank balance, your gold and your shares join it in one total before any threshold is applied.</p>
${h.mini('crypto', { t: 'Crypto held, in dirhams', p: ['amt', 'basis'], d: { amt: wallet, cur } })}

<h2>Silver or gold: what changes in Dubai</h2>
<p>Consider an engineer in Dubai with ${h.money(coins, cur)} in coins and ${h.money(cash, cur)} in her current account on her zakat day, ${h.money(coins + cash, cur)} in all. On the silver measure, ${h.money(s.nisab, cur)} today, her zakat is ${s.due ? h.money(s.zakat, cur) : 'nothing, as the total is below the silver nisab'}. On the gold measure, ${h.money(g.nisab, cur)} today and the one the Kuala Lumpur centre uses for digital assets, it is ${g.due ? h.money(g.zakat, cur) : 'nothing, because the total is below the gold nisab'}. ${h.src('kuwait-calc', 'Kuwait Zakat House')} also sets the nisab of money at 85 g of 24 carat gold. Many scholars prefer silver for wealth that is not metal, because more of it then reaches those in need.</p>
${h.mini('zakat', { t: 'Coins and cash together', p: ['cash', 'shares', 'basis'], d: { cur, cash, shares: coins, basis: 'gold' } })}

<h2>Trader or long-term holder</h2>
<p>The Malaysian fatwa treats compliant digital assets as trade goods whether you trade daily or hold for years, so the whole market value counts. For shares, by contrast, some bodies distinguish a holder who buys to resell from one who holds for income; the ${h.a('zakat-on-shares', 'shares page')} sets out that split. A token that represents a share in a project’s profits rather than a means of payment may sit closer to that second case. No official ruling we read makes the distinction for crypto.</p>
<p>Mining and validating rewards join your holdings when you receive them, and most holders simply count whatever the wallet holds on their next zakat day. A coin you spent or sold before the day is gone from the count, and the proceeds are part of your cash instead.</p>

<h2>Losses, fees and lost keys</h2>
<p>Zakat is reckoned on what you own on the day, so a drop in price lowers it and a loss you have realised removes the coins altogether. Coins in a wallet whose keys are lost are not within your reach. They resemble a debt owed by someone who cannot repay, on which the ${h.src('iifa-debts', 'Fiqh Academy, resolution 1')} places zakat only after the money is received. Debts due now, such as a margin loan, are deducted on the majority view before the total is compared with the nisab; the ${h.a('zakat-on-debts', 'page on debts')} shows the two amounts.</p>
`;
    },
  },
});
