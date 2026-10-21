import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');
const g = (r: ReturnType<typeof E.faraid>, k: string) => r.shares.find((s) => s.key === k)!;
const withSon = E.faraid({ deceased: 'male', sons: 1, daughters: 2 });

export default defineGuide({
  id: 'inheritance-share-of-daughters', group: 'inheritance', order: 30, tool: 'faraid', toolArg: { dec: 'male', daughters: 2, mother: '1' },
  related: ['islamic-inheritance-calculator', 'inheritance-share-of-wife-and-husband', 'awl-and-radd'],
  sources: ['quran-4-11', 'bukhari-6736', 'islamweb-takmila', 'islamweb-radd', 'islamweb-minbariyya'],
  en: {
    slug: 'inheritance-share-of-daughters', nav: 'Share of daughters', card: 'Half for one daughter, two thirds for several, or half a son’s share: the rules and the cases.',
    title: 'Daughters Inheritance Share in Islam 2026: 1/2, 2/3 or Rest',
    description: 'Daughters inheritance share in Islam for 2026: one half for an only daughter, two thirds for two or more, half a son’s share beside a brother, worked out.',
    h1: 'The share of daughters in Islamic inheritance',
    intro: 'Three situations decide what daughters receive: alone, several, or with a brother.',
    resume: `Qur’an 4:11 sets three rules for daughters. An only daughter with no brother takes one half of the estate. Two or more daughters with no brother share two thirds equally. A daughter who has a brother inherits with him from what the fixed shares leave, each son taking twice what each daughter takes: with one son and two daughters and no other heir, the son takes ${E.frac(g(withSon, 'sons').perHead)} and each daughter ${E.frac(g(withSon, 'daughters').perHead)}. No other heir can exclude a daughter, and her own share never depends on whether she is married. Beside her, the spouse falls to the smaller share, the mother to one sixth, and every brother or sister of the deceased is excluded by a son, while daughters alone leave them a place as residuaries. When daughters and other fixed-share heirs leave a surplus with no residuary, it returns to them (radd). The son’s daughter takes one sixth beside a single daughter, completing two thirds, as reported in Sahih al-Bukhari 6736.`,
    faqs: [
      { q: 'Can daughters alone take the whole estate?', a: 'Yes, when no other heir is alive. One daughter takes her half as a fixed share and the other half is returned to her by radd; two or more daughters take two thirds and then the remaining third by radd. The majority of scholars apply radd before giving anything to the public treasury. If the deceased also left a spouse, the spouse takes a fixed share first and is not part of the return.' },
      { q: 'Who takes the rest when there are only daughters?', a: 'The nearest male residuary. With a father alive, he takes one sixth and then the rest after the daughters. Without a father, the grandfather, then a full brother, then a paternal half brother, then nephews and uncles. Sisters also become residuaries beside daughters and take the remainder, as the Prophet decided in the case reported by Bukhari, before any nephew or uncle can.' },
      { q: 'Do granddaughters inherit when there is a daughter?', a: 'A son’s daughter does. With one daughter, the son’s daughters together take one sixth so that the two groups reach two thirds. With two or more daughters, son’s daughters receive nothing unless a son’s son stands beside them and draws them into the remainder. A daughter’s daughter is not among the heirs with a fixed share and does not inherit in this case.' },
    ],
    body: (h) => {
      const cur = 'USD', est = 300000;
      const fams: [string, Parameters<typeof h.faraid>[0]][] = [
        ['One daughter, father', { deceased: 'male', daughters: 1, father: 1 }],
        ['Two daughters, mother, full brother', { deceased: 'male', daughters: 2, mother: 1, fullBrothers: 1 }],
        ['Three daughters, wife, full sister', { deceased: 'male', daughters: 3, wives: 1, fullSisters: 1 }],
        ['Two daughters, one son, wife', { deceased: 'male', daughters: 2, sons: 1, wives: 1 }],
        ['One daughter, mother (radd)', { deceased: 'female', daughters: 1, mother: 1 }],
      ];
      const rows = fams.map(([label, f]) => { const s = h.faraid(f).shares.find((x) => x.key === 'daughters')!; return [label, h.frac(s.total), h.money(est * s.total.n / s.total.d, cur), h.money(est * s.perHead.n / s.perHead.d, cur)]; });
      const tk = h.faraid({ deceased: 'male', daughters: 1, sonsDaughters: 1, fullSisters: 1 });
      const two = h.faraid({ deceased: 'male', daughters: 2, sonsDaughters: 1, sonsSons: 1 });
      return `
<h2>Alone, several, or with a brother</h2>
<p>The verse ${h.src('quran-4-11', '4:11')} opens the inheritance rules with the children: to the male the share of two females; if there are only daughters, two or more, two thirds of what is left; if one, a half. These three lines are all the calculator needs for daughters, and they work the same whatever the daughters’ age, marital status or wealth. A daughter born after the death inherits if she was conceived before it; one who died before her parent does not.</p>
<p>When a son is present, the daughters stop being fixed-share heirs and become residuaries beside him. They then take what the spouse and parents leave, in parts of two for each son and one for each daughter. When no son is present, their half or two thirds is fixed, and what is left after them and the other fixed shares goes to the nearest male residuary, or to sisters, or comes back to the daughters by radd.</p>

<h2>What daughters receive in five families</h2>
<p>All five families leave ${h.money(est, cur)} after funeral costs and debts. The last column gives each daughter’s amount.</p>
${h.table(['Family', 'Daughters together', 'Amount', 'Each daughter'], rows, 'Computed in exact fractions by the engine of the calculator.', ['l', 'r', 'r', 'r'])}
<p>In the first family the father takes one sixth and then the remaining third as residuary, so the daughter’s half is fixed and nothing returns to her. In the second, the mother takes one sixth and the full brother the sixth that is left. In the third, the wife takes one eighth and the full sister, a residuary beside daughters, takes what the two thirds and the eighth leave. In the fourth, the son draws his sisters into the remainder and the fixed two thirds no longer apply. In the fifth, the mother and the daughter take one sixth and one half, and the surplus is returned to both in proportion three to one (${h.src('islamweb-radd', 'Islamweb 319204')}).</p>
${h.mini('faraid', { t: 'Share of daughters in your family', p: ['estate', 'daughters', 'sons'], d: { dec: 'male', estate: 300000, daughters: 2, sons: 0, mother: '1', cur: 'USD' } })}

<h2>The granddaughter and the completion of two thirds</h2>
<p>Ibn Mas‘ud was asked about a daughter, a son’s daughter and a sister. He answered with the judgment of the Prophet: half to the daughter, one sixth to the son’s daughter to complete two thirds, and the rest to the sister (${h.src('bukhari-6736', 'Sahih al-Bukhari 6736')}; ${h.src('islamweb-takmila', 'Islamweb 172621')}). The calculator returns ${tk.shares.map((s) => `${h.frac(s.total)}`).join(', ')} for this family, in that order. With two daughters the granddaughters have no share of their own, because the two thirds are already full; a son’s son beside them changes this, since he takes the remainder with his sister: here the son’s son takes ${h.frac(two.shares.find((x) => x.key === 'sonsSons')!.total)} and his sister ${h.frac(two.shares.find((x) => x.key === 'sonsDaughters')!.total)}.</p>

<h2>Why the share is half that of a son</h2>
<p>The rule is not that women inherit half of men in every case. A mother and a father beside a child take the same sixth; uterine brothers and sisters share their third equally; in many families a daughter takes more than the deceased’s father or brother. The two-to-one ratio applies between a son and a daughter, and between full or paternal brothers and sisters inheriting together. Classical commentators explain it by the duties of the son, who must pay a dowry and maintain his wife and children, while a daughter keeps what she inherits and is maintained by her husband or father.</p>
<p>A daughter’s share is also hers alone after marriage: her husband has no claim on it, and she owes no part of it to her household’s expenses, which remain the husband’s duty. If she dies first, what she inherited passes to her own heirs, among them her husband and children, under the same rules.</p>
<p>Parents who want to help a daughter beyond her share can do so during their lifetime, by gifts made in good health; most scholars ask that gifts to children be fair between them. A bequest cannot add to a daughter’s share without the other heirs’ consent, because she is already an heir. The calculator shows the shares of the estate as the Qur’an fixes them, and the minbariyya case on the ${h.a('inheritance-share-of-wife-and-husband', 'spouses’ page')} shows how daughters’ two thirds behave when the shares exceed the estate (${h.src('islamweb-minbariyya', 'Islamweb 359851')}).</p>
`;
    },
  },
});
