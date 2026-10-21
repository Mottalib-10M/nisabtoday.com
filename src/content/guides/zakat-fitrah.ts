import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');
const sel = E.fitr('malaysia-selangor'), sg = E.fitr('singapore'), id = E.fitr('indonesia'), swk = E.fitr('malaysia-sarawak');
/** JAWHAR table of 2026 state rates (b-jawhar-fitrah), RM per person, lowest to highest tier. */
const STATES: Array<[string, number[]]> = [
  ['Johor', [8, 10, 20]], ['Kedah', [9, 15, 23]], ['Kelantan', [10, 22]], ['Melaka', [8, 15, 22]], ['Negeri Sembilan', [7.5, 12, 20]],
  ['Pahang', [8, 14, 21]], ['Pulau Pinang', [10, 15, 25]], ['Perak', [10, 16, 25]], ['Perlis', [9]], ['Selangor', [8, 16, 25]],
  ['Terengganu', [10, 20]], ['Sabah', [7.5, 15]], ['Sarawak', [7.5]], ['Wilayah Persekutuan', [8, 15, 25]],
];

export default defineGuide({
  id: 'zakat-fitrah', group: 'fitr', order: 30, tool: 'fitr', toolArg: { body: 'malaysia-selangor', n: 4 },
  related: ['zakat-al-fitr', 'zakat-calculator-malaysia', 'fidya', 'fitrana', 'kaffarah'],
  sources: ['b-jawhar-fitrah', 'b-lhdn-faq', 'b-muis-1447', 'b-baznas-fitrah', 'b-bernama-kelantan', 'ppz-fidyah', 'bukhari-1503'],
  en: {
    slug: 'zakat-fitrah', nav: 'Zakat fitrah', card: 'Zakat fitrah 2026 in Malaysia state by state, Singapore and Indonesia: the rice tiers and the gantang.',
    title: 'Zakat Fitrah 2026: Malaysia by State, Singapore, Indonesia',
    description: 'Zakat fitrah 2026 in each Malaysian state, Singapore and Indonesia: the rates by type of rice, the 2.6 kg gantang and how to pick your tier before Aidilfitri.',
    h1: 'Zakat fitrah in Malaysia, Singapore and Indonesia',
    intro: 'Enter the people in your household and pick your state or country; the rate shown is the lowest tier, and you can type a higher one.',
    resume: `Zakat fitrah is the zakat al-fitr of South East Asia, paid for every member of the household before the Aidilfitri prayer. Here the bodies price it on rice and set tiers by the rice a family actually eats. For 1447, Selangor’s rates were ${E.money2(sel.fitr!, 'MYR')}, RM16 and RM25 a person on one Baghdad gantang of 2.6 kg; Sarawak set a single gazetted rate of ${E.money2(swk.fitr!, 'MYR')} for the whole state. Singapore’s MUIS kept its normal rate at ${E.money2(sg.fitr!, 'SGD')} with a higher rate of S$8, both from the median price of rice. Indonesia’s BAZNAS fixed ${E.money(id.fitr!, 'IDR')}, the value of 2.5 kg or 3.5 litres of rice. A family of four in Shah Alam eating local white rice paid ${E.money2(4 * sel.fitr!, 'MYR')}; on basmati, ${E.money2(4 * 25, 'MYR')}. The Shafi‘i school, followed across the region, prefers rice itself, but these authorities collect cash. Rates for 1448 are to be published before Ramadan.`,
    faqs: [
      { q: 'Which zakat fitrah tier should my family pay?', a: 'The tier that matches the rice your household normally eats. State councils link each rate to a kind of rice: local white or imported white for the lowest, fragrant, brown or parboiled for the middle, and basmati, Japanese or glutinous rice for the highest. Paying above your tier is allowed and rewarded.' },
      { q: 'What is a gantang and how heavy is it?', a: 'A gantang is a traditional Malay measure of volume. The bodies use the Baghdad gantang as the equivalent of one sa’: Selangor and Johor put it at 2.6 kg of rice, Negeri Sembilan at 2.751 kg. Prices of that weight of rice give the ringgit rates.' },
      { q: 'Can I pay zakat fitrah in my state if I live in another one?', a: 'Many councils ask you to pay where you live at the end of Ramadan, because the fitrah of a place goes to its poor. If you are in Kuala Lumpur on the last night, pay at the Federal Territories rate. Students and workers away from home usually pay where they are, at the local rate, and do not pay a second time at home.' },
    ],
    body: (h) => {
      const rows = STATES.map(([n, r]) => [n, r.map((x) => h.money2(x, 'MYR')).join(' / ')]);
      const fam = h.tool('fitr', { n: 4, body: 'malaysia-selangor' });
      return `
<h2>Rice, not wheat: how the region prices it</h2>
<p>The hadith of Ibn ‘Umar sets zakat al-fitr at one sa’ of food per person (${h.src('bukhari-1503', 'Sahih al-Bukhari 1503')}), and the Shafi‘i school, dominant in Malaysia, Singapore, Indonesia and Brunei, reads it as one sa’ of the main staple of the land. Here that is rice. Councils convert the sa’ into a volume, the Baghdad gantang, weigh it, and multiply by the price of the rice the household eats. Because rice ranges from cheap local white to imported basmati, most Malaysian states publish two or three tiers rather than one rate.</p>

<h2>Malaysia, state by state</h2>
<p>Religious affairs are run by each state, so each council sets its own rates. The federal ${h.src('b-jawhar-fitrah', 'JAWHAR table')} brings them together for 2026:</p>
${h.table(['State', 'Rates per person, 1447 (RM)'], rows, 'Zakat fitrah 2026, lowest to highest tier. Source: state Islamic councils via JAWHAR.', ['l', 'r'])}
<p>Selangor, through Lembaga Zakat Selangor, ties RM8 to local super special or imported white rice, RM16 to fragrant, glutinous, parboiled or brown rice, and RM25 to basmati, ponni, Japanese, red or black rice (${h.ext(sel.url, 'Lembaga Zakat Selangor, via Bernama')}). Kelantan set ${h.money2(h.fitr('malaysia-kelantan').fitr!, 'MYR')} and encourages RM22 for those eating dearer rice (${h.src('b-bernama-kelantan', 'Kelantan council, via Bernama')}). Sarawak fixes one amount by law: the Majlis Islam Sarawak rules of 2026, published in the state gazette, set ${h.money2(swk.fitr!, 'MYR')} for every Muslim in the state.</p>
<p>For the Shah Alam family above, the calculator gives ${fam.value} at the Selangor rate.</p>
${h.mini('fitr', { t: 'Zakat fitrah for your household in Malaysia', p: ['n', 'body'], d: { n: 4, body: 'malaysia-selangor' } })}

<h2>Singapore: a rate from the median price of rice</h2>
<p>${h.src('b-muis-1447', 'MUIS')} announced on ${h.day(sg.date)} a normal rate of ${h.money2(sg.fitr!, 'SGD')} and a higher rate of S$8, ten cents more than the year before, both based on the median price of normal and higher-grade rice. In the same release MUIS moved fidyah away from the weight of rice: it now follows the actual cost of a meal, ${h.money2(sg.fidya!, 'SGD')} a day, up from the S$1.40 set in 2014, and kafarah was aligned at the same ${h.money2(sg.kaffarah!, 'SGD')} per person fed. MUIS also stopped requiring, by default, the compounded fidyah for fasts made up late.</p>

<h2>Indonesia: one national figure, local variations</h2>
<p>${h.src('b-baznas-fitrah', 'BAZNAS')}, the national zakat agency, set zakat fitrah for 1447 at 2.5 kg or 3.5 litres of rice or staple food per person, or ${h.money(id.fitr!, 'IDR')} in money, by decision 14 of 2026; fidyah was fixed at ${h.money(id.fidya!, 'IDR')} per day. These are the amounts paid through BAZNAS itself. Provincial and district BAZNAS offices may publish their own amounts based on local rice prices, which is why a village mosque may announce a different figure.</p>

<h2>Paying in rice or in money</h2>
<p>In the Shafi‘i school the base rule is to give the food itself, and many families in kampung areas still hand over rice. Councils in Malaysia, Singapore and Indonesia collect money at the published rate, following the view, held by the Hanafi school and accepted by many contemporary bodies, that the value serves the poor as well. Families who prefer the Shafi‘i base rule can buy one gantang of rice per person and give it directly to a poor household.</p>

<h2>Fidyah alongside fitrah</h2>
<p>Many people pay fidyah for missed fasts at the same counter. In the Federal Territories, the ${h.src('ppz-fidyah', 'PPZ-MAIWP fidyah page')} uses RM4.00 a day in its examples and multiplies the amount for each year a make-up fast is delayed past the next Ramadan, the Shafi‘i position. The ${h.a('fidya', 'fidya page')} compares the schools.</p>

<h2>Who pays, and for whom</h2>
<p>Every Muslim who has food beyond the needs of his household for the night and day of Aidilfitri pays zakat fitrah, for himself and for the family members he maintains: spouse, children, and parents who depend on him. A baby born before sunset on the last day of Ramadan is counted; one born after is not. A person who dies after that sunset is still counted, and the family pays from what he left. Converts who embrace Islam before the end of Ramadan pay for that year too. Councils accept payment through mosque amil, counters and online portals; keep the receipt, which in Malaysia also supports the income tax rebate for fitrah (${h.src('b-lhdn-faq', 'LHDN')}).</p>

<h2>Dates for 1448</h2>
<p>On the Umm al-Qura calendar Ramadan 1448 is expected to begin on ${h.day(h.ramadan1448)} and Aidilfitri to fall on ${h.day(h.shawwal1448)}; Malaysia, Singapore and Indonesia announce their own dates after sighting. Zakat fitrah becomes due at sunset on the last day of Ramadan and may be paid from the start of the month. The 1448 rates are to be published before Ramadan.</p>
`;
    },
  },
});
