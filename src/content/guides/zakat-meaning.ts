import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');
const ex = E.zakat({ cur: 'ZAR', cash: 64000, basis: 'silver' });

export default defineGuide({
  id: 'zakat-meaning', group: 'zakat', order: 50, tool: 'zakat',
  toolArg: { cash: 64000, goldG: 0, shares: 0, debts: 0 },
  related: ['zakat-al-maal', 'who-can-receive-zakat', 'zakat-percentage', 'nisab', 'zakat-al-fitr', 'zakat-calculator-south-africa'],
  sources: ['a-quran-9-103', 'a-quran-2-43', 'a-bukhari-8', 'a-bukhari-1395', 'quran-9-60', 'pk-faq', 'zatca-reg', 'ppz-asnaf'],
  en: {
    slug: 'zakat-meaning', nav: 'Meaning of zakat', card: 'What the word zakat means, why it is a pillar of Islam, and the Arabic terms you meet when you pay it.',
    title: 'Zakat Meaning 2026: Purification, Growth and a Pillar',
    description: 'Zakat meaning in 2026: the Arabic root of purity and growth, its place among the five pillars, how it differs from sadaqah, and a glossary of the key terms.',
    h1: 'What zakat means',
    intro: 'If you want to see what the word means in money, enter your savings: the calculator shows whether they reach the nisab and what one fortieth comes to.',
    resume: `Zakat is an Arabic word whose root, z-k-y, carries two ideas: making pure and making grow. In Islamic law it names the yearly share of wealth that a Muslim who owns the nisab gives to the people listed in the Qur’an, the poor and needy first among them. It is the third of the five pillars in the hadith of Ibn ‘Umar, and the Qur’an pairs it with prayer again and again, as in “establish prayer and give zakah”. Unlike sadaqah, which is voluntary and has no set amount, zakat is obligatory, follows fixed rules and is ${E.pct(E.P.rate.lunar)} of wealth held for a lunar year. In South Africa, savings of ${E.money(64000, 'ZAR')} held for a year ${ex.due ? `would owe ${E.money(ex.zakat, 'ZAR')}` : 'would still be below the nisab'} on the silver measure at the prices of ${E.priceDay}. The word also covers zakat al-fitr, a separate small payment due from each person at the end of Ramadan.`,
    faqs: [
      { q: 'Does zakat mean charity?', a: 'Not exactly. Charity in general is sadaqah, which anyone may give at any time in any amount. Zakat is a specific duty with a threshold, a rate and named recipients, closer to a religious levy than to a gift. The Qur’an sometimes uses the word sadaqat for zakat itself, which is why the two are often confused in translation.' },
      { q: 'Why is zakat described as purifying wealth?', a: 'Because the Qur’an says so of the payment taken from believers: a charity “by which you purify them and cause them increase”. The image is that a share of what you hold belongs to others; handing it over cleans the rest. The same root gives tazkiya, the purification of the self, so the meaning reaches the giver as well as the money.' },
      { q: 'Is zakat a tax collected by the state?', a: 'In some countries, partly. Pakistan deducts it at source from certain bank accounts each Ramadan, Saudi Arabia collects it from companies through its zakat authority, and Malaysian states run statutory zakat centres. Elsewhere it is left to each Muslim to calculate and pay. Either way it remains an act of worship that needs the intention of zakat.' },
      { q: 'Who is required to pay zakat?', a: 'An adult Muslim who fully owns zakatable wealth that reaches the nisab and has held it for a lunar year. Someone whose savings stay below the threshold pays no zakat al-maal, though zakat al-fitr is due more widely. The schools differ on a few cases, such as the wealth of children, so families in that position often ask a scholar.' },
    ],
    body: (h) => {
      const c = 'ZAR';
      const s = h.nisab('silver', c), g = h.nisab('gold', c);
      const ex2 = h.zakat({ cur: c, cash: 64000, basis: 'silver' }), exG = h.zakat({ cur: c, cash: 64000, basis: 'gold' });
      return `
<h2>The word and its two meanings</h2>
<p>Arabic builds words from roots of three letters. Zakat comes from z-k-y, a root used for things that are pure and for things that grow. A plant is said to “zakā” when it thrives; a person is “zakī” when they are upright. Both senses meet in one verse addressed to the Prophet: “Take from their wealth a charity by which you purify them and cause them increase” (${h.src('a-quran-9-103', 'Qur’an 9:103')}). Read this way, paying zakat does not shrink what you own in any lasting sense. It removes the share that was never yours and leaves what remains clean and blessed.</p>
<p>The idea of growth also explains a technical rule. Zakat is due on wealth that can increase, such as cash, gold, trade goods and grazing herds, and not on things kept for use, such as a home or a car. The jurists call the first kind “nami”, growing, from a different root but with the same thought behind it.</p>

<h2>A pillar, named with prayer</h2>
<p>Ibn ‘Umar reports that Islam is built on five: the testimony of faith, prayer, zakat, pilgrimage and the fast of Ramadan (${h.src('a-bukhari-8', 'Sahih al-Bukhari 8')}). Zakat is therefore not an optional virtue but part of the structure of the religion. In the Qur’an it is joined to prayer in many verses, the best known being “establish prayer and give zakah and bow with those who bow” (${h.src('a-quran-2-43', 'Qur’an 2:43')}). One looks after a person’s link with God, the other their link with the people around them.</p>
<p>When the Prophet sent Mu‘adh to Yemen, he described it in one line: a charity “taken from the wealthy among them and given to the poor” (${h.src('a-bukhari-1395', 'Sahih al-Bukhari 1395')}). That sentence holds the whole system. The rich are defined by the nisab; the poor and the other recipients are listed in ${h.src('quran-9-60', 'Qur’an 9:60')}, set out on the ${h.a('who-can-receive-zakat', 'page on who can receive zakat')}.</p>

<h2>Zakat, sadaqah and zakat al-fitr</h2>
${h.table(['', 'Zakat al-maal', 'Zakat al-fitr', 'Sadaqah'], [
        ['Obligatory?', 'Yes, above the nisab', 'Yes, for each person', 'No, voluntary'],
        ['Amount', `${h.pct(h.P.rate.lunar)} of wealth held a year`, 'One sa‘ of staple food or its value', 'Any amount'],
        ['When', 'Once a lunar year', 'Before the Eid prayer', 'Any time'],
        ['Recipients', 'The eight groups of 9:60', 'The poor, mainly', 'Anyone in need, any cause'],
      ], 'Three kinds of giving that are often confused.', ['l', 'l', 'l', 'l'])}
<p>The confusion is natural, because the Qur’an itself calls zakat “sadaqat” in the verse of recipients. In fiqh, though, the line is clear: zakat has a threshold, a rate, a date and a closed list of recipients; sadaqah has none of these. Money given as sadaqah during the year does not count as zakat unless it was given with that intention and to an eligible person.</p>

<h2>The vocabulary you meet when you pay</h2>
${h.table(['Term', 'Meaning'], [
        ['Nisab', `The threshold of wealth: ${h.nisabGrams('gold')} g of gold or ${h.nisabGrams('silver')} g of silver, today ${h.money(g, c)} or ${h.money(s, c)}`],
        ['Hawl', 'The lunar year the wealth must be held before zakat is due'],
        ['Rub‘ al-‘ushr', `A quarter of a tenth, the rate of ${h.pct(h.P.rate.lunar)}`],
        ['Mustahiq', 'Someone entitled to receive zakat'],
        ['‘Amil', 'A worker employed to collect and distribute zakat, one of the eight groups'],
        ['‘Urud al-tijara', 'Trade goods, counted at their selling value'],
        ['‘Ushr', 'The tenth, or half tenth, due on harvests'],
        ['‘Urf', 'Local custom, used by some bodies to set how much worn jewellery is exempt'],
      ], 'Terms of zakat in plain English.', ['l', 'l'])}

<h2>How the word lives in law today</h2>
<p>In most of the world zakat is a personal duty: each Muslim works out the amount and decides where to pay it. A few states give it legal form. Pakistan deducts it at source each 1 Ramadan from certain savings accounts, as the ${h.src('pk-faq', 'Punjab Zakat and Ushr Department')} explains. Saudi Arabia’s ${h.src('zatca-reg', 'zakat regulations')} make companies file and pay it like a tax return. Malaysia’s state religious councils run zakat centres, and the ${h.src('ppz-asnaf', 'Federal Territories centre')} lists the same eight recipient groups as the verse. Even where it is collected by law, scholars treat it as worship, which is why the intention to pay zakat matters.</p>
<h2>What the meaning looks like in rand</h2>
<p>Words become concrete on the zakat day. Take a teacher in Durban with ${h.money(64000, c)} in a savings account, no gold and no debts falling due. On the silver measure the threshold today is ${h.money(s, c)}, so her savings ${ex2.due ? `are above it and one fortieth, ${h.money(ex2.zakat, c)}, is due` : 'are below it and nothing is due'}. On the gold measure the threshold is ${h.money(g, c)}, and ${exG.due ? `she would owe the same ${h.money(exG.zakat, c)}` : 'she would owe nothing this year'}. Spread over twelve months, the silver figure is about ${h.money(ex2.zakat / 12, c)} a month, which is how many families set the money aside.</p>
<p>The example shows the two halves of the word at work. The purifying side is the fixed share that leaves her account; the growing side is that the remaining wealth is still hers to invest, and next year the same rule applies to whatever it has become. Nothing in the rule asks her to give up the account itself, the home she lives in or the car she drives to work. That is also why the threshold matters: below it, the duty does not arise, and the person may instead be among those who receive.</p>
${h.mini('zakat', { t: 'What zakat means for your savings in rand', p: ['cash', 'goldG'], d: { cur: c, cash: 64000 } })}
<p>For the practical side, the ${h.a('zakat-al-maal', 'zakat al-maal page')} lists what is counted and the ${h.a('zakat-percentage', 'percentage page')} explains where the one fortieth comes from.</p>
`;
    },
  },
});
