import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');
const pk = E.fitr('pakistan');
const sa = E.P.fitr.saKg;
/** Sadqa-i-fitr per person on each commodity, Council of Islamic Ideology, 1447 (b-cii-1447). Wheat comes from the kit. */
const CII = { barley: 1100, dates: 1600, raisins: 3800, munaqqa: 5400, atta: 200 };

export default defineGuide({
  id: 'fitrana', group: 'fitr', order: 20, tool: 'fitr', toolArg: { body: 'pakistan', n: 7 },
  related: ['zakat-al-fitr', 'zakat-calculator-pakistan', 'fidya', 'kaffarah', 'zakat-calculator-india', 'zakat-calculator-uk'],
  sources: ['b-cii-1447', 'egypt-fitr-hanafi', 'egypt-fitr-cash', 'bukhari-1503', 'jordan-fitr-cash'],
  en: {
    slug: 'fitrana', nav: 'Fitrana', card: 'Fitrana per person in 2026: Rs 300 on wheat and the higher rates on barley, dates and raisins, with the Hanafi half sa’.',
    title: 'Fitrana 2026: Amount per Person on Wheat, Dates and Barley',
    description: `Fitrana 2026 in Pakistan: ${E.money(pk.fitr!, 'PKR')} per person on wheat, and the Council of Islamic Ideology’s higher rates on barley, dates and raisins, with the Hanafi half sa’.`,
    h1: 'Fitrana: sadqa-i-fitr per person',
    intro: 'Enter the number of people in your household; the calculator starts on the Council of Islamic Ideology’s rate on wheat, and you can type a higher rate.',
    resume: `Fitrana, or sadqa-i-fitr, is the South Asian name for zakat al-fitr, paid for every member of the household before the Eid prayer. For Ramadan 1447, Pakistan’s Council of Islamic Ideology fixed the minimum at ${E.money(pk.fitr!, 'PKR')} per person, priced on wheat, with higher rates for those who pay on other foods: ${E.money(CII.barley, 'PKR')} on barley, ${E.money(CII.dates, 'PKR')} on dates, ${E.money(CII.raisins, 'PKR')} on raisins and ${E.money(CII.munaqqa, 'PKR')} on munaqqa. The gap comes from the Hanafi measure: half a sa’ of wheat, but a full sa’ of barley, dates or raisins, and from the price of each food. A household of seven in Karachi pays ${E.money(7 * pk.fitr!, 'PKR')} at the wheat rate or ${E.money(7 * CII.dates, 'PKR')} at the dates rate. The Council advised people outside Punjab to work out the amount from the prices of their own province. Rates for 1448 are to be published before Ramadan.`,
    faqs: [
      { q: 'Which fitrana rate should I pay: wheat, dates or raisins?', a: 'Any of them fulfils the duty on the Hanafi view, so the wheat rate is the minimum. Scholars encourage those who can afford it to pay on a dearer food, such as dates or raisins, since more then reaches the poor. Many families pay the wheat rate for each child and a higher rate for adults.' },
      { q: 'Why is fitrana on wheat only half a sa’?', a: 'The Hanafi school relies on reports that the Companions gave half a sa’ of wheat as equal in value to a full sa’ of dates or barley, at a time when wheat was dearer. Dar al-Ifta of Egypt sets that half sa’ at 1.625 kg, and the Council of Islamic Ideology at about 2 kg as a precaution.' },
      { q: 'I live in Britain: which fitrana amount applies to me?', a: 'The amount of the country where you are at the end of Ramadan, priced on the food eaten there. Pakistan’s rupee figures do not convert to a fair amount abroad. No statutory body in the United Kingdom publishes one, so price half a sa’ of flour or a sa’ of dates locally and enter it as your own amount.' },
    ],
    body: (h) => {
      const rows = [
        ['Wheat (half a sa’, about 2 kg)', h.money(pk.fitr!, 'PKR'), h.money(5 * pk.fitr!, 'PKR'), h.money(9 * pk.fitr!, 'PKR')],
        ['Barley (one sa’, about 4 kg)', h.money(CII.barley, 'PKR'), h.money(5 * CII.barley, 'PKR'), h.money(9 * CII.barley, 'PKR')],
        ['Dates (one sa’)', h.money(CII.dates, 'PKR'), h.money(5 * CII.dates, 'PKR'), h.money(9 * CII.dates, 'PKR')],
        ['Raisins (one sa’)', h.money(CII.raisins, 'PKR'), h.money(5 * CII.raisins, 'PKR'), h.money(9 * CII.raisins, 'PKR')],
        ['Munaqqa (one sa’)', h.money(CII.munaqqa, 'PKR'), h.money(5 * CII.munaqqa, 'PKR'), h.money(9 * CII.munaqqa, 'PKR')],
      ];
      const mixed = 3 * CII.dates + 4 * pk.fitr!;
      return `
<h2>The Council’s rates for 1447</h2>
<p>Each year, before Eid, the chairman of the Council of Islamic Ideology announces the amounts of sadqa-i-fitr and fidya. For 1447 the announcement was made on ${h.day(pk.date)} (${h.src('b-cii-1447', 'CII, via the Associated Press of Pakistan')}). The minimum is ${h.money(pk.fitr!, 'PKR')} a person on wheat. Those who base it on government-subsidised flour may pay ${h.money(CII.atta, 'PKR')}. The other rates follow the price of a full sa’ of each food.</p>
${h.table(['Paid on', 'Per person', 'Family of 5', 'Family of 9'], rows, 'Sadqa-i-fitr, Council of Islamic Ideology, Ramadan 1447 (2026). Prices of Punjab.', ['l', 'r', 'r', 'r'])}
<p>The figures are built on prices in Punjab. The Council asked people in Sindh, Khyber Pakhtunkhwa, Balochistan, Gilgit-Baltistan and Azad Kashmir to compute fitrana from the prices of their own province, so a family in Quetta or Gilgit may arrive at a slightly different figure for the same food.</p>
${h.mini('fitr', { t: 'Fitrana for your household at the CII wheat rate', p: ['n', 'body'], d: { n: 7, body: 'pakistan' } })}

<h2>Half a sa’ or a whole one</h2>
<p>The hadith of Ibn ‘Umar names a sa’ of dates or a sa’ of barley (${h.src('bukhari-1503', 'Sahih al-Bukhari 1503')}). The Hanafi school, followed by most Muslims in Pakistan, India and Bangladesh, accepts half a sa’ of wheat or its flour, and a full sa’ of dates, barley or raisins. ${h.src('egypt-fitr-hanafi', 'Dar al-Ifta of Egypt')} gives the Hanafi half sa’ as ${sa.hanafiHalfSaKg} kg and the full sa’ as ${sa.hanafiSaKg} kg. The Council of Islamic Ideology rounds up, about 2 kg of wheat and about 4 kg of the other foods, as a precaution. That is why the wheat rate is so much lower: the quantity is half, and wheat is the cheapest staple.</p>
<p>Families who follow another school, for instance Shafi‘i families from the Konkan or Ahl-e-Hadith congregations who take the full sa’ for every food, end up with a higher wheat figure, roughly double, and many of them give food rather than cash.</p>

<h2>Cash or grain</h2>
<p>Paying fitrana in rupees is the Hanafi position: the value of the food may be given in money because it serves the poor better, as the ${h.src('jordan-fitr-cash', 'Jordanian Iftaa Department')} summarises it. ${h.src('egypt-fitr-cash', 'Dar al-Ifta of Egypt')} also accepts cash. The Maliki, Shafi‘i and Hanbali schools require the food itself. For a household in Lahore that pays the dates rate for three adults and the wheat rate for four children, the total is ${h.money(mixed, 'PKR')}.</p>

<h2>Fitrana in India, Bangladesh and the diaspora</h2>
<p>Outside Pakistan, no statutory body publishes a fitrana amount for a whole country. In India, regional muftis and madrasas announce figures that follow the local price of wheat; in Britain, Canada and the Gulf, South Asian families often hear a Pakistani or Indian figure repeated, which bears no relation to local prices. The principle is the same everywhere: price half a sa’ of flour, about 2 kg on the cautious reading, or a sa’ of dates where you live, multiply by the people you pay for, and give it before Eid. A family of six in Birmingham that finds 2 kg of chapati flour at £3 gives ${h.money(6 * 3, 'GBP')} at the minimum, more on dates.</p>
${h.mini('fitr', { t: 'Fitrana with a local price per person', p: ['n', 'body', 'per'], d: { n: 6, body: 'own', per: 3 } })}

<h2>Who pays and for whom</h2>
<p>The head of the household pays for himself, his wife, his minor children and any dependants he supports. A child born before dawn on Eid day is included on the Hanafi view. Domestic workers who are not dependants owe their own fitrana; an employer may pay it for them with their consent. A grown son with his own income pays for his own family. Fitrana is due on anyone who owns, beyond basic needs, wealth equal to the nisab on the Hanafi view, a threshold that does not require a full year.</p>

<h2>Timing and the 1448 rates</h2>
<p>The Hanafi school allows fitrana to be paid early, even at the start of Ramadan, so that it reaches the poor before Eid. It must not be left until after the Eid prayer. On the Umm al-Qura calendar Ramadan 1448 is expected to begin on ${h.day(h.ramadan1448)} and Eid to fall on ${h.day(h.shawwal1448)}; in Pakistan both follow the moon sighting committee. The 1448 rates are to be published before Ramadan. The ${h.a('fidya', 'fidya page')} covers the amount for fasts that cannot be made up, which the Council sets on the same foods.</p>
`;
    },
  },
});
