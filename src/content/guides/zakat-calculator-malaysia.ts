import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');
const kl = E.zakat({ cur: 'MYR', cash: 41500, shares: 12000, basis: 'gold' });

export default defineGuide({
  id: 'zakat-calculator-malaysia', group: 'country', order: 90, tool: 'zakat', toolArg: { cur: 'MYR', basis: 'gold' },
  related: ['zakat-fitrah', 'zakat-on-gold', 'zakat-on-savings', 'zakat-on-pension', 'nisab', 'fidya'],
  sources: ['ppz-nisab', 'ppz-savings', 'ppz-epf', 'ppz-gold', 'ppz-shares', 'ppz-digital', 'b-lhdn-faq', 'b-jawhar-fitrah', 'b-bernama-kelantan'],
  en: {
    slug: 'zakat-calculator-malaysia', nav: 'Zakat in Malaysia', card: 'Zakat in ringgit: the gold nisab used by the state bodies, savings, EPF withdrawals, the jewellery ‘urf and the tax rebate.',
    title: 'Zakat in Malaysia 2026: Gold Nisab, EPF and Tax Rebate',
    description: 'Zakat in Malaysia for 2026: the gold nisab in ringgit, savings and EPF withdrawals, the 800 g jewellery ‘urf in the Federal Territories and the tax rebate.',
    h1: 'Zakat in Malaysia, in ringgit',
    intro: 'Enter your savings and shares in ringgit; the calculator starts on the gold nisab, the measure the Malaysian zakat bodies use for money.',
    resume: `Malaysia runs zakat through state religious councils, and for savings they use the gold measure: the Federal Territories zakat centre, PPZ-MAIWP, sets the nisab of savings at the value of 85 g of gold. Its published nisab for 2026 is RM33,996, from a gold price of RM399.95 a gram. At the spot prices of ${E.priceDay}, the same 85 g are worth ${E.money(E.nisab('gold', 'MYR'), 'MYR')}, while the silver measure would be only ${E.money(E.nisab('silver', 'MYR'), 'MYR')}. Zakat is ${E.pct(E.P.rate.lunar)} of savings held for a full year above the nisab. Three local rules matter: EPF savings are zakatable when withdrawn, not while locked; worn jewellery is exempt up to an ‘urf of ${E.P.nisab.urf.ppz} g in the Federal Territories; and zakat paid to a state body is rebated from income tax. A teacher in Kuala Lumpur with ${E.money(41500, 'MYR')} saved and ${E.money(12000, 'MYR')} in shares owes ${E.money(kl.zakat, 'MYR')}.`,
    faqs: [
      { q: 'Why do Malaysian zakat bodies use the gold nisab for savings?', a: 'PPZ-MAIWP states that the nisab of savings equals the value of 85 g of gold. The other state councils publish their own figure on the same basis, priced with the gold rate they choose, so the ringgit amount differs slightly from state to state. Kelantan’s council announced RM37,401 for 1447.' },
      { q: 'When do I pay zakat on my EPF savings?', a: 'In the Federal Territories, when money is withdrawn from the fund, not while it is locked, because the savings are not fully owned until then. A 2019 fatwa adds that withdrawals for housing, education, health or permanent disability carry no zakat, while other withdrawals pay 2.5% on the whole amount without waiting a year.' },
      { q: 'Can zakat be deducted from my income tax in Malaysia?', a: 'Yes, as a rebate. The Inland Revenue Board says a resident with taxable income can claim a rebate for zakat, fitrah or other payments required by Islam made to a religious authority established under written law. The rebate cannot exceed the income tax charged for that year of assessment.' },
      { q: 'Is the gold jewellery I wear every day zakatable in Malaysia?', a: 'Not up to the customary amount. The Federal Territories set an ‘urf of 800 g of gold for worn jewellery; only the weight worn above it is zakatable. Jewellery that is no longer worn, broken pieces, and jewellery owned by men count from the 85 g nisab.' },
    ],
    body: (h) => {
      const gM = h.nisab('gold', 'MYR'), sM = h.nisab('silver', 'MYR');
      const states = ['malaysia-wp', 'malaysia-selangor', 'malaysia-johor', 'malaysia-penang', 'malaysia-perak', 'malaysia-kelantan', 'malaysia-sarawak'].map((id) => h.fitr(id));
      const rows = states.map((r) => [r.country.en.replace('Malaysia, ', ''), r.body.en, h.money2(r.fitr!, 'MYR'), r.basis?.en ?? '']);
      const epf = 60000, epfZ = epf * h.P.rate.lunar;
      const urfOver = 900 - h.P.nisab.urf.ppz;
      return `
<h2>A gold nisab set by each state</h2>
<p>Religious affairs are a state matter in Malaysia, so each state council runs its own zakat collection. The ${h.src('ppz-savings', 'Federal Territories zakat centre')} states that the nisab of savings equals the value of ${h.nisabGrams('gold')} g of gold, and its ${h.src('ppz-nisab', 'yearly nisab archive')} gives RM33,996 for 2026, from a gold price of RM399.95 a gram, against RM29,740 in 2025. Kelantan’s council announced RM37,401 for assets held between Ramadan 1447 and Ramadan 1448 (${h.src('b-bernama-kelantan', 'via Bernama')}). The difference comes from the gold price each council takes, not from a different weight.</p>
<p>Your own calculation can use the price of the day. At the spot prices of ${h.priceDay}, ${h.nisabGrams('gold')} g of gold is worth ${h.money(gM, 'MYR')}. The silver measure, ${h.money(sM, 'MYR')} today, is not what Malaysian bodies apply to savings, but the calculator keeps it as an option for families who follow it.</p>
${h.mini('nisab', { t: 'Nisab today in ringgit', p: ['cur'], d: { cur: 'MYR' } })}

<h2>Savings, Tabung Haji and fixed deposits</h2>
<p>PPZ-MAIWP levies 2.5% on the last balance at the end of the year of saving, once the nisab and the year are complete. Current and savings accounts in Islamic banks and fixed deposits fall under this rule; for other schemes, such as pilgrimage savings, ask your state body how it treats them. For the Kuala Lumpur teacher above, ${h.money(41500, 'MYR')} in accounts plus ${h.money(12000, 'MYR')} in shares makes ${h.money(kl.net, 'MYR')}, above the gold nisab of the day, and the zakat is ${h.money(kl.zakat, 'MYR')}.</p>
${h.mini('zakat', { t: 'Savings and shares, gold nisab', p: ['cash', 'shares', 'basis'], d: { cur: 'MYR', cash: 41500, shares: 12000, basis: 'gold' } })}

<h2>Shares, unit trusts and digital assets</h2>
<p>Malaysian practice is simpler than the international debate on shares. The ${h.src('ppz-shares', 'PPZ-MAIWP page on shares')}, citing a fatwa of 2015, asks for 2.5% of the current market value whether the shares are traded or held for the long term; for shares that are not Shariah-compliant, the profit is to be given away and the capital is zakatable. Digital assets verified as Shariah-compliant are treated as business wealth at 2.5% under a ${h.src('ppz-digital', 'fatwa gazetted in 2022')}, once they pass the nisab and a full year. That is why the calculator above counts shares at full value by default.</p>

<h2>EPF: zakat on withdrawal</h2>
<p>The ${h.src('ppz-epf', 'PPZ-MAIWP page on EPF')} explains that contributions cannot be withdrawn at will like an ordinary savings account, so they do not meet the condition of full ownership, and zakat becomes due when money is taken out. A fatwa of the Federal Territories committee of 1 November 2019 sets two cases. Withdrawals that meet full ownership and are not for basic needs pay 2.5% on the whole amount withdrawn, subject to the nisab, without waiting a year. Withdrawals for housing, education, health and permanent disability carry no zakat. A member who takes ${h.money(epf, 'MYR')} at retirement, above the nisab, pays ${h.money(epfZ, 'MYR')} on it.</p>

<h2>Gold jewellery and the ‘urf</h2>
<p>Malaysia follows the Shafi‘i school, which exempts jewellery worn within normal use. The ${h.src('ppz-gold', 'Federal Territories')} fix that normal use, the ‘urf, at ${h.P.nisab.urf.ppz} g of gold. A woman who wears 900 g over the year pays on the ${urfOver} g above it, at today’s price ${h.money(urfOver * h.gram('gold', 'MYR') * h.P.rate.lunar, 'MYR')} if the pieces are pure gold. Jewellery kept and not worn, broken pieces, and any jewellery owned by a man count from the 85 g nisab, like gold bought as savings. Other states may set a different ‘urf.</p>

<h2>The income tax rebate</h2>
<p>The ${h.src('b-lhdn-faq', 'Inland Revenue Board')} explains that a resident individual with taxable income can claim a rebate for payments of zakat, fitrah or other dues required by Islam made to a religious authority established under written law, limited to the income tax charged for the year of assessment. Zakat counts on all payments made in a calendar year. Keep the receipt from your state body.</p>

<h2>Zakat fitrah by state, 1447</h2>
<p>Each state sets its own rates, usually in tiers by the rice your household eats. The ${h.src('b-jawhar-fitrah', 'JAWHAR table')} gathers them; the lowest tier of seven states is below. The ${h.a('zakat-fitrah', 'zakat fitrah page')} explains the tiers and the gantang measure, and ${h.a('fidya', 'fidya')} covers missed fasts. Rates for 1448 are to be published before Ramadan, expected to begin on ${h.day(h.ramadan1448)} on the Umm al-Qura calendar.</p>
${h.table(['State', 'Body', 'Lowest rate', 'Basis'], rows, 'Zakat fitrah per person, Ramadan 1447 (2026).', ['l', 'l', 'r', 'l'])}
`;
    },
  },
});
