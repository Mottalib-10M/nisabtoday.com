import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en'), A = makeKit('ar');

const exE = E.zakat({ cur: 'CAD', cash: 14500, goldG: 25, goldK: 22, shares: 7000, debts: 1800, basis: 'silver' });
const exA = A.zakat({ cur: 'KWD', cash: 2600, goldG: 30, goldK: 21, shares: 1400, debts: 350, basis: 'silver' });

export default defineGuide({
  id: 'zakat-al-maal', group: 'zakat', order: 20, tool: 'zakat',
  toolArg: { cash: 14500, goldG: 25, shares: 7000, debts: 1800 },
  related: ['nisab', 'how-to-calculate-zakat', 'when-is-zakat-due', 'zakat-on-gold', 'zakat-on-business', 'zakat-al-fitr'],
  sources: ['quran-9-60', 'a-bukhari-1454', 'a-abudawud-1573', 'bukhari-1447', 'iifa-property', 'iifa-debts', 'islamweb-debts', 'egypt-jewel', 'ppz-business', 'zatca-reg'],
  en: {
    slug: 'zakat-al-maal', nav: 'Zakat al-maal', card: 'Zakat on wealth: which assets count, the four conditions, and the yearly sum in your currency.',
    title: 'Zakat al-Maal 2026: Zakat on Wealth, Asset by Asset',
    description: 'Zakat al-maal 2026: the yearly zakat on cash, gold, shares, trade goods and money owed to you, its four conditions and what stays exempt, with today’s nisab.',
    h1: 'Zakat al-maal, the yearly zakat on what you own',
    intro: 'Enter each kind of wealth you hold on your zakat day; the calculator adds them, takes off debts due and compares the total with today’s nisab.',
    resume: `Zakat al-maal is the zakat on wealth, paid once a year on what you own, as distinct from zakat al-fitr, the small per-person payment at the end of Ramadan. It covers cash and bank balances, gold and silver, shares and funds, goods held for sale and money others owe you and will repay. It does not cover your home, your car, your clothes or the tools of your trade. Four conditions apply: the wealth is fully yours, it is of a kind that can grow, it has been held for a lunar year, and together it reaches the nisab, which at the prices of ${E.priceDay} is ${E.money(E.nisab('silver', 'CAD'), 'CAD')} on the silver measure and ${E.money(E.nisab('gold', 'CAD'), 'CAD')} on the gold one. When the total reaches it, ${E.pct(E.P.rate.lunar)} of the whole is due. A Toronto household with ${E.money(exE.net, 'CAD')} of net zakatable wealth owes ${exE.due ? E.money(exE.zakat, 'CAD') : 'nothing this year'} on the silver measure.`,
    faqs: [
      { q: 'What is the difference between zakat al-maal and zakat al-fitr?', a: 'Zakat al-maal is a share of your wealth, paid once a lunar year when what you own reaches the nisab. Zakat al-fitr is a fixed amount of staple food, or its cash value where bodies allow it, paid for every member of the household before the Eid prayer, whatever their savings. Someone below the nisab can owe zakat al-fitr and no zakat al-maal.' },
      { q: 'Do I add all my assets together to reach the nisab?', a: 'Yes for cash, savings, shares, trade goods and money owed to you: they are added and the total is compared with one nisab. Gold and silver are added to them by value as well, on the common practice of zakat bodies. A savings account below the threshold on its own can therefore become zakatable once your gold or shares are counted with it.' },
      { q: 'Are my house, car and furniture part of zakat al-maal?', a: 'No. Things kept for your own use are outside zakat whatever they are worth: the home you live in, a car you drive, furniture, clothes, a computer for work. The International Islamic Fiqh Academy also holds that buildings rented out are not zakatable themselves; only the rent you have saved is. Property bought to sell again is a different case.' },
      { q: 'Why is zakat al-maal taken from savings rather than from income?', a: 'Because it is a charge on wealth that has stayed with you for a year, not on what passes through your hands. Salary spent within the month never reaches your zakat day. What remains, together with gold, shares and goods for sale, is weighed once a year, and one fortieth of it is due if it reaches the nisab, the rate written in the letter of Abu Bakr.' },
    ],
    body: (h) => {
      const c = 'CAD';
      const ex = h.zakat({ cur: c, cash: 14500, goldG: 25, goldK: 22, shares: 7000, debts: 1800, basis: 'silver' });
      const exG = h.zakat({ cur: c, cash: 14500, goldG: 25, goldK: 22, shares: 7000, debts: 1800, basis: 'gold' });
      const exN = h.zakat({ cur: c, cash: 14500, goldG: 25, goldK: 22, shares: 7000, debts: 1800, debtRule: 'none', basis: 'silver' });
      const line = (k: string) => ex.lines.find((l) => l.k === k)?.value ?? 0;
      return `
<h2>Wealth that is counted, wealth that is not</h2>
<p>“Maal” simply means property. Zakat al-maal is the part of it that a Muslim hands over each year once their holdings pass a threshold, and the Qur’an names the people it goes to (${h.src('quran-9-60', 'Qur’an 9:60')}). Not everything you own enters the sum. The classical rule is that zakat falls on wealth that grows or can be traded: gold and silver, money in any currency, goods bought to sell, livestock that graze freely and crops at harvest. Everything kept for your own needs stays outside it, however valuable.</p>
${h.table(['Counted', 'Not counted'], [
        ['Cash at home, current and savings accounts', 'The home you live in'],
        ['Gold and silver kept as savings, coins and bars', 'Your car, furniture, clothes, phone'],
        ['Shares, funds and an ISA, see the shares page', 'Tools, machines and premises of your work'],
        ['Stock held for sale in a business', 'A building you rent out (its saved rent is counted)'],
        ['Money owed to you by someone who will repay', 'Precious stones kept for wear, by the consensus Dar al-Ifta reports'],
      ], 'Main categories of zakat al-maal for a household.', ['l', 'l'])}
<p>Two lines in this table carry a disagreement that changes the amount. Gold jewellery worn by its owner is counted by the Hanafi school and exempt for the Maliki, Shafi‘i and Hanbali schools, as ${h.src('egypt-jewel', 'Dar al-Ifta of Egypt')} reports. A pension you cannot touch yet is handled differently by different bodies. Both are set out on their own pages, ${h.a('zakat-on-gold', 'zakat on gold')} and ${h.a('zakat-on-pension', 'zakat on a pension')}, with the two amounts side by side.</p>

<h2>The four conditions, in plain terms</h2>
<p><strong>Full ownership.</strong> The money must be yours to use. A deposit held by a landlord, or a fund your employer controls until you retire, is not fully owned in the sense the jurists use, which is why the Fiqh Academy treats such sums apart.</p>
<p><strong>Wealth that can grow.</strong> Cash and gold count because they can be invested or traded; a sofa does not. This is also why rented buildings escape zakat while the rent they bring in does not: the ${h.src('iifa-property', 'Fiqh Academy’s resolution 2')} puts zakat on the yield once a year has passed from its receipt, not on the walls.</p>
<p><strong>The nisab.</strong> Your counted wealth, after debts due, must reach the threshold of the day: ${h.money(h.nisab('silver', c), c)} on the silver measure or ${h.money(h.nisab('gold', c), c)} on the gold one, at the prices of ${h.priceDay}. Its basis is the hadith of the five awaq (${h.src('bukhari-1447', 'Sahih al-Bukhari 1447')}), and the ${h.a('nisab', 'nisab page')} shows it in forty currencies.</p>
<p><strong>A lunar year.</strong> The hadith reported by Abu Dawud states that no zakat is due on wealth until a year has passed over it (${h.src('a-abudawud-1573', 'Sunan Abi Dawud 1573')}). In practice this means your zakat day comes round every lunar year of about ${h.P.rate.lunarDays} days, and on that day you look at what you hold. Crops and minerals follow other timing; they are not part of this calculator.</p>

<h2>A household in Toronto, line by line</h2>
<p>Take a couple who, on their zakat day, have ${h.money(14500, c)} across their accounts, 25 g of 22 carat gold coins, a tax-free savings account invested in funds worth ${h.money(7000, c)}, and ${h.money(1800, c)} of bills and instalments falling due. The coins are worth ${h.money(line('gold'), c)} at today’s price. The calculator adds the lines, takes off the debts and compares the result with the nisab.</p>
${h.table(['Line', 'Amount'], [
        ['Bank balances', h.money(line('cash'), c)],
        ['Gold coins, 25 g of 22 carat', h.money(line('gold'), c)],
        ['Funds in the savings account', h.money(line('shares'), c)],
        ['Debts due deducted', `-${h.money(ex.debtsDeducted, c)}`],
        ['Net zakatable wealth', h.money(ex.net, c)],
        ['Zakat, silver nisab', h.money(ex.zakat, c)],
        ['Zakat, gold nisab', h.money(exG.zakat, c)],
        ['Zakat if debts are not deducted', h.money(exN.zakat, c)],
      ], `Worked example at the prices of ${h.priceDay}.`, ['l', 'r'])}
<p>The silver and gold lines differ only when the net total sits between the two thresholds; here it is ${ex.net >= h.nisab('gold', c) ? 'above both, so the two results match' : 'between them, so the measure decides whether anything is due'}. The last line shows the newer Shafi‘i view, under which the debts are not subtracted (${h.src('islamweb-debts', 'Islamweb fatwa 47139')}). The difference is ${h.money(Math.abs(exN.zakat - ex.zakat), c)}, one fortieth of the debts.</p>
${h.mini('zakat', { t: 'Your own household in Canadian dollars', p: ['cash', 'goldG', 'shares', 'debts'], d: { cur: c, cash: 14500, goldG: 25, shares: 7000, debts: 1800 } })}

<h2>Money owed to you and money you owe</h2>
<p>A loan you made to a relative who is solvent and willing to repay is still your wealth. The ${h.src('iifa-debts', 'Fiqh Academy’s resolution 1')} counts it every year in that case; when the borrower cannot or will not pay, zakat on it is due for one year once you actually receive it. Debts you owe work the other way: the majority deduct what falls due now, such as the coming instalments and unpaid bills, not the whole balance of a long mortgage. The ${h.a('zakat-on-debts', 'debts page')} goes through both directions with figures.</p>

<h2>Business owners and landlords</h2>
<p>A shop’s zakat is part of the owner’s zakat al-maal. The usual method, which the ${h.src('ppz-business', 'Federal Territories zakat centre in Malaysia')} writes as current assets less current liabilities, counts stock at its selling price, cash and collectable customer debts, and subtracts supplier bills due. The premises, shelves and van are not counted. Landlords count the rent still in the bank on their zakat day, not the value of the flats. The ${h.a('zakat-on-business', 'business page')} and the ${h.a('zakat-on-property', 'property page')} take these cases further.</p>
<p>Whatever mix you hold, the method stays the same: list, value at today’s price, deduct what is due, compare with the nisab, then take one fortieth of the whole. When your situation is unusual, ask a scholar you trust before you pay.</p>
`;
    },
  },
  ar: {
    slug: 'zakat-al-maal', nav: 'زكاة المال', card: 'زكاة المال: الأموال التي تدخل في الحساب وشروط الوجوب ومقدارها بعملتك.',
    title: 'زكاة المال 2026: الأموال الزكوية وشروط الوجوب ومقدارها',
    description: 'زكاة المال 2026: الأموال التي تجب فيها من نقد وذهب وأسهم وعروض تجارة وديون مرجوة، وشروط وجوبها الأربعة وما يُعفى منها، مع نصاب اليوم بالدينار وبعملتك.',
    h1: 'زكاة المال: ما يدخل فيها وما يخرج منها',
    intro: 'أدخل كل نوع من مالك كما هو في يوم زكاتك، فتجمعه الحاسبة وتخصم الديون الحالّة وتقارن الصافي بنصاب اليوم.',
    resume: `زكاة المال هي الزكاة السنوية على ما يملكه المسلم من أموال نامية، وهي غير زكاة الفطر التي تُخرج عن كل نفس في آخر رمضان. وتدخل فيها النقود وأرصدة الحسابات، والذهب والفضة، والأسهم والصناديق، وعروض التجارة، والديون المرجوة السداد. ولا تدخل فيها دار السكن ولا السيارة ولا الأثاث ولا أدوات الحرفة. وشروطها أربعة: الملك التام، وأن يكون المال ناميًا أو قابلًا للنماء، وحولان الحول الهجري، وبلوغ النصاب، وهو بأسعار ${A.priceDay} يعادل ${A.money(A.nisab('silver', 'KWD'), 'KWD')} بنصاب الفضة و${A.money(A.nisab('gold', 'KWD'), 'KWD')} بنصاب الذهب. فإذا بلغ المجموع الصافي النصاب وجب ربع العشر، أي ${A.pct(A.P.rate.lunar)} من المال كله. فأسرة في الكويت يبلغ صافي مالها الزكوي ${A.money(exA.net, 'KWD')} تخرج ${exA.due ? A.money(exA.zakat, 'KWD') : 'لا شيء هذا العام'} بنصاب الفضة، وتعرض الحاسبة الفرق إن اختارت نصاب الذهب أو لم تخصم الديون، فترى أثر كل قول فقهي على المبلغ قبل أن تخرجه في يوم زكاتك.`,
    faqs: [
      { q: 'ما الفرق بين زكاة المال وزكاة الفطر؟', a: 'زكاة المال جزء من الثروة يُخرج مرة كل حول هجري إذا بلغ المال النصاب. أما زكاة الفطر فمقدار ثابت من غالب قوت البلد، أو قيمته عند من أجاز ذلك، يُخرج عن كل فرد من الأسرة قبل صلاة العيد ولو لم يملك صاحبه نصابًا. فقد تجب على المرء زكاة الفطر ولا تجب عليه زكاة المال.' },
      { q: 'هل أضم أموالي بعضها إلى بعض لبلوغ النصاب؟', a: 'نعم، تُضم النقود والمدخرات والأسهم وعروض التجارة والديون المرجوة، ويُقارن مجموعها بنصاب واحد، ويُضم إليها الذهب والفضة بالقيمة كما تعمل هيئات الزكاة. فقد يكون رصيد الحساب وحده دون النصاب، ثم يبلغه إذا أُضيف إليه ذهب الادخار أو قيمة الأسهم، فتجب الزكاة في الجميع.' },
      { q: 'هل تدخل دار السكن والسيارة في زكاة المال؟', a: 'لا. ما يُقتنى للاستعمال الشخصي لا زكاة فيه مهما بلغت قيمته: البيت الذي تسكنه، والسيارة التي تركبها، والأثاث والثياب وأدوات العمل. ويرى مجمع الفقه الإسلامي الدولي أن العقار المؤجر لا زكاة في أصله، وإنما في أجرته المقبوضة إذا حال عليها الحول. أما العقار المشترى للبيع فحكمه حكم عروض التجارة.' },
      { q: 'هل يخصم الدين من المال قبل حساب زكاة المال؟', a: 'يخصم الحنفية والمالكية والحنابلة، وهو القول القديم للشافعي، الدين الحالّ من المال قبل المقارنة بالنصاب، ولا يخصمه الشافعي في الجديد، كما يعرض موقع إسلام ويب. والمقصود الأقساط والفواتير المستحقة الآن لا كامل رصيد التمويل الطويل. والحاسبة تخصم افتراضيًا وتعرض المبلغ دون الخصم في خياراتها.' },
    ],
    body: (h) => {
      const c = 'KWD';
      const ex = h.zakat({ cur: c, cash: 2600, goldG: 30, goldK: 21, shares: 1400, debts: 350, basis: 'silver' });
      const exG = h.zakat({ cur: c, cash: 2600, goldG: 30, goldK: 21, shares: 1400, debts: 350, basis: 'gold' });
      const exN = h.zakat({ cur: c, cash: 2600, goldG: 30, goldK: 21, shares: 1400, debts: 350, debtRule: 'none', basis: 'silver' });
      const line = (k: string) => ex.lines.find((l) => l.k === k)?.value ?? 0;
      const eg = h.zakat({ cur: 'EGP', cash: 210000, debts: 25000, basis: 'gold' });
      return `
<h2>المال الزكوي وغير الزكوي</h2>
<p>المال في لغة الفقهاء كل ما يُتملك ويُنتفع به، لكن الزكاة لا تتعلق بكل مال. فهي تجب في الأموال النامية أو المعدّة للنماء: الذهب والفضة، والنقود بأي عملة كانت، وعروض التجارة، والأنعام السائمة، والزروع والثمار عند الحصاد. أما ما يقتنيه الإنسان لحاجته فلا زكاة فيه، كالدار والمركب والثياب والأثاث وآلات الصنعة. وقد حدد القرآن الكريم مصارفها الثمانية في ${h.src('quran-9-60', 'سورة التوبة 60')}، فهي حق معلوم في مال الأغنياء يُصرف إلى أصناف بعينها.</p>
${h.table(['تدخل في الحساب', 'لا تدخل في الحساب'], [
        ['النقد في البيت وأرصدة الحسابات الجارية والادخارية', 'دار السكن'],
        ['ذهب الادخار وفضته، سبائك ومسكوكات', 'السيارة والأثاث والثياب والهاتف'],
        ['الأسهم والصناديق والمحافظ الاستثمارية', 'المحل والآلات وأدوات الحرفة'],
        ['البضاعة المعدّة للبيع', 'العقار المؤجر في أصله (وتُزكى أجرته المدخرة)'],
        ['الدين المرجو على مليء مقرّ به', 'الجواهر واللآلئ المعدّة للزينة'],
      ], 'أهم أبواب زكاة المال للأسرة.', ['l', 'l'])}
<p>وفي سطرين من هذا الجدول خلاف يغيّر المبلغ: الحلي الملبوس تجب فيه الزكاة عند الحنفية ولا تجب عند الجمهور كما تبين ${h.src('egypt-jewel', 'دار الإفتاء المصرية')}، والتقاعد غير المقبوض تختلف فيه الهيئات. وتفصيل الحلي في صفحة ${h.a('zakat-on-gold', 'زكاة الذهب')} مع المبلغين.</p>

<h2>شروط الوجوب الأربعة</h2>
<p><strong>الملك التام:</strong> أن يكون المال في يدك تتصرف فيه، فالتأمين المحجوز عند المؤجر والصندوق الذي لا تملك سحبه ليسا ملكًا تامًا بالمعنى الفقهي.</p>
<p><strong>النماء:</strong> أن يكون المال ناميًا حقيقة أو تقديرًا. ولذلك لا زكاة في أصل العقار المؤجر، وإنما في غلته، كما قرر ${h.src('iifa-property', 'مجمع الفقه الإسلامي الدولي في قراره رقم 2')}: تجب الزكاة في الأجرة بعد حولان الحول من يوم قبضها.</p>
<p><strong>بلوغ النصاب:</strong> أن يبلغ صافي المال بعد الدين الحالّ ${h.money(h.nisab('silver', c), c)} بنصاب الفضة أو ${h.money(h.nisab('gold', c), c)} بنصاب الذهب بأسعار ${h.priceDay}. وأصله حديث الأواقي الخمس في ${h.src('bukhari-1447', 'صحيح البخاري 1447')}، وصفحة ${h.a('nisab', 'نصاب الزكاة')} تعرضه بأربعين عملة.</p>
<p><strong>حولان الحول:</strong> ففي سنن أبي داود: ليس في مال زكاة حتى يحول عليه الحول (${h.src('a-abudawud-1573', 'سنن أبي داود 1573')}). ويستثنى من ذلك الزرع والثمار فتُزكى يوم الحصاد، وهي خارج هذه الحاسبة.</p>

<h2>مثال من الكويت</h2>
<p>أسرة تملك في يوم زكاتها ${h.money(2600, c)} في حساباتها، و30 غرامًا من الذهب عيار 21 مدخرة، ومحفظة أسهم قيمتها ${h.money(1400, c)}، وعليها ${h.money(350, c)} أقساطًا وفواتير حالّة. قيمة الذهب اليوم ${h.money(line('gold'), c)}.</p>
${h.table(['البند', 'المبلغ'], [
        ['أرصدة الحسابات', h.money(line('cash'), c)],
        ['ذهب الادخار، 30 غرامًا عيار 21', h.money(line('gold'), c)],
        ['محفظة الأسهم', h.money(line('shares'), c)],
        ['الديون الحالّة المخصومة', `-${h.money(ex.debtsDeducted, c)}`],
        ['صافي المال الزكوي', h.money(ex.net, c)],
        ['الزكاة بنصاب الفضة', h.money(ex.zakat, c)],
        ['الزكاة بنصاب الذهب', h.money(exG.zakat, c)],
        ['الزكاة دون خصم الدين', h.money(exN.zakat, c)],
      ], `مثال محسوب بأسعار ${h.priceDay}.`, ['l', 'r'])}
<p>لا يختلف سطرا الفضة والذهب إلا إذا وقع الصافي بين النصابين، وهو هنا ${ex.net >= h.nisab('gold', c) ? 'فوقهما معًا فتتطابق النتيجتان' : 'بينهما، فالمقياس هو الذي يقرر الوجوب'}. والسطر الأخير على القول الجديد للشافعي الذي لا يخصم الدين (${h.src('islamweb-debts', 'إسلام ويب، الفتوى 47139')})، والفرق ${h.money(Math.abs(exN.zakat - ex.zakat), c)}، أي ربع عشر الدين.</p>
${h.mini('zakat', { t: 'احسب زكاة مال أسرتك بالدينار الكويتي', p: ['cash', 'goldG', 'shares', 'debts'], d: { cur: c, cash: 2600, goldG: 30, goldK: '21', shares: 1400, debts: 350 } })}

<h2>الدين الذي لك والدين الذي عليك</h2>
<p>القرض الذي أعطيته لقريب مليء مقرّ به ما زال مالك، فيزكى كل عام بحسب ${h.src('iifa-debts', 'قرار مجمع الفقه الإسلامي الدولي رقم 1')}، فإن كان المدين معسرًا أو مماطلًا زكّيته لسنة واحدة بعد قبضه. أما الدين الذي عليك فيخصمه الجمهور بقدر ما حلّ منه. ففي مصر مثلًا، من ادخر ${h.money(210000, 'EGP')} وعليه ${h.money(25000, 'EGP')} حالّة، وأخذ بنصاب الذهب الذي تعمل به دار الإفتاء، يبقى له ${h.money(eg.net, 'EGP')} ${eg.due ? `فيخرج ${h.money(eg.zakat, 'EGP')}` : 'وهو دون النصاب فلا زكاة عليه'}.</p>

<h2>التاجر وصاحب العقار</h2>
<p>زكاة المتجر جزء من زكاة مال صاحبه. والطريقة الشائعة، كما يكتبها ${h.src('ppz-business', 'مركز الزكاة في الأقاليم الاتحادية بماليزيا')}، الأصول المتداولة ناقص الخصوم المتداولة: البضاعة بسعر بيعها اليوم، والنقد، وديون العملاء المرجوة، ثم تُخصم ديون الموردين الحالّة. ولا يُحتسب المحل ولا الرفوف ولا سيارة التوزيع. وتفصيل ذلك في صفحة ${h.a('zakat-on-business', 'زكاة عروض التجارة')}، وأحكام الإيجار في صفحة ${h.a('zakat-on-property', 'زكاة العقار')}.</p>
<h2>السنة الهجرية والسنة الميلادية</h2>
<p>الأصل أن تُحسب زكاة المال بالحول الهجري، ومدته نحو ${h.P.rate.lunarDays} يومًا. ومن يمسك حساباته بالسنة الميلادية، كالشركات وكثير من الموظفين، يزيد النسبة بقدر الأيام الزائدة. وقد نصت ${h.src('zatca-reg', 'اللائحة التنفيذية لجباية الزكاة في السعودية')} على أن تُقسم 2.5 % على عدد أيام السنة الهجرية ثم تُضرب في أيام السنة المالية، فتبلغ ${h.pct(h.P.rate.solar, 3)} عن 365 يومًا. وتتيح الحاسبة هذا الخيار في إعداداتها الإضافية، فتختار السنة التي تعمل بها ويبقى الحساب منضبطًا من عام إلى عام.</p>
<p>وأيًا كان تركيب مالك فالطريقة واحدة: اجمع، وقوّم بسعر اليوم، واخصم الحالّ من الدين، وقارن بالنصاب، ثم أخرج ربع العشر من الجميع. وما أشكل عليك من حالتك فاسأل عنه عالمًا تثق به.</p>
`;
    },
  },
});
