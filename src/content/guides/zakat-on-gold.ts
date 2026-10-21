import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en'), A = makeKit('ar');
const pureNeed = (k: number) => (E.nisabGrams('gold') * 24) / k;

export default defineGuide({
  id: 'zakat-on-gold', group: 'assets', order: 10, tool: 'gold', toolArg: { g: 80, k: '22' },
  related: ['nisab', 'zakat-on-silver', 'how-to-calculate-zakat', 'zakat-al-maal', 'zakat-calculator-pakistan'],
  sources: ['egypt-jewel', 'egypt-nisab', 'ppz-gold', 'muis-jewel', 'kuwait-calc', 'pk-calc', 'jordan-nisab'],
  en: {
    slug: 'zakat-on-gold', nav: 'Zakat on gold', card: 'Bars, coins and jewellery: the pure gold that counts, and the two views on what you wear.',
    title: 'Zakat on Gold 2026: Jewellery, Carat and Today’s Value',
    description: 'Zakat on gold in 2026: count the pure gold in each carat, the two views on jewellery you wear, the customary weights of Malaysia and Singapore, and gems.',
    h1: 'Zakat on gold, from bars to the bangles you wear',
    intro: 'Enter the weight and carat of your gold, say whether you wear it, and pick your currency: the value and the zakat are worked out at today’s price.',
    resume: `Gold owes zakat at ${E.pct(E.P.rate.lunar)} once the pure gold you hold reaches ${E.nisabGrams('gold')} g and a lunar year has passed; at the spot price of ${E.priceDay} that weight is worth ${E.money(E.nisab('gold', 'PKR'), 'PKR')}. Jewellery is measured by its gold content, so the threshold is ${E.dec(pureNeed(22), 1)} g of 22 carat, ${E.dec(pureNeed(21), 1)} g of 21 carat or ${E.dec(pureNeed(18), 1)} g of 18 carat. Bars, coins and pieces kept as savings are zakatable on every view. Jewellery a woman wears is where the schools part: the Hanafi school counts it, while the Maliki, Shafi‘i and Hanbali schools exempt gold kept for normal adornment, as Dar al-Ifta of Egypt sets out. Kuala Lumpur exempts worn gold up to ${E.P.nisab.urf.ppz} g and Singapore up to ${E.P.nisab.urf.muis} g. Gold below the threshold on its own is still added to your cash and other wealth. Diamonds and pearls carry no zakat unless they are stock in trade.`,
    faqs: [
      { q: 'Is zakat on 22 carat jewellery paid on its full weight or on its gold content?', a: 'On the value of the whole piece, but the nisab test looks at the gold inside it. A 22 carat bangle is 22 parts gold in 24, so 100 g of it holds about 91.7 g of pure gold. Once the test is passed, the zakat is one fortieth of what the jewellery is worth at today’s price for that carat.' },
      { q: 'Is there zakat on diamonds, pearls and other gems set in gold?', a: 'Dar al-Ifta of Egypt reports that the jurists agree there is no zakat on gems such as diamonds, rubies and pearls kept for personal use. Only the gold or silver of the setting counts. The Punjab Zakat and Ushr Department adds precious stones to zakatable wealth only when they were bought for trade, at their estimated value.' },
      { q: 'Does a man’s gold ring or chain count for zakat?', a: 'Yes on the views that exempt worn jewellery, because the exemption covers adornment that is lawful for its wearer, and gold jewellery is not lawful for men. The Federal Territories zakat centre in Malaysia lists jewellery owned by men among the gold on which zakat is due at the 85 g threshold. The Hanafi school counts all jewellery anyway.' },
      { q: 'My gold is under 85 g of pure content: is any zakat due on it?', a: 'Not on the gold alone. But zakat looks at your whole wealth: if the gold, added to your cash, savings and shares, reaches the nisab on your zakat day, the gold is counted with the rest at 2.5 %. The calculator on the main zakat page adds the lines together for you.' },
      { q: 'Is gold bought as an investment treated like jewellery that is worn?', a: 'No. Dar al-Ifta of Egypt, which exempts jewellery worn for adornment, says zakat is due on gold held purely as savings or investment. The Kuala Lumpur fatwa council made physical investment gold, passbook gold and gold held in trading accounts zakatable, and Singapore counts investment jewellery by its full weight from 86 g.' },
    ],
    body: (h) => {
      const cur = 'PKR';
      const carats = [24, 22, 21, 18, 14];
      const rows = carats.map((k) => [`${k} carat`, h.grams((h.nisabGrams('gold') * 24) / k), h.money2(Math.round(h.goldGram(k, cur) * 100) / 100, cur), h.money(50 * h.goldGram(k, cur), cur), h.money(50 * h.goldGram(k, cur) * h.P.rate.lunar, cur)]);
      const inc = h.zakat({ cur, cash: 450000, goldG: 20, goldK: 24, jewelG: 60, jewelK: 22, jewelRule: 'include', basis: 'silver' });
      const exc = h.zakat({ cur, cash: 450000, goldG: 20, goldK: 24, jewelG: 60, jewelK: 22, jewelRule: 'exclude', basis: 'silver' });
      const urf100 = 100 * h.gram('gold', 'MYR');
      return `
<h2>Weight, carat and the gold that counts</h2>
<p>Gold is one of the two metals the hadith names, and zakat on it is due whether it sits in a bank vault or in a drawer at home. The test has two parts. First, does the pure gold you own reach ${h.nisabGrams('gold')} g, twenty dinars of 4.25 g on the reading the ${h.src('jordan-nisab', 'Jordanian Iftaa Department')} adopts? Second, has it stayed with you for a lunar year? If both answers are yes, you pay ${h.pct(h.P.rate.lunar)} of what the gold is worth on your zakat day.</p>
<p>Very little gold that households own is pure. A 22 carat bangle is 22 parts gold out of 24, an 18 carat ring only 18. The Shafi‘i and Hanbali reading, set out by ${h.src('egypt-nisab', 'Dar al-Ifta of Egypt')}, counts only the gold inside the alloy, so a heavier piece is needed to reach the threshold. The table shows how many grams of each carat that takes, and what 50 g of each would owe at today’s price if the threshold is reached.</p>
${h.table(['Carat', 'Weight that holds 85 g of pure gold', 'Price of 1 g today', 'Value of 50 g', 'Zakat on 50 g'], rows, `Pakistani rupees, spot prices of ${h.priceDay}. The zakat column applies once your gold, or your wealth as a whole, reaches the nisab.`, ['l', 'r', 'r', 'r', 'r'])}
<p>The Hanafi school takes a different line on alloys: when gold is the greater part of the piece, the whole weight is treated as gold, so 85 g of 21 carat already reaches the threshold. Egyptian practice follows that measure. This site converts to pure gold before comparing, and the calculator above prints the pure content under the result so you can apply either reading.</p>
${h.mini('gold', { t: 'Zakat on a set of 21 carat jewellery', p: ['g', 'k', 'worn'], d: { g: 110, k: '21', cur, worn: 'yes' } })}

<h2>Jewellery you wear: two answers, two amounts</h2>
<p>The question families ask most is whether gold worn every day owes zakat. ${h.src('egypt-jewel', 'Dar al-Ifta of Egypt, fatwa 22484')}, lays out both positions. The Hanafi school, a saying of al-Shafi‘i and a report from Ahmad hold that it does: Abu Hanifa, through al-Shaybani, said any gold or silver that reaches the nisab owes zakat, jewellery or not. The Maliki school, the Shafi‘i school on its stronger view and the Hanbali school on its apparent doctrine hold that jewellery kept for lawful adornment does not, and Dar al-Ifta itself rules that way, even if the owner may sell a piece one day when in need.</p>
<p>Take a household in Lahore with ${h.money(450000, cur)} in the bank, 20 g of 24 carat coins put aside, and 60 g of 22 carat bangles worn by the wife. On the Hanafi view all three count, net wealth is ${h.money(inc.net, cur)} and zakat comes to ${h.money(inc.zakat, cur)}. On the majority view the bangles drop out, wealth is ${h.money(exc.net, cur)} and zakat is ${h.money(exc.zakat, cur)}. The coins count on both views because they were bought to be kept, not worn. Most households in Pakistan follow the Hanafi school, and the ${h.src('pk-calc', 'Punjab Zakat and Ushr Department calculator')} lists 24, 22 and 18 carat “gold or jewelry” together as zakatable.</p>
${h.mini('zakat', { t: 'Savings with worn jewellery', p: ['cash', 'goldG', 'jewelG'], d: { cur, cash: 450000, goldG: 20, goldK: '24', jewelG: 60, jewelK: '22' } })}

<h2>Customary weight in Kuala Lumpur and Singapore</h2>
<p>Zakat bodies in South East Asia follow the Shafi‘i school and exempt worn jewellery, but they draw a line at what is customary, the ‘urf. The ${h.src('ppz-gold', 'Federal Territories zakat centre')} sets that line at ${h.P.nisab.urf.ppz} g of worn gold: below it, nothing is due on what you wear; above it, zakat is due on the excess. Its own worked example takes 900 g worn and charges zakat on the 100 g above the line. For 100 g of pure gold that is ${h.money(urf100 * h.P.rate.lunar, 'MYR')} at today’s price, on a value of ${h.money(urf100, 'MYR')}.</p>
<p>${h.src('muis-jewel', 'MUIS in Singapore')} keeps a customary amount of ${h.P.nisab.urf.muis} g, and its fatwa committee applies it piece by piece: zakat on jewellery becomes due only when one piece reaches that weight. The same fatwa treats jewellery kept for investment differently, as zakatable once it reaches 86 g and counted on its total weight. Few people anywhere wear that much gold, so in practice the two bodies exempt ordinary jewellery and tax hoards dressed up as ornaments.</p>

<h2>Bars, coins and gold kept as savings</h2>
<p>There is no disagreement about gold that is not worn. Bars, sovereigns, coins from a wedding put straight into a safe, and old pieces nobody wears any more all count. The Malaysian centre lists jewellery that is no longer worn because it is broken or old with the zakatable gold, and a 2014 fatwa of the Federal Territories made physical investment gold, gold passbook accounts and gold held in trading accounts subject to zakat. ${h.src('kuwait-calc', 'Kuwait Zakat House')} values its gold threshold in 24 carat, which fits bullion bought by the gram.</p>
<p>Value savings gold at what it would fetch on your zakat day. The calculator uses the spot price of pure gold scaled to the carat; a jeweller buying from you will offer less, and some households use that lower buying price because it is what the gold would really bring. Whichever you use, keep the same method each year.</p>

<h2>Gems, men’s jewellery and gold given as a gift</h2>
<p>Stones are left out. Dar al-Ifta reports agreement among the jurists that gems such as diamonds, rubies and pearls owe no zakat, so a diamond ring is counted for its gold only. The rule changes when stones are stock: a jeweller pays on them as trade goods, and the Punjab calculator adds precious stones only “if they are purchased for commercial purpose”.</p>
<p>Gold jewellery worn by a man is not lawful adornment for him, so even the schools that exempt a woman’s jewellery count it. Gold given to a bride is hers: from the day she owns it, her own lunar year runs on it, and whether she pays on what she wears depends on the school she follows. For the gold threshold in other currencies see the ${h.a('nisab', 'nisab of the day')}, and for silver pieces, which follow a different weight, the ${h.a('zakat-on-silver', 'silver page')}.</p>
`;
    },
  },
  ar: {
    slug: 'zakat-on-gold', nav: 'زكاة الذهب', card: 'السبائك والجنيهات والحلي: الذهب الخالص الذي يُحتسب، والقولان في الحلي الملبوس.',
    title: 'زكاة الذهب 2026: الحلي الملبوس والعيار وحساب القيمة اليوم',
    description: 'زكاة الذهب 2026: كيف يُحسب الذهب الخالص في كل عيار اليوم، والقولان في الحلي الملبوس، والوزن المعتاد في ماليزيا وسنغافورة، وحكم الأحجار الكريمة وذهب الشبكة.',
    h1: 'زكاة الذهب من السبيكة إلى الحلي الملبوس',
    intro: 'أدخل وزن ذهبك وعياره، وبيّن هل هو حلي ملبوس، واختر عملتك: تُحسب القيمة والزكاة بسعر اليوم.',
    resume: `تجب الزكاة في الذهب بنسبة ${A.pct(A.P.rate.lunar)}، أي ربع العشر، إذا بلغ ما تملكه من الذهب الخالص ${A.nisabGrams('gold')} غرامًا وحال عليه الحول الهجري، وقيمة هذا الوزن بسعر ${A.priceDay} تبلغ ${A.money(A.nisab('gold', 'EGP'), 'EGP')}. والحلي يُقاس بما فيه من ذهب خالص عند الشافعية والحنابلة، فيلزم ${A.dec(pureNeed(21), 2)} غرامًا من عيار 21 أو ${A.dec(pureNeed(18), 2)} غرامًا من عيار 18، بينما يعدّ الحنفية المخلوط ذهبًا إذا غلب فيه الذهب، والعمل في مصر على 85 غرامًا من عيار 21. والسبائك والجنيهات وما يُدّخر من الحلي تجب فيها الزكاة بلا خلاف. أما الحلي الملبوس فيزكيه الحنفية، ولا زكاة فيه عند المالكية والشافعية والحنابلة، وبهذا تفتي دار الإفتاء المصرية. ويعفي مركز الزكاة في كوالالمبور الحلي الملبوس إلى ${A.P.nisab.urf.ppz} غرام والمجلس الإسلامي في سنغافورة إلى ${A.P.nisab.urf.muis} غرامًا. ولا زكاة في الألماس واللؤلؤ إلا إذا كانت للتجارة.`,
    faqs: [
      { q: 'هل تجب الزكاة في ذهب الشبكة الذي تلبسه الزوجة؟', a: 'الشبكة ملك للزوجة، وحكمها حكم سائر حليها. فعلى قول الحنفية تزكيها إذا بلغ ذهبها مع مالها النصاب وحال عليها الحول. وعلى قول المالكية والشافعية والحنابلة، وهو ما تفتي به دار الإفتاء المصرية، لا زكاة فيها ما دامت معدّة للزينة واللبس، فإن ادُّخرت للبيع أو الاستثمار وجبت فيها الزكاة.' },
      { q: 'بأي سعر أقوّم الذهب عند إخراج زكاته؟', a: 'يُقوَّم الذهب بقيمته في يوم وجوب الزكاة، أي في آخر الحول. وتستعمل الحاسبة السعر الفوري للذهب الخالص بحسب العيار. والصائغ يشتري منك بأقل من ذلك، فبعض الناس يعتمدون سعر الشراء لأنه ما يحصلون عليه فعلًا لو باعوا. والمهم أن تلتزم طريقة واحدة كل عام وتكتب السعر الذي اعتمدته.' },
      { q: 'هل تدخل الأحجار الكريمة المركبة في الحلي في حساب الزكاة؟', a: 'لا. تنقل دار الإفتاء المصرية إجماع الفقهاء على أنه لا زكاة في الجواهر كالألماس والياقوت واللؤلؤ إذا كانت للاستعمال، فيُحسب وزن الذهب وحده دون الفص. أما من يتاجر في الأحجار فتجب عليه زكاتها بوصفها عروض تجارة تُقوّم بسعر البيع في آخر الحول.' },
      { q: 'هل يختلف حكم الذهب الذي يلبسه الرجل عن حلي المرأة؟', a: 'نعم. الإعفاء عند الجمهور خاص بالحلي المباح لصاحبه، والذهب لا يحل للرجل لبسه، فتجب الزكاة في خاتمه أو سلسلته عند الجميع. ويعدّ مركز الزكاة في الأقاليم الاتحادية بماليزيا حلي الرجال من الذهب الذي يُزكى إذا بلغ 85 غرامًا. والحنفية يزكون الحلي كله أصلًا.' },
    ],
    body: (h) => {
      const cur = 'EGP';
      const rows = [24, 21, 18].map((k) => [`عيار ${k}`, h.grams((h.nisabGrams('gold') * 24) / k), h.money2(Math.round(h.goldGram(k, cur) * 100) / 100, cur), h.money(h.nisabGrams('gold') * h.goldGram(k, cur), cur)]);
      const inc = h.zakat({ cur, cash: 150000, goldG: 40, goldK: 21, jewelG: 120, jewelK: 21, jewelRule: 'include', basis: 'gold' });
      const exc = h.zakat({ cur, cash: 150000, goldG: 40, goldK: 21, jewelG: 120, jewelK: 21, jewelRule: 'exclude', basis: 'gold' });
      const urfAed = 100 * h.gram('gold', 'AED');
      return `
<h2>العيار وما يُحتسب من الذهب</h2>
<p>الذهب أحد النقدين اللذين نص عليهما الحديث، فزكاته واجبة سواء أكان سبيكة في خزانة أم جنيهات في البيت أم حليًا مدخرًا. ويُنظر فيه إلى أمرين: أن يبلغ النصاب، وأن يحول عليه الحول الهجري. فإذا اجتمعا أخرجت ربع العشر من قيمته يوم الوجوب.</p>
<p>وأكثر ما تملكه الأسر ليس ذهبًا خالصًا: فعيار 21 فيه 21 جزءًا من الذهب من أربعة وعشرين، وعيار 18 فيه 18 جزءًا. وقد بيّنت ${h.src('egypt-nisab', 'دار الإفتاء المصرية في الفتوى 21692')} أن الشافعية والحنابلة يعتبرون الخالص وحده، فيكون النصاب في عيار 21 قيمة 97.14 غرامًا، وفي عيار 18 نحو 113.33 غرامًا. أما الحنفية وبعض المالكية فيعدّون المخلوط ذهبًا إذا غلب فيه الذهب، فيبقى النصاب 85 غرامًا في كل عيار، وجرى العمل والفتوى في الديار المصرية على 85 غرامًا من عيار 21.</p>
${h.table(['العيار', 'الوزن الذي فيه 85 غرامًا خالصة', 'سعر الغرام اليوم', 'قيمة 85 غرامًا من هذا العيار'], rows, `بالجنيه المصري، بالأسعار الفورية بتاريخ ${h.priceDay}.`, ['l', 'r', 'r', 'r'])}
<p>فمن ملك 90 غرامًا من عيار 21 بلغ النصاب على القول المعمول به في مصر، ولم يبلغه على قول من يعتبر الخالص إلا بضمه إلى ماله الآخر. والحاسبة في أعلى الصفحة تكتب لك وزن الخالص تحت النتيجة لتطبق القول الذي تتبعه.</p>
${h.mini('gold', { t: 'زكاة حلي من عيار 21', p: ['g', 'k', 'worn'], d: { g: 95, k: '21', cur, worn: 'yes' } })}

<h2>الحلي الملبوس بين القولين</h2>
<p>عرضت ${h.src('egypt-jewel', 'دار الإفتاء المصرية في الفتوى 22484')} الخلاف كاملًا. فممن أوجب الزكاة في الحلي الحنفية، وهو قول للشافعي ورواية عن أحمد، ونقل الشيباني عن أبي حنيفة أنه ليس من ذهب ولا فضة حلي ولا غيره يبلغ ما تجب فيه الزكاة إلا وجبت فيه. وذهب جمهور الفقهاء من المالكية والشافعية في الأظهر والحنابلة في ظاهر المذهب إلى أنه لا زكاة فيه. واختارت الدار هذا القول: لا زكاة على المرأة في ذهب تملكه بقصد التزين ولو نوت بيع شيء منه عند الحاجة، وإنما تجب فيما تملكه بقصد الادخار وحفظ المال أو الاستثمار.</p>
<p>مثال من القاهرة: زوجان لديهما ${h.money(150000, cur)} في البنك، و40 غرامًا من الجنيهات الذهب عيار 21 للادخار، و120 غرامًا من الحلي عيار 21 تلبسها الزوجة، ويحسبان بنصاب الذهب كما تفعل الدار. على قول الحنفية يبلغ صافي المال ${h.money(inc.net, cur)} والزكاة ${h.money(inc.zakat, cur)}. وعلى قول الجمهور يخرج الحلي من الحساب فيبقى ${h.money(exc.net, cur)}، والزكاة ${exc.zakat > 0 ? h.money(exc.zakat, cur) : 'لا شيء لأن الباقي دون النصاب'}. والجنيهات تُزكى على القولين لأنها للادخار لا للبس.</p>
${h.mini('zakat', { t: 'المدخرات مع الحلي الملبوس', p: ['cash', 'goldG', 'jewelG'], d: { cur, basis: 'gold', cash: 150000, goldG: 40, goldK: '21', jewelG: 120, jewelK: '21' } })}

<h2>الوزن المعتاد في ماليزيا وسنغافورة</h2>
<p>تتبع هيئات الزكاة في جنوب شرق آسيا المذهب الشافعي فتعفي الحلي الملبوس، لكنها تقيده بما جرى به العرف. فقد حدد ${h.src('ppz-gold', 'مركز الزكاة في الأقاليم الاتحادية بماليزيا')} العرف بـ${h.P.nisab.urf.ppz} غرام من الذهب الملبوس، وما زاد عليه في السنة تجب فيه الزكاة، ومثاله في ذلك من لبست 900 غرام فتزكي المئة الزائدة. ولو كانت المئة غرام ذهبًا خالصًا لبلغت قيمتها اليوم ${h.money(urfAed, 'AED')} وزكاتها ${h.money(urfAed * h.P.rate.lunar, 'AED')}.</p>
<p>ويعتمد ${h.src('muis-jewel', 'المجلس الإسلامي في سنغافورة')} عرفًا قدره ${h.P.nisab.urf.muis} غرامًا، ويطبقه على القطعة الواحدة، فلا تجب الزكاة في الحلي حتى تبلغ قطعة منه هذا الوزن. أما الحلي المقتنى للاستثمار فنصابه عنده 86 غرامًا ويُحسب بوزنه الكامل. والمقصود من هذا كله إعفاء الزينة المعتادة دون الكنز المتخذ في صورة حلي.</p>

<h2>السبائك والجنيهات والحلي المدخر</h2>
<p>لا خلاف في الذهب الذي لا يُلبس: السبائك والجنيهات والقطع القديمة أو المكسورة المحفوظة في العلبة كلها تُزكى. ويذكر المركز الماليزي أن الحلي الذي تُرك لبسه لقدمه أو كسره داخل في الذهب الواجب زكاته، وأفتت الأقاليم الاتحادية سنة 2014 بوجوب الزكاة في ذهب الاستثمار المادي وذهب الحسابات وذهب منصات التداول. ويقدّر ${h.src('kuwait-calc', 'بيت الزكاة الكويتي')} نصاب الذهب بعيار 24، وهو ما يناسب السبائك المشتراة بالغرام.</p>
<p>وأما الأحجار الكريمة فلا زكاة فيها: تنقل الدار إجماع الفقهاء على أن الجواهر كالألماس والياقوت واللؤلؤ لا تجب فيها الزكاة، فخاتم الألماس يُزكى ذهبه وحده إن وجبت فيه. ولمعرفة نصاب اليوم بعملات أخرى انظر ${h.a('nisab', 'نصاب الزكاة اليوم')}، ولجمع الذهب مع النقد والأسهم في حساب واحد انظر ${h.a('zakat-al-maal', 'زكاة المال')}.</p>
`;
    },
  },
});
