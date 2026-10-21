import { defineGuide, type Helpers } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';
import { HEIR_LABEL } from '../../lib/tool-specs';
import { add, type Heirs } from '../../lib/engine/faraid';

const E = makeKit('en'), A = makeKit('ar');

/** Shares of one family, as table rows: heir, fraction, amount for the group, amount each. */
const rowsOf = (h: Helpers, heirs: Partial<Heirs>, estate: number, cur: string) => {
  const r = h.faraid(heirs);
  const i = h.lang === 'ar' ? 1 : 0;
  return {
    r,
    rows: r.shares.filter((s) => s.total.n > 0).map((s) => [`${HEIR_LABEL[s.key][i]}${s.count > 1 ? ` ×${s.count}` : ''}`, h.frac(s.total), h.money(estate * s.total.n / s.total.d, cur), h.money(estate * s.perHead.n / s.perHead.d, cur)]),
  };
};

const famEn = { deceased: 'male' as const, wives: 1, sons: 2, daughters: 1, mother: 1, father: 1 };
const fEn = E.faraid(famEn);
const sh = (r: typeof fEn, k: string) => r.shares.find((s) => s.key === k)!;

export default defineGuide({
  id: 'islamic-inheritance-calculator', group: 'inheritance', order: 10, tool: 'faraid',
  related: ['inheritance-share-of-wife-and-husband', 'inheritance-share-of-daughters', 'awl-and-radd', 'zakat-al-maal', 'nisab'],
  sources: ['quran-4-11', 'quran-4-12', 'quran-4-176', 'bukhari-6736', 'islamweb-mother', 'ibn-taymiyya', 'islamweb-umariyya'],
  en: {
    slug: 'islamic-inheritance-calculator', nav: 'Inheritance calculator', card: 'Shares of each heir under the Qur’an, with ‘awl and radd, in fractions and in money.',
    title: 'Islamic Inheritance Calculator 2026: Shares of Each Heir',
    description: 'Islamic inheritance calculator 2026: enter the heirs and the estate to get each Qur’an share in fractions and in money, with ‘awl, radd and the exclusions.',
    h1: 'Islamic inheritance calculator',
    intro: 'Say who died, enter the estate and tick the heirs who are alive: the calculator gives each share as a fraction and an amount.',
    resume: `Islamic inheritance gives fixed shares to close relatives and the rest to the nearest male relatives. A widow takes one eighth when there are children, a widower one quarter; each parent takes one sixth beside a child; a son takes twice what a daughter takes from the remainder (Qur’an 4:11 and 4:12). Debts and funeral costs come first, then a bequest of at most one third to people who do not inherit. For a man who leaves a wife, two sons, a daughter and both parents, the wife takes ${E.frac(sh(fEn, 'wives').total)}, each parent ${E.frac(sh(fEn, 'mother').total)}, and the children share the remaining ${E.frac(add(sh(fEn, 'sons').total, sh(fEn, 'daughters').total))}, ${E.frac(sh(fEn, 'sons').perHead)} to each son and ${E.frac(sh(fEn, 'daughters').perHead)} to the daughter. When the fixed shares add up to more than the estate they are reduced in proportion (‘awl), and when something is left with no male heir it returns to the relatives other than the spouse (radd). The calculator works in exact fractions and names every heir who is excluded, and by whom.`,
    faqs: [
      { q: 'What is paid before the heirs receive anything?', a: 'Three things, in this order: the costs of washing, shrouding and burial; the debts of the deceased, including an unpaid dowry and unpaid zakat; then a bequest (wasiyya), which may not exceed one third of what is left and may not go to someone who already inherits. Only the rest is shared among the heirs, and the calculator takes debts and bequest off first.' },
      { q: 'Why does a son receive twice the share of a daughter?', a: 'The Qur’an sets it in 4:11: for the male, the share of two females. Classical commentators link it to the duties the son carries and the daughter does not, such as paying a dowry and maintaining his wife and children, while a daughter keeps her inheritance for herself. The calculator applies the rule whenever brothers and sisters inherit together as residuary heirs.' },
      { q: 'Can a will change the shares set by the Qur’an?', a: 'Not for the heirs. The shares of the Qur’an apply to the estate after debts, and the Prophet’s saying that there is no bequest for an heir is followed by all four schools, unless the other heirs agree. A will can leave up to one third to people outside the list, such as a stepchild or a friend. Above a third, the heirs must consent.' },
      { q: 'Does the calculator follow the law of my country?', a: 'It follows the classical rules shared by the four Sunni schools, with the differences shown. Several countries have codified inheritance with their own adjustments, for example on grandchildren whose parent died first, and civil law applies in many others unless a will says otherwise. For an estate that a court or notary will settle, ask them which rules they apply.' },
    ],
    body: (h) => {
      const cur = 'GBP', estate = 240000;
      const a = rowsOf(h, famEn, estate, cur);
      const fam2 = { deceased: 'female' as const, husband: 1, daughters: 2, mother: 1 };
      const b = rowsOf(h, fam2, 90000, 'USD');
      const fam3 = { deceased: 'male' as const, wives: 1, father: 1, mother: 1, fullBrothers: 2 };
      const c = h.faraid(fam3);
      const mo = c.shares.find((s) => s.key === 'mother')!;
      return `
<h2>Who inherits, and who is left out</h2>
<p>The heirs fall into two groups. The first have a fixed share named in the Qur’an (${h.src('quran-4-11', '4:11')}, ${h.src('quran-4-12', '4:12')} and ${h.src('quran-4-176', '4:176')}): the husband or wife, the mother and father, daughters and son’s daughters, grandparents, and brothers and sisters in some cases. The second, the residuary heirs (‘asaba), take what the fixed shares leave: sons first, then son’s sons, then the father, the grandfather, full brothers, paternal half-brothers and, beyond them, nephews, uncles and cousins through male lines. When a son and a daughter inherit together, the daughter becomes a residuary with him and takes half of what he takes.</p>
<p>Some relatives exclude others completely (hajb). A son excludes his own children, every brother and sister, and every nephew or uncle. A father excludes the grandfather and all the brothers and sisters. Two or more daughters leave nothing to son’s daughters, unless a son’s son turns them into residuaries. The calculator lists each excluded heir with the relative who excludes them, so you can check the reasoning on your own family.</p>

<h2>The fixed shares at a glance</h2>
${h.table(['Heir', 'Share', 'When'], [
  ['Husband', '1/2', 'no child or son’s child'], ['Husband', '1/4', 'with a child or son’s child'],
  ['Wife (one or several, shared)', '1/4', 'no child or son’s child'], ['Wife (one or several, shared)', '1/8', 'with a child or son’s child'],
  ['Mother', '1/3', 'no child and fewer than two brothers or sisters'], ['Mother', '1/6', 'with a child, or two or more brothers or sisters'],
  ['Father', '1/6', 'with a son; plus the rest with daughters only'], ['One daughter', '1/2', 'no son'], ['Two or more daughters', '2/3', 'no son, shared'],
  ['Uterine brother or sister', '1/6', 'alone; 1/3 shared for two or more'],
], 'Main fixed shares of the Qur’an. Each line applies only when no closer heir excludes that person.', ['l', 'r', 'l'])}

<h2>A worked family</h2>
<p>A man leaves an estate of ${h.money(estate, cur)} after his funeral and his debts, with no bequest. He is survived by his wife, two sons, a daughter, his mother and his father. The wife has a child beside her, so she takes one eighth. Each parent takes one sixth, because there are children. What is left goes to the children, two parts for each son and one for the daughter.</p>
${h.table(['Heir', 'Share', 'Group', 'Each'], a.rows, `Estate of ${h.money(estate, cur)}. Common base ${a.r.base}.`, ['l', 'r', 'r', 'r'])}
${h.mini('faraid', { t: 'Share the estate of this family', p: ['estate', 'sons'], d: { dec: 'male', estate: 240000, wives: 1, sons: 2, daughters: 1, father: '1', mother: '1', cur: 'GBP' } })}

<h2>When the shares do not add up to one</h2>
<p>A woman leaves her husband, two daughters and her mother, and an estate of ${h.money(90000, 'USD')}. The husband’s quarter, the daughters’ two thirds and the mother’s sixth come to thirteen twelfths: more than the estate. The answer, adopted since the time of ‘Umar, is ‘awl: every share is reduced in the same proportion, here from a base of ${b.r.awl ? b.r.awl.from : ''} to ${b.r.awl ? b.r.awl.to : ''}.</p>
${h.table(['Heir', 'Share', 'Group', 'Each'], b.rows, `Estate of ${h.money(90000, 'USD')}, with ‘awl.`, ['l', 'r', 'r', 'r'])}
<p>Nobody loses more than the others: each heir keeps the same proportion of the estate relative to the rest, only the common base grows. The husband still takes more than the mother, and the two daughters together still take eight parts for the mother’s two.</p>
<p>The opposite happens when the fixed shares leave something and there is no residuary heir: the surplus returns to the fixed-share heirs in proportion to their shares, except the husband or wife (radd). The ${h.a('awl-and-radd', 'page on ‘awl and radd')} works through both with the published cases.</p>

<h2>Cases the calculator handles with care</h2>
<p>Brothers who are themselves excluded can still reduce the mother. If a man leaves his wife, both parents and two brothers, the father excludes the brothers, yet the mother takes ${h.frac(mo.total)} and not one third, because the Qur’an lowers her share whenever there are brothers; this is the majority view that ${h.src('islamweb-mother', 'Islamweb’s fatwa 409885')} follows. When only a spouse and both parents inherit, the mother takes one third of what remains after the spouse, not of the whole estate: the two ‘umariyya cases (${h.src('islamweb-umariyya', 'fatwa 15603')}).</p>
<p>Two points are left to you. In al-mushtaraka, a husband, a mother, uterine siblings and full brothers, the Hanafi and Hanbali schools give the full brothers nothing while the Maliki and Shafi‘i schools let them share the uterine siblings’ third (${h.src('ibn-taymiyya', 'Ibn Taymiyya sets out both views')}): the calculator has a switch for it. With a paternal grandfather and brothers, it follows Abu Hanifa, for whom the grandfather excludes them, and says so in a note, since the other schools let them share with him.</p>
<p>What it does not do: nephews, uncles and cousins are not entered, so when one of them would take the remainder, the calculator says so instead of returning that remainder to the other heirs. It does not apply the special rules some national laws add, and it gives no ruling on a disputed will. The ${h.a('inheritance-share-of-wife-and-husband', 'spouse’s share')} and the ${h.a('inheritance-share-of-daughters', 'daughters’ share')} have their own pages.</p>
`;
    },
  },
  ar: {
    slug: 'islamic-inheritance-calculator', nav: 'حاسبة المواريث', card: 'نصيب كل وارث بفروض القرآن مع العول والرد، كسرًا ومبلغًا.',
    title: 'حاسبة المواريث الشرعية 2026: نصيب كل وارث بالكسر والمبلغ',
    description: 'حاسبة المواريث الشرعية 2026: أدخل الورثة والتركة لتعرف نصيب كل وارث بفروض القرآن كسرًا ومبلغًا، مع العول والرد والمحجوبين، والمسائل المشهورة كلها مختبرة.',
    h1: 'حاسبة المواريث الشرعية',
    intro: 'حدد المتوفى وأدخل التركة واختر الورثة الأحياء: تعطيك الحاسبة نصيب كل وارث كسرًا ومبلغًا.',
    resume: `تقسم المواريث في الإسلام بين أصحاب فروض مقدرة في القرآن وعصبة تأخذ ما بقي. فللزوجة الثمن مع الولد والربع بدونه، وللزوج الربع مع الولد والنصف بدونه، ولكل من الأبوين السدس مع الولد، وللذكر مثل حظ الأنثيين من الباقي (النساء 11 و12). ويُبدأ بتجهيز الميت ثم قضاء ديونه ثم تنفيذ وصيته في حدود الثلث لغير وارث، وما بقي يقسم على الورثة. فإن مات رجل عن زوجة وابنين وبنت وأب وأم، أخذت الزوجة ${A.frac(sh(fEn, 'wives').total)}، وكل من الأبوين ${A.frac(sh(fEn, 'mother').total)}، وذهب الباقي إلى الأولاد، لكل ابن ${A.frac(sh(fEn, 'sons').perHead)} وللبنت ${A.frac(sh(fEn, 'daughters').perHead)}. وإذا زادت الفروض على التركة نقص كل فرض بنسبته وهو العول، وإذا بقي شيء ولا عاصب رُدّ على أصحاب الفروض عدا الزوجين وهو الرد. وتعمل الحاسبة بالكسور الدقيقة، وتذكر كل وارث محجوب ومن حجبه، وتعرض المسائل المختلف فيها على القولين.`,
    faqs: [
      { q: 'ما الذي يُخرج من التركة قبل قسمتها على الورثة؟', a: 'ثلاثة أمور بهذا الترتيب: نفقة تجهيز الميت من غسل وتكفين ودفن، ثم ديونه ومنها المهر المؤجل والزكاة التي لم يخرجها، ثم الوصية في حدود ثلث الباقي ولغير وارث. وما بقي بعد ذلك هو الذي يقسم على الورثة، والحاسبة تخصم الديون والوصية أولًا قبل حساب الأنصبة.' },
      { q: 'لماذا يأخذ الابن ضعف نصيب البنت؟', a: 'لأن القرآن نص عليه في سورة النساء: للذكر مثل حظ الأنثيين. ويربطه المفسرون بما يتحمله الابن من أعباء لا تتحملها البنت، كالمهر والنفقة على زوجته وأولاده، بينما يبقى نصيب البنت لها خالصًا. والحاسبة تطبق هذه القاعدة كلما ورث الإخوة والأخوات معًا بالتعصيب.' },
      { q: 'هل تستطيع الوصية أن تغير أنصبة الورثة؟', a: 'لا في حق الورثة. فالأنصبة المقدرة تطبق على التركة بعد الديون، ولا وصية لوارث عند المذاهب الأربعة إلا أن يجيزها بقية الورثة. ويجوز أن يوصي المرء بالثلث فما دونه لغير الورثة، كربيب أو صديق أو قريب محجوب، وما زاد على الثلث يحتاج إلى إجازة الورثة.' },
      { q: 'هل تطبق الحاسبة قانون الأحوال الشخصية في بلدي؟', a: 'تطبق الأحكام المعروفة عند المذاهب السنية الأربعة مع بيان مواضع الخلاف. وقد قننت بلدان كثيرة المواريث وأضافت أحكامًا خاصة، كالوصية الواجبة لأولاد الابن الذي مات قبل أبيه. فإن كانت التركة ستقسم أمام محكمة أو موثق فاسألهم عن القانون الذي يطبقونه قبل الاعتماد على أي حساب.' },
    ],
    body: (h) => {
      const cur = 'SAR', estate = 900000;
      const a = rowsOf(h, famEn, estate, cur);
      const fam2 = { deceased: 'female' as const, husband: 1, daughters: 2, mother: 1 };
      const b = rowsOf(h, fam2, 300000, 'AED');
      const fam3 = { deceased: 'male' as const, wives: 1, father: 1, mother: 1, fullBrothers: 2 };
      const c = h.faraid(fam3);
      const mo = c.shares.find((s) => s.key === 'mother')!;
      return `
<h2>من يرث ومن يُحجب</h2>
<p>الورثة صنفان. أصحاب الفروض الذين قدّر القرآن أنصبتهم (${h.src('quran-4-11', 'النساء 11')} و${h.src('quran-4-12', '12')} و${h.src('quran-4-176', '176')}): الزوج والزوجة، والأب والأم، والبنات وبنات الابن، والجد والجدة، والإخوة والأخوات في أحوال معينة. والعصبة الذين يأخذون ما أبقت الفروض: الابن أولًا، ثم ابن الابن، ثم الأب، ثم الجد، ثم الأخ الشقيق، ثم الأخ لأب، ثم أبناء الإخوة والأعمام وأبناؤهم. وإذا اجتمع الابن والبنت صارت البنت عصبة به وأخذت نصف ما يأخذه.</p>
<p>وبعض الورثة يحجب غيره حجبًا تامًا. فالابن يحجب أولاده وجميع الإخوة والأخوات وأبناء الإخوة والأعمام، والأب يحجب الجد وجميع الإخوة والأخوات، والبنتان فأكثر تحجبان بنات الابن ما لم يعصبهن ابن ابن. وتذكر الحاسبة كل وارث محجوب ومن حجبه، فتستطيع مراجعة المسألة على أسرتك.</p>

<h2>الفروض المقدرة في جدول</h2>
${h.table(['الوارث', 'الفرض', 'متى'], [
  ['الزوج', '1/2', 'إذا لم يكن للزوجة فرع وارث'], ['الزوج', '1/4', 'مع الفرع الوارث'],
  ['الزوجة أو الزوجات بالتساوي', '1/4', 'إذا لم يكن للزوج فرع وارث'], ['الزوجة أو الزوجات بالتساوي', '1/8', 'مع الفرع الوارث'],
  ['الأم', '1/3', 'لا فرع وارث ولا جمع من الإخوة'], ['الأم', '1/6', 'مع الفرع الوارث أو اثنين فأكثر من الإخوة'],
  ['الأب', '1/6', 'مع الابن؛ والسدس والباقي مع البنات فقط'], ['البنت الواحدة', '1/2', 'إذا لم يكن ابن'], ['البنتان فأكثر', '2/3', 'إذا لم يكن ابن، بالتساوي'],
  ['الأخ أو الأخت لأم', '1/6', 'منفردًا؛ والثلث للاثنين فأكثر'],
], 'أهم الفروض المقدرة. كل سطر لا ينطبق إلا إذا لم يحجب الوارثَ من هو أقرب منه.', ['l', 'r', 'l'])}

<h2>مثال محسوب</h2>
<p>مات رجل عن تركة قدرها ${h.money(estate, cur)} بعد تجهيزه وقضاء ديونه، ولم يوص بشيء، وترك زوجة وابنين وبنتًا وأمًا وأبًا. للزوجة الثمن لوجود الفرع الوارث، ولكل من الأبوين السدس لوجود الأولاد، والباقي للأولاد للذكر مثل حظ الأنثيين.</p>
${h.table(['الوارث', 'النصيب', 'للمجموعة', 'لكل واحد'], a.rows, `تركة قدرها ${h.money(estate, cur)}، وأصل المسألة ${a.r.base}.`, ['l', 'r', 'r', 'r'])}
${h.mini('faraid', { t: 'اقسم تركة هذه الأسرة', p: ['estate', 'sons'], d: { dec: 'male', estate: 900000, wives: 1, sons: 2, daughters: 1, father: '1', mother: '1', cur: 'SAR' } })}

<h2>حين لا تساوي الفروض التركة</h2>
<p>ماتت امرأة عن زوج وبنتين وأم وتركة قدرها ${h.money(300000, 'AED')}. ربع الزوج وثلثا البنتين وسدس الأم مجموعها ثلاثة عشر جزءًا من اثني عشر، أي أكثر من التركة. والحل الذي عمل به الصحابة منذ عهد عمر هو العول: ينقص كل فرض بالنسبة نفسها، فتعول المسألة هنا من ${b.r.awl ? b.r.awl.from : ''} إلى ${b.r.awl ? b.r.awl.to : ''}.</p>
${h.table(['الوارث', 'النصيب', 'للمجموعة', 'لكل واحد'], b.rows, `تركة قدرها ${h.money(300000, 'AED')} مع العول.`, ['l', 'r', 'r', 'r'])}
<p>ولا يُظلم أحد بالعول، لأن كل وارث يحتفظ بالنسبة نفسها إلى غيره، وإنما يكبر أصل المسألة. فيبقى نصيب الزوج أكبر من نصيب الأم، وتبقى للبنتين ثمانية أسهم مقابل سهمين للأم، كما كان قبل العول.</p>
<p>والعكس حين تبقى من التركة بقية بعد الفروض ولا عاصب: يُرد الباقي على أصحاب الفروض بنسبة فروضهم، ما عدا الزوج والزوجة، وهو الرد. فإن ماتت امرأة عن أم وبنت فقط، أخذت البنت النصف والأم السدس فرضًا، ثم رُد الباقي عليهما بنسبة ثلاثة إلى واحد، فتأخذ البنت ثلاثة أرباع التركة والأم ربعها. وإذا كان معهما زوج أخذ فرضه كاملًا أولًا ولم يُرد عليه شيء، ثم قُسم الباقي بين البنت والأم بالنسبة نفسها. وهذا قول الحنفية والحنابلة ومتأخري الشافعية والمالكية حين لا يكون بيت مال منتظم، وهو ما تطبقه الحاسبة.</p>
<p>وقبل أن تستعمل الحاسبة اجمع ما يلزم: قيمة التركة بعد نفقة التجهيز، وما على الميت من ديون، ومقدار الوصية إن وجدت، ثم أسماء الورثة الأحياء يوم الوفاة وقرابتهم منه. فمن مات قبل المتوفى لا يرث منه شيئًا ولو بفارق يوم، ومن مات بعده يرث ثم ينتقل نصيبه إلى ورثته هو، وهذه هي المناسخات التي تحسب مسألة بعد مسألة.</p>

<h2>مسائل تحتاج إلى عناية</h2>
<p>قد يحجب الإخوةُ الأمَّ وهم محجوبون. فإن مات رجل عن زوجة وأبوين وأخوين، حجب الأبُ الأخوين، ومع ذلك تأخذ الأم ${h.frac(mo.total)} لا الثلث، لأن القرآن ينقص فرضها بوجود الإخوة، وهو قول الجمهور الذي تأخذ به ${h.src('islamweb-mother', 'فتوى إسلام ويب 409885')}. وإذا لم يرث إلا أحد الزوجين والأبوان فللأم ثلث الباقي بعد فرض الزوج أو الزوجة لا ثلث التركة كلها، وهما العمريتان (${h.src('islamweb-umariyya', 'الفتوى 15603')}).</p>
<p>ومسألتان تُتركان لاختيارك. ففي المشتركة، زوج وأم وإخوة لأم وأخ شقيق، لا شيء للأشقاء عند الحنفية والحنابلة، ويشاركون الإخوة لأم في ثلثهم عند المالكية والشافعية (${h.src('ibn-taymiyya', 'كما يعرض ابن تيمية القولين')})، وفي الحاسبة خيار لذلك. ومع الجد والإخوة تتبع الحاسبة قول أبي حنيفة الذي يرى أن الجد يحجبهم، وتنبه على ذلك، لأن بقية المذاهب تجعلهم يقاسمونه.</p>
<p>وما لا تحسبه: أبناء الإخوة والأعمام وأبناؤهم لا يُدخلون، فإذا كان أحدهم سيأخذ الباقي نبهت الحاسبة على ذلك بدل أن ترده على بقية الورثة. ولا تطبق الأحكام الخاصة التي تضيفها بعض القوانين الوطنية، ولا تفصل في وصية متنازع عليها. ولحالة تركتك اسأل عالمًا تثق به أو المحكمة المختصة.</p>
`;
    },
  },
});
