import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');
const g = (r: ReturnType<typeof E.faraid>, k: string) => r.shares.find((s) => s.key === k);

const w4 = E.faraid({ deceased: 'male', wives: 4, sons: 1 });
const hNo = E.faraid({ deceased: 'female', husband: 1, father: 1 });
const hKids = E.faraid({ deceased: 'female', husband: 1, sons: 1, daughters: 1 });

export default defineGuide({
  id: 'inheritance-share-of-wife-and-husband', group: 'inheritance', order: 20, tool: 'faraid', toolArg: { dec: 'male', wives: 1, sons: 1 },
  related: ['islamic-inheritance-calculator', 'inheritance-share-of-daughters', 'awl-and-radd'],
  sources: ['quran-4-12', 'islamweb-umariyya', 'islamweb-umariyya2', 'islamweb-radd-wife', 'islamweb-radd-husband', 'islamweb-minbariyya'],
  en: {
    slug: 'inheritance-share-of-wife-and-husband', nav: 'Share of a wife or husband', card: 'A quarter or an eighth for the wife, a half or a quarter for the husband: when each applies.',
    title: 'Wife and Husband Inheritance Share 2026: 1/8, 1/4 or 1/2',
    description: 'Wife and husband inheritance share in Islam for 2026: one eighth or one quarter for the wife, one quarter or one half for the husband, with worked amounts.',
    h1: 'The share of a wife and of a husband',
    intro: 'The spouse’s share depends on one question only: did the deceased leave a child or a son’s child?',
    resume: `Under Qur’an 4:12 a husband inherits one half of his wife’s estate when she leaves no child and no son’s child, and one quarter when she does. A wife inherits one quarter of her husband’s estate when he leaves no child and no son’s child, and one eighth when he does. Several wives do not multiply this: they share the same quarter or eighth equally, so with four wives and a son each wife takes ${E.frac(g(w4, 'wives')!.perHead)} of the estate. The child counted can be from another marriage. The spouse is never excluded by any other heir, but the share can shrink by ‘awl when the fixed shares exceed the estate, and the spouse takes no part of a returned surplus (radd) while other relatives with fixed shares are alive. The shares are taken from the estate after funeral costs, debts (including any unpaid dowry, which is a debt owed to the wife) and a bequest of up to one third. A divorced spouse inherits only if the death happens during the waiting period of a revocable divorce.`,
    faqs: [
      { q: 'Does a child from another marriage reduce the spouse’s share?', a: 'Yes. The Qur’an speaks of a child of the deceased, not a child of the couple. If a man leaves a wife and a son from his first marriage, the wife takes one eighth, exactly as if the son were hers. The same applies to a husband whose late wife had children from a former husband: he takes one quarter, not one half.' },
      { q: 'Do four wives receive four times the share of one wife?', a: 'No. The quarter or the eighth is the share of all the wives together, divided equally between them. With two wives and children, each takes one sixteenth of the estate; with four wives, each takes one thirty second. The number of wives does not change what the other heirs receive, which is why the calculator asks for the number of wives only to divide their group share.' },
      { q: 'Is the unpaid dowry part of the wife’s inheritance?', a: 'No, it comes before inheritance. A deferred dowry (mahr) that the husband never paid is a debt of his estate, so it is paid to the wife first, with the other debts. Her share of one eighth or one quarter is then calculated on what remains. Enter the unpaid dowry in the debts field and the calculator takes it off before sharing.' },
      { q: 'What happens when the spouse is the only heir?', a: 'The spouse takes the fixed share, half or a quarter, and the rest has no listed heir. Classical scholars sent it to the public treasury; many later scholars return it to the spouse when no relative and no treasury that serves Muslims exists, and some national laws do the same. The calculator shows the remainder as unallocated and leaves that choice to you.' },
    ],
    body: (h) => {
      const cur = 'GBP';
      const a = h.faraid({ deceased: 'male', wives: 1, mother: 1, father: 1 });
      const b = h.faraid({ deceased: 'male', wives: 2, sons: 1, daughters: 2 });
      const c = h.faraid({ deceased: 'female', husband: 1, fullSisters: 2 });
      const d = h.faraid({ deceased: 'female', husband: 1, mother: 1, daughters: 1 });
      const e = h.faraid({ deceased: 'male', wives: 1 });
      const est = 160000;
      const row = (r: typeof a, k: string, label: string) => { const s = r.shares.find((x) => x.key === k)!; return [label, h.frac(s.total), h.money(est * s.total.n / s.total.d, cur), h.frac(s.perHead)]; };
      return `
<h2>The four shares, and the one question that decides them</h2>
<p>Verse ${h.src('quran-4-12', '4:12')} gives the spouses their shares in two sentences. To the husband, half of what his wife leaves if she has no child, and a quarter if she has one. To the wife, a quarter of what her husband leaves if he has no child, and an eighth if he has one. The child that counts is any child of the deceased, son or daughter, from this marriage or another, and the children of a son; the children of a daughter do not reduce the spouse’s share. A child who died before the deceased does not count.</p>
${h.table(['Spouse', 'No child or son’s child', 'With a child or son’s child'], [['Husband', '1/2', '1/4'], ['Wife or wives together', '1/4', '1/8']], 'Shares of the estate after funeral costs, debts and any bequest.', ['l', 'r', 'r'])}
<p>The spouse is one of the heirs no one can exclude, like the parents and the children. What changes is the size of the share, and two mechanisms can still move it: ‘awl, which lowers every fixed share when they add up to more than the estate, and the rule that a surplus returned to the family (radd) skips the spouse while relatives with fixed shares are alive.</p>

<h2>Worked cases on ${h.money(est, cur)}</h2>
<p>Each line below is a different family, all with the same estate after debts. The amount is the share of the spouse group; for several wives, the last column gives what each one takes.</p>
${h.table(['Family', 'Spouse share', 'Amount', 'Each'], [
  row(a, 'wives', 'Wife, mother, father (no child)'),
  row(b, 'wives', 'Two wives, a son, two daughters'),
  row(c, 'husband', 'Husband, two full sisters'),
  row(d, 'husband', 'Husband, mother, daughter'),
  row(e, 'wives', 'Wife alone'),
], 'Computed by the calculator’s engine, in exact fractions.', ['l', 'r', 'r', 'r'])}
<p>The first family is one of the two ‘umariyya cases: the wife takes her quarter, and the mother takes a third of what is left rather than a third of the estate, so that the father still takes twice the mother (${h.src('islamweb-umariyya', 'Islamweb 15603')}, ${h.src('islamweb-umariyya2', '171453')}). In the third, the husband’s half and the sisters’ two thirds exceed the estate, so both are reduced by ‘awl and the husband ends with ${h.frac(c.shares.find((x) => x.key === 'husband')!.total)} instead of one half. In the fourth, a surplus is left after the shares of the husband, mother and daughter; it returns to the mother and daughter only, and the husband keeps exactly his quarter (${h.src('islamweb-radd-husband', 'Islamweb 227083')}; the same rule with a wife: ${h.src('islamweb-radd-wife', '127741')}). In the last, the wife takes her quarter and ${h.frac(e.unallocated)} of the estate has no listed heir.</p>
${h.mini('faraid', { t: 'Share of the spouse in your family', p: ['estate', 'wives', 'sons', 'daughters'], d: { dec: 'male', estate: 160000, wives: 1, sons: 1, daughters: 0, cur: 'GBP' } })}

<h2>The famous case of the eighth that became a ninth</h2>
<p>‘Ali ibn Abi Talib is reported to have been asked from the pulpit about a man who left his wife, two daughters and both parents, and to have answered that the wife’s eighth had become a ninth. The shares are two thirds for the daughters, one sixth for each parent and one eighth for the wife: twenty seven parts on a base of twenty four. The wife’s three parts out of twenty seven are one ninth (${h.src('islamweb-minbariyya', 'Islamweb 359851')}). The calculator gives the same result for this family.</p>

<h2>Divorce, a second marriage, a marriage not registered</h2>
<p>A spouse inherits because of a valid marriage still in force at the death. After a revocable divorce, the wife still inherits if the husband dies during her waiting period (‘idda), and he inherits from her in the same situation. After a final divorce she does not, except in the case most schools single out: a husband who divorces in his last illness to deprive her, where several schools let her inherit. A marriage contracted in the religious form but not registered with the state is valid for this purpose, but a court may ask for proof of it before it applies the shares.</p>
<p>A widow’s right to stay in the family home, and her maintenance during the waiting period, are separate questions from inheritance and not counted by the calculator. Gifts the deceased made during his life are not part of the estate either, except a gift made in the last illness, which most schools treat like a bequest limited to one third. For any of these situations, the calculator gives the share of the estate; whether a court applies it, and to which assets, is for the court or the notary to say.</p>
`;
    },
  },
});
