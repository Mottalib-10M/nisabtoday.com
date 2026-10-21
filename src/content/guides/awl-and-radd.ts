import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';
import { HEIR_LABEL } from '../../lib/tool-specs';

const E = makeKit('en');
const g = (r: ReturnType<typeof E.faraid>, k: string) => r.shares.find((s) => s.key === k)!;
const awl = E.faraid({ deceased: 'female', husband: 1, fullSisters: 2 });
const radd = E.faraid({ deceased: 'female', mother: 1, daughters: 1 });

export default defineGuide({
  id: 'awl-and-radd', group: 'inheritance', order: 40, tool: 'faraid', toolArg: { dec: 'female', husband: '1', fullSisters: 2, daughters: 0, sons: 0 },
  related: ['islamic-inheritance-calculator', 'inheritance-share-of-wife-and-husband', 'inheritance-share-of-daughters'],
  sources: ['quran-4-11', 'quran-4-176', 'islamweb-awl', 'islamweb-minbariyya', 'islamweb-radd', 'islamweb-radd-wife', 'islamweb-radd-husband', 'islamweb-siblings', 'islamweb-mushtaraka'],
  en: {
    slug: 'awl-and-radd', nav: '‘Awl and radd', card: 'When fixed shares exceed the estate, or leave a surplus: the two corrections, with published cases.',
    title: 'Awl and Radd in Islamic Inheritance 2026: Worked Cases',
    description: 'Awl and radd in Islamic inheritance for 2026: how shares are reduced when they exceed the estate and how a surplus returns to the heirs, with published cases.',
    h1: '‘Awl and radd: when the shares do not fit the estate',
    intro: 'The fixed shares of the Qur’an do not always add up to exactly one. Two corrections deal with the gap.',
    resume: `‘Awl and radd are the two corrections of Islamic inheritance for estates where the fixed shares do not add up to exactly one. ‘Awl applies when they add up to more: every share is reduced in the same proportion by enlarging the common base. A woman who leaves her husband and two full sisters gives him one half and them two thirds, seven sixths in all, so the base of six becomes seven and the husband takes ${E.frac(g(awl, 'husband').total)} instead of one half. Radd applies when the fixed shares add up to less and no residuary heir is alive: the surplus returns to the fixed-share heirs in proportion to their shares, never to the husband or wife while another relative with a fixed share is alive. A woman who leaves her mother and one daughter gives the daughter one half and the mother one sixth; the third left is returned, and they end with ${E.frac(g(radd, 'daughters').total)} and ${E.frac(g(radd, 'mother').total)}. ‘Awl has been applied since the caliphate of ‘Umar; radd is the view of the Hanafi and Hanbali schools and of later Maliki and Shafi‘i scholars.`,
    faqs: [
      { q: 'Did all the Companions accept ‘awl?', a: 'Nearly all. ‘Umar applied it after consulting the Companions, and the four schools follow it. Ibn ‘Abbas is reported to have rejected it and to have reduced only the heirs he considered weaker, such as daughters and sisters, while keeping the spouse and the mother whole. His view was not followed by the schools, and the calculator applies the proportional reduction they adopted.' },
      { q: 'Why is nothing returned to the husband or wife?', a: 'Because radd follows kinship, and the spouse inherits through marriage, which ends with the death. The schools that accept radd agree on this while a blood relative with a fixed share is alive. When the spouse is the only heir, later scholars of several schools let the remainder go to the spouse rather than to a public treasury that does not exist; the calculator shows that remainder apart.' },
      { q: 'Does ‘awl ever happen with a son in the family?', a: 'No. A son is a residuary who takes what is left, and beside him daughters become residuaries too. The fixed shares are then limited to the spouse and the parents, at most one quarter and two sixths, which never exceed the estate. ‘Awl appears when daughters or sisters hold a fixed half or two thirds beside a spouse, the parents or uterine siblings.' },
    ],
    body: (h) => {
      const cur = 'EUR', est = 210000;
      const fams: [string, Parameters<typeof h.faraid>[0], string][] = [
        ['Husband, two full sisters', { deceased: 'female', husband: 1, fullSisters: 2 }, 'islamweb-awl'],
        ['Husband, mother, two full sisters', { deceased: 'female', husband: 1, mother: 1, fullSisters: 2 }, ''],
        ['Wife, two daughters, both parents', { deceased: 'male', wives: 1, daughters: 2, father: 1, mother: 1 }, 'islamweb-minbariyya'],
        ['Husband, two full sisters, two uterine siblings, mother', { deceased: 'female', husband: 1, fullSisters: 2, matSiblings: 2, mother: 1 }, ''],
      ];
      const awlRows = fams.map(([label, f]) => { const r = h.faraid(f); return [label, r.awl ? `${r.awl.from} → ${r.awl.to}` : '', r.shares.map((s) => `${HEIR_LABEL[s.key][0]} ${h.frac(s.total)}`).join(', ')]; });
      const r1 = h.faraid({ deceased: 'female', mother: 1, daughters: 1 });
      const r2 = h.faraid({ deceased: 'male', wives: 1, mother: 1, daughters: 1 });
      const r3 = h.faraid({ deceased: 'female', husband: 1, mother: 1, daughters: 1 });
      const sh = (r: typeof r1, k: string) => h.frac(r.shares.find((x) => x.key === k)!.total);
      const money = (r: typeof r1, k: string) => { const s = r.shares.find((x) => x.key === k)!; return h.money(est * s.total.n / s.total.d, cur); };
      const sib = h.faraid({ deceased: 'female', husband: 1, mother: 1, fullBrothers: 1, fullSisters: 1, matSiblings: 0 });
      return `
<h2>‘Awl: when the shares are too many</h2>
<p>The shares named in ${h.src('quran-4-11', '4:11')}, 4:12 and ${h.src('quran-4-176', '4:176')} are halves, quarters, eighths, thirds, two thirds and sixths. Combined, they can exceed the estate. The first case reported is that of a woman who left her husband and two sisters: half for him, two thirds for them. ‘Umar consulted the Companions and they chose to treat the estate like a debt that cannot be fully paid, where every creditor loses in proportion. The base is raised to the sum of the parts, and each heir keeps his number of parts on the larger base.</p>
<p>A base of six can rise to seven, eight, nine or ten; a base of twelve to thirteen, fifteen or seventeen; a base of twenty four only to twenty seven. The table shows each family with the base before and after ‘awl and the final shares in the order the calculator lists them.</p>
${h.table(['Family', 'Base', 'Final shares'], awlRows, 'Computed by the calculator’s engine: share of the estate of each group after ‘awl.', ['l', 'r', 'l'])}
<p>The first family is ${h.src('islamweb-awl', 'Islamweb’s fatwa 48741')}. The third is the minbariyya, in which ‘Ali is reported to have said from the pulpit that the wife’s eighth had become a ninth (${h.src('islamweb-minbariyya', 'Islamweb 359851')}). The last one reaches ten on a base of six, the largest ‘awl of that base: the husband’s half, the sisters’ two thirds, the uterine siblings’ third and the mother’s sixth come to ten sixths.</p>
${h.mini('faraid', { t: 'Try a family with ‘awl', p: ['estate', 'fullSisters', 'mother'], d: { dec: 'female', estate: 210000, husband: '1', fullSisters: 2, mother: '0', cur: 'EUR' } })}

<h2>Radd: when the shares leave a surplus</h2>
<p>Radd is the opposite problem. The fixed shares leave part of the estate, and no son, father, brother or other residuary is alive to take it. The schools that apply radd return the surplus to the fixed-share heirs in proportion to their shares, except the spouse. Three published cases, on an estate of ${h.money(est, cur)}:</p>
${h.table(['Family', 'Heir', 'Final share', 'Amount'], [
  ['Mother and daughter', 'Daughter', sh(r1, 'daughters'), money(r1, 'daughters')], ['', 'Mother', sh(r1, 'mother'), money(r1, 'mother')],
  ['Wife, mother and daughter', 'Wife', sh(r2, 'wives'), money(r2, 'wives')], ['', 'Daughter', sh(r2, 'daughters'), money(r2, 'daughters')], ['', 'Mother', sh(r2, 'mother'), money(r2, 'mother')],
  ['Husband, mother and daughter', 'Husband', sh(r3, 'husband'), money(r3, 'husband')], ['', 'Daughter', sh(r3, 'daughters'), money(r3, 'daughters')], ['', 'Mother', sh(r3, 'mother'), money(r3, 'mother')],
], 'Sources: Islamweb 319204, 127741 and 227083.', ['l', 'l', 'r', 'r'])}
<p>Without a spouse, the daughter’s half and the mother’s sixth stand three to one, so the whole estate is divided in quarters (${h.src('islamweb-radd', 'Islamweb 319204')}). With a wife, she takes her eighth first and the rest is divided three to one between the others (${h.src('islamweb-radd-wife', '127741')}); with a husband, he takes his quarter first and the same happens (${h.src('islamweb-radd-husband', '227083')}).</p>

<h2>How to check a result by hand</h2>
<p>Write each fixed share with the smallest common denominator, which is always one of seven numbers: 2, 3, 4, 6, 8, 12 or 24. Add the numerators. If the sum is larger than the denominator, ‘awl applies and the sum becomes the new base. If it is smaller and no residuary is alive, take the spouse’s share out first on its own base, then divide what remains among the other fixed-share heirs in the ratio of their numerators. If it is smaller and a residuary is alive, the residuary takes the difference and neither correction applies.</p>
<p>The wife, mother and daughter above give an example. On a base of 24, the wife has 3 parts, the daughter 12 and the mother 4: 19 parts, with 5 left and no residuary. The wife keeps her 3. The 21 parts left are divided between daughter and mother in the ratio 12 to 4, three to one, which gives the 21/32 and 7/32 of the table. The calculator does the same in exact fractions and never rounds before the last step.</p>

<h2>Cases near the edge</h2>
<p>Some families look like ‘awl or radd and are neither. A woman who leaves her husband, her mother, a full brother and a full sister: the husband’s half and the mother’s sixth leave one third, and the brother and sister take it as residuaries, two parts for him and one for her (${h.src('islamweb-siblings', 'Islamweb 140483')}). The calculator gives the husband ${h.frac(sib.shares.find((x) => x.key === 'husband')!.total)}, the mother ${h.frac(sib.shares.find((x) => x.key === 'mother')!.total)} and the brother and sister ${h.frac(sib.shares.find((x) => x.key === 'fullBrothers')!.total)} and ${h.frac(sib.shares.find((x) => x.key === 'fullSisters')!.total)}. Replace the two of them by two uterine siblings and full brothers, and the fixed shares exhaust the estate: that is al-mushtaraka, where the schools divide, and the calculator offers both answers (${h.src('islamweb-mushtaraka', 'Islamweb 204760')}).</p>
<p>When the only heir is a spouse, radd is not applied by the classical texts and the calculator leaves the remainder unallocated with a note. And when a nephew, an uncle or a cousin would take the remainder, the calculator does not apply radd either: it says that a more distant residuary takes what is left, since those relatives are not entered.</p>
`;
    },
  },
});
