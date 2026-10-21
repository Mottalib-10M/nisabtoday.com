import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en'), A = makeKit('ar');

/** Model page (CONTRIBUTING-PAGES.md): copy the structure, never the sentences. */
export default defineGuide({
  id: 'nisab', group: 'zakat', order: 10, tool: 'nisab',
  related: ['zakat-on-gold', 'zakat-on-silver', 'how-to-calculate-zakat', 'zakat-calculator-pakistan', 'zakat-on-savings'],
  sources: ['bukhari-1447', 'jordan-nisab', 'ppz-silver', 'pk-ordinance', 'egypt-nisab', 'kuwait-calc', 'gold-api'],
  en: {
    slug: 'nisab', nav: 'Nisab today', card: 'The zakat threshold in gold and silver, in your currency, at today’s price.',
    title: 'Nisab 2026: Today’s Zakat Threshold in Gold and Silver',
    description: 'Nisab 2026 at today’s gold and silver price in 40 currencies: 85 g of gold, 595 g of silver, or 87.48 g and 612.32 g in Pakistan, and the source of each weight.',
    h1: 'Nisab today, in gold and in silver',
    intro: 'Pick your currency: the nisab is recomputed from the spot price of gold and silver of the day.',
    resume: `The nisab is the minimum wealth on which zakat is due, and today it is worth ${E.money(E.nisab('silver', 'USD'), 'USD')} on the silver measure and ${E.money(E.nisab('gold', 'USD'), 'USD')} on the gold measure, at the spot prices of ${E.priceDay}. The weights are fixed: ${E.nisabGrams('silver')} g of silver, the two hundred dirhams of the hadith, or ${E.nisabGrams('gold')} g of gold, twenty dinars of 4.25 g. Pakistan’s 1980 Ordinance uses ${E.dec(E.nisabGrams('silver', 'pk'))} g of silver and ${E.dec(E.nisabGrams('gold', 'pk'))} g of gold. Only the money value moves, with the price of the metals, which is why this page reads the prices every day. Gold is now ${E.dec(E.ratio(), 1)} times the silver threshold, so the measure you choose decides whether modest savings owe zakat at all. Many scholars prefer silver for cash; the zakat bodies of Kuala Lumpur and Kuwait use gold. If what you own on your zakat day reaches the nisab you choose, zakat is ${E.pct(E.P.rate.lunar)} of the whole amount.`,
    faqs: [
      { q: 'Why is the gold nisab so much higher than the silver one?', a: 'Because the two metals no longer keep the ratio they had in the seventh century. Twenty dinars and two hundred dirhams were worth about the same then; today a gram of gold buys many dozens of grams of silver. The weights stay fixed by the hadith, so the two thresholds drift apart with the market.' },
      { q: 'Which nisab should I use for my savings in a bank?', a: 'Scholars differ. Many recommend the silver measure for cash because more people then pay and more reaches the poor. The zakat centre of Kuala Lumpur and Kuwait Zakat House use the gold measure for savings. Follow the practice of the body where you live, or ask a scholar you trust.' },
      { q: 'Does the nisab change every day?', a: 'In weight, no: 85 g of gold and 595 g of silver on the usual reading. In money, yes, because the price of the metals moves. This page reads the spot prices once a day and writes their date under the result, so the amount you see is the threshold of that day.' },
      { q: 'Is the nisab checked on one day or over the whole year?', a: 'The Hanafi school looks at the start and the end of the lunar year: if your wealth is above the nisab on both days, zakat is due even if it dipped in between. The other schools require it to stay above the threshold the whole year. Many people simply check on their zakat day.' },
    ],
    body: (h) => {
      const cur = 'USD';
      const sG = h.nisab('silver', 'GBP'), gG = h.nisab('gold', 'GBP');
      const rows = ['USD', 'GBP', 'EUR', 'CAD', 'PKR', 'INR', 'MYR', 'SAR'].map((c) => [`${c} · ${h.cur(c)}`, h.money(h.nisab('silver', c), c), h.money(h.nisab('gold', c), c), h.money(h.nisab('silver', c, 'pk'), c), h.money(h.nisab('gold', c, 'pk'), c)]);
      const k21 = h.nisabGrams('gold') * 24 / 21;
      return `
<h2>Where the two numbers come from</h2>
<p>The nisab is the smallest amount of wealth on which zakat is due. Its source is a hadith reported by al-Bukhari: no zakat is due on less than five awaq of silver (${h.src('bukhari-1447', 'Sahih al-Bukhari 1447')}). Five awaq make two hundred dirhams. For gold the threshold is twenty dinars. Neither coin exists any more, so councils and zakat bodies convert them into grams. The figure used by most of them is ${h.nisabGrams('gold')} g of gold: twenty dinars of 4.25 g each, the reading the ${h.src('jordan-nisab', 'General Iftaa Department of Jordan')} calls the view of most modern scholars. For silver the usual figure is ${h.nisabGrams('silver')} g, the weight the ${h.src('ppz-silver', 'Federal Territories zakat centre in Malaysia')} uses for two hundred dirhams.</p>
<p>Other weights exist and change the result. The same Jordanian fatwa reports that the Shafi‘i manual al-Fiqh al-Manhaji takes a heavier dinar and reaches 96 g of gold. Pakistan’s ${h.src('pk-ordinance', 'Zakat and Ushr Ordinance of 1980')} writes ${h.dec(h.nisabGrams('silver', 'pk'))} g of silver and ${h.dec(h.nisabGrams('gold', 'pk'))} g of gold, the metric form of the tola weights long used in South Asia; the calculator above lets you switch to them in its options.</p>
${h.mini('nisab', { t: 'Nisab in pounds sterling', p: ['cur'], d: { cur: 'GBP' } })}

<h2>Today’s nisab in eight currencies</h2>
<p>The table applies both sets of weights to the spot prices of ${h.priceDay}. Spot prices are those of pure metal traded in bulk: a jeweller pays less when buying your gold and asks more when selling it, which is why some zakat bodies quote a slightly different nisab on the same day.</p>
${h.table(['Currency', 'Silver 595 g', 'Gold 85 g', 'Silver 612.32 g', 'Gold 87.48 g'], rows, `Nisab at the spot prices of ${h.priceDay}.`, ['l', 'r', 'r', 'r', 'r'])}
<p>In pounds, the silver nisab is ${h.money(sG, 'GBP')} and the gold nisab ${h.money(gG, 'GBP')}. Someone with ${h.money(Math.round((sG + gG) / 2 / 100) * 100, 'GBP')} in a savings account is above one threshold and below the other: on the silver measure they owe zakat, on the gold measure they do not. That gap is the reason the choice matters more today than at any time before.</p>

<h2>Gold or silver: what the bodies do</h2>
<p>The question is not which metal is right; both thresholds are in the hadith. It is which one to apply to cash, shares and other wealth that is neither gold nor silver. Two lines of reasoning meet here. The first says the threshold that brings more people into paying is closer to the purpose of zakat, which is to reach the poor; that points to silver. The second says the gold measure is closer to what a modest household needs to hold before being counted as wealthy; that points to gold.</p>
<p>In practice, ${h.src('kuwait-calc', 'Kuwait Zakat House')} states the nisab of cash as the value of ${h.nisabGrams('gold')} g of 24 carat gold, and the ${h.src('ppz-savings', 'zakat centre of Kuala Lumpur')} does the same for savings. Pakistan’s statute deducts zakat at source from bank accounts above a silver-based nisab, notified each year: ${h.money(h.P.nisab.pk1447.pkr, 'PKR')} for the deduction of 1 Ramadan 1447 (${h.src('pk-nisab-1447', 'Administrator General Zakat')}). The calculator uses silver by default because it is the more cautious figure, and every page lets you switch.</p>

<h2>Which carat counts</h2>
<p>The 85 g are grams of gold, but jewellery is rarely pure. The Shafi‘i and Hanbali schools count the pure gold only, so 85 g of pure gold equal ${h.dec(k21, 2)} g of 21 carat jewellery; the Hanafi school, Dar al-Ifta of Egypt explains, takes the alloy as gold when gold is the larger part, and Egyptian practice sets the nisab at ${h.src('egypt-nisab', '85 g of 21 carat')}. This site follows the first reading: it converts every weight to its pure content before comparing. If your body follows the second, the gold calculator still gives the value of your pieces, and you can compare it with the nisab yourself.</p>
${h.mini('gold', { t: 'Is my jewellery above 85 g of pure gold?', p: ['g', 'k'], d: { g: 90, k: '21', cur: cur } })}

<h2>On which day the nisab is checked</h2>
<p>Zakat is due when wealth above the nisab has been held for a lunar year, the hawl. The schools differ on how strictly the year is watched. For the Hanafi school, what counts is being above the nisab at the start and at the end of the year; a dip in between does not reset the count, unless the wealth falls to nothing. For the Maliki, Shafi‘i and Hanbali schools, the wealth must not fall below the nisab during the year. Many households keep one zakat day each year, often in Ramadan, and compare what they own that day with the nisab of that day; the ${h.a('when-is-zakat-due', 'zakat date calculator')} gives the end of your lunar year.</p>
<p>Below the nisab, nothing is due on that wealth. Above it, the whole amount is subject to zakat, not the part above the threshold: the ${h.a('how-to-calculate-zakat', 'step by step page')} shows the sum on a worked example.</p>
`;
    },
  },
  ar: {
    slug: 'nisab', nav: 'نصاب الزكاة اليوم', card: 'نصاب الزكاة بالذهب والفضة بعملتك وبسعر اليوم.',
    title: 'نصاب الزكاة 2026: قيمته اليوم بالذهب والفضة وبعملتك',
    description: 'نصاب الزكاة 2026 بسعر الذهب والفضة اليوم بأربعين عملة: 85 غرامًا من الذهب و595 غرامًا من الفضة، أو 87.48 و612.32 غرامًا في باكستان، مع مصدر كل وزن معتمد.',
    h1: 'نصاب الزكاة اليوم بالذهب والفضة',
    intro: 'اختر عملتك: يُعاد حساب النصاب من السعر الفوري للذهب والفضة لهذا اليوم.',
    resume: `النصاب أقل قدر من المال تجب فيه الزكاة، وقيمته اليوم ${A.money(A.nisab('silver', 'SAR'), 'SAR')} بنصاب الفضة و${A.money(A.nisab('gold', 'SAR'), 'SAR')} بنصاب الذهب، بالأسعار الفورية بتاريخ ${A.priceDay}. والأوزان ثابتة: ${A.nisabGrams('silver')} غرامًا من الفضة، وهي المئتا درهم الواردة في الحديث، أو ${A.nisabGrams('gold')} غرامًا من الذهب، وهي عشرون دينارًا وزن كل منها 4.25 غرام. ويعتمد المرسوم الباكستاني لسنة 1980 ${A.dec(A.nisabGrams('silver', 'pk'), 2)} غرامًا من الفضة و${A.dec(A.nisabGrams('gold', 'pk'), 2)} غرامًا من الذهب. وإنما تتحرك القيمة بالمال مع سعر المعدنين، ولذلك تقرأ هذه الصفحة الأسعار كل يوم. ونصاب الذهب اليوم أعلى من نصاب الفضة بـ${A.dec(A.ratio(), 1)} مرة، فالمقياس الذي تختاره يحدد هل تجب الزكاة في المدخرات المتوسطة أصلًا. ويرجح كثير من العلماء الفضة في النقود، وتعتمد هيئتا الزكاة في كوالالمبور والكويت الذهب. فإن بلغ ما تملكه في يوم زكاتك النصاب الذي تختاره فالزكاة ${A.pct(A.P.rate.lunar)} من المبلغ كله لا من الزائد وحده.`,
    faqs: [
      { q: 'لماذا صار نصاب الذهب أعلى بكثير من نصاب الفضة؟', a: 'لأن المعدنين لم يحافظا على النسبة التي كانت بينهما في القرن الأول. كانت العشرون دينارًا والمئتا درهم متقاربة القيمة يومها، أما اليوم فغرام الذهب يعادل عشرات الغرامات من الفضة. والأوزان ثابتة بالنص، فيتباعد النصابان بتباعد السعرين في السوق، ويزداد الفرق كلما ارتفع الذهب.' },
      { q: 'بأي النصابين أحسب زكاة مدخراتي في البنك؟', a: 'اختلف العلماء. يرجح كثيرون نصاب الفضة في النقود لأنه يُدخل عددًا أكبر في الوجوب فيصل إلى الفقراء أكثر. ويعتمد مركز الزكاة في كوالالمبور وبيت الزكاة الكويتي نصاب الذهب في المدخرات. فاتبع ما تعمل به الجهة في بلدك، أو اسأل عالمًا تثق به في حالتك.' },
      { q: 'هل تتغير قيمة النصاب كل يوم؟', a: 'وزنه لا يتغير: 85 غرامًا من الذهب و595 غرامًا من الفضة في التقدير الشائع. أما قيمته بالمال فتتغير مع سعر المعدنين. وتقرأ هذه الصفحة الأسعار الفورية مرة في اليوم وتكتب تاريخها تحت النتيجة، فالمبلغ المعروض هو نصاب ذلك اليوم بعينه، ويتغير في اليوم التالي.' },
      { q: 'هل يُعتبر النصاب في يوم واحد أم طوال الحول؟', a: 'ينظر الحنفية إلى أول الحول وآخره: فإن كان المال فوق النصاب في الطرفين وجبت الزكاة ولو نقص في أثنائه. ويشترط المالكية والشافعية والحنابلة بقاءه فوق النصاب طوال الحول. وكثير من الناس يكتفون بالمقارنة في يوم زكاتهم من كل سنة هجرية، فيسهل عليهم الحساب.' },
    ],
    body: (h) => {
      const sS = h.nisab('silver', 'SAR'), gS = h.nisab('gold', 'SAR');
      const rows = ['SAR', 'AED', 'KWD', 'QAR', 'EGP', 'JOD', 'MAD', 'USD'].map((c) => [`${c} · ${h.cur(c)}`, h.money(h.nisab('silver', c), c), h.money(h.nisab('gold', c), c), h.money(h.nisab('silver', c, 'pk'), c), h.money(h.nisab('gold', c, 'pk'), c)]);
      const k21 = h.nisabGrams('gold') * 24 / 21;
      return `
<h2>من أين جاء الرقمان</h2>
<p>النصاب أقل قدر من المال تجب فيه الزكاة. وأصله حديث رواه البخاري: ليس فيما دون خمس أواق صدقة (${h.src('bukhari-1447', 'صحيح البخاري 1447')})، والأواقي الخمس مئتا درهم من الفضة، ونصاب الذهب عشرون دينارًا. ولم يعد الدينار ولا الدرهم متداولين، فحوّلتهما المجامع وهيئات الزكاة إلى غرامات. والرقم الذي تعتمده أكثرها ${h.nisabGrams('gold')} غرامًا من الذهب، أي عشرون دينارًا وزن كل منها 4.25 غرام، وهو قول أكثر العلماء المعاصرين كما تذكر ${h.src('jordan-nisab', 'دائرة الإفتاء العام الأردنية')}. وفي الفضة ${h.nisabGrams('silver')} غرامًا، وهو الوزن الذي يعتمده ${h.src('ppz-silver', 'مركز الزكاة في الأقاليم الاتحادية بماليزيا')} للمئتي درهم.</p>
<p>وثمة أوزان أخرى تغيّر النتيجة. فالفتوى الأردنية نفسها تذكر أن كتاب الفقه المنهجي الشافعي يأخذ بدينار أثقل فيبلغ النصاب عنده 96 غرامًا من الذهب. وينص ${h.src('pk-ordinance', 'مرسوم الزكاة والعشر الباكستاني لسنة 1980')} على ${h.dec(h.nisabGrams('silver', 'pk'), 2)} غرامًا من الفضة و${h.dec(h.nisabGrams('gold', 'pk'), 2)} غرامًا من الذهب، وهي الصيغة المترية لأوزان التولة المعروفة في جنوب آسيا، والحاسبة أعلاه تتيحها في خياراتها.</p>
${h.mini('nisab', { t: 'النصاب بالدرهم الإماراتي', p: ['cur'], d: { cur: 'AED' } })}

<h2>نصاب اليوم بثماني عملات</h2>
<p>يطبق الجدول مجموعتي الأوزان على الأسعار الفورية بتاريخ ${h.priceDay}. والسعر الفوري سعر المعدن الخالص في تجارة الجملة: الصائغ يشتري ذهبك بأقل منه ويبيعه بأكثر، ولذلك قد تعلن بعض هيئات الزكاة نصابًا مختلفًا قليلًا في اليوم نفسه.</p>
${h.table(['العملة', 'فضة 595 غ', 'ذهب 85 غ', 'فضة 612.32 غ', 'ذهب 87.48 غ'], rows, `النصاب بالأسعار الفورية بتاريخ ${h.priceDay}.`, ['l', 'r', 'r', 'r', 'r'])}
<p>وبالريال السعودي يبلغ نصاب الفضة ${h.money(sS, 'SAR')} ونصاب الذهب ${h.money(gS, 'SAR')}. فمن ادخر ${h.money(Math.round((sS + gS) / 2 / 1000) * 1000, 'SAR')} يكون فوق أحد النصابين ودون الآخر: تجب عليه الزكاة بنصاب الفضة ولا تجب بنصاب الذهب. وهذا الفارق هو ما يجعل الاختيار اليوم أهم مما كان في أي وقت مضى.</p>

<h2>الذهب أم الفضة: ماذا تفعل الهيئات</h2>
<p>ليست المسألة أي المعدنين أصح، فكلاهما ثابت في الحديث، وإنما أيهما يُطبق على النقد والأسهم وسائر الأموال التي ليست ذهبًا ولا فضة. وهنا يلتقي نظران: الأول يرى أن النصاب الذي يُدخل عددًا أكبر في الوجوب أقرب إلى مقصد الزكاة، وهو إيصالها إلى الفقراء، فيرجح الفضة. والثاني يرى أن نصاب الذهب أقرب إلى ما تحتاج الأسرة المتوسطة إلى امتلاكه قبل أن تُعد غنية، فيرجح الذهب.</p>
<p>وفي التطبيق يعلن ${h.src('kuwait-calc', 'بيت الزكاة الكويتي')} نصاب النقد بقيمة ${h.nisabGrams('gold')} غرامًا من الذهب عيار 24، ويفعل ${h.src('ppz-savings', 'مركز الزكاة في كوالالمبور')} مثله في المدخرات. أما باكستان فيقتطع قانونها الزكاة من الحسابات البنكية التي تتجاوز نصابًا مبنيًا على الفضة يُعلن كل عام، وقد بلغ ${h.money(h.P.nisab.pk1447.pkr, 'PKR')} لاقتطاع أول رمضان 1447 (${h.src('pk-nisab-1447', 'المدير العام للزكاة')}). وتعتمد الحاسبة الفضة افتراضيًا لأنها الأحوط، وكل صفحة تتيح لك التبديل.</p>

<h2>أي عيار يُحتسب</h2>
<p>الغرامات الخمسة والثمانون غرامات ذهب، والحلي قلما يكون خالصًا. فالشافعية والحنابلة يعتبرون الذهب الخالص وحده، فتعادل 85 غرامًا من الذهب الخالص ${h.dec(k21, 2)} غرامًا من الحلي عيار 21. أما الحنفية، كما تشرح دار الإفتاء المصرية، فيعدّون المخلوط ذهبًا إذا غلب فيه الذهب، والعمل في مصر على ${h.src('egypt-nisab', '85 غرامًا من عيار 21')}. ويتبع هذا الموقع القول الأول فيحوّل كل وزن إلى قدره الخالص قبل المقارنة. فإن كانت الجهة في بلدك تتبع القول الثاني فحاسبة الذهب تعطيك قيمة قطعك وتستطيع مقارنتها بالنصاب بنفسك.</p>
${h.mini('gold', { t: 'هل يبلغ ذهبي 85 غرامًا خالصة؟', p: ['g', 'k'], d: { g: 110, k: '18', cur: 'SAR' } })}

<h2>في أي يوم يُعتبر النصاب</h2>
<p>تجب الزكاة إذا بقي المال فوق النصاب حولًا هجريًا. ويختلف المذهب في مراقبة الحول: فعند الحنفية العبرة ببلوغ النصاب في أول الحول وآخره، ولا يقطع الحولَ نقصٌ في أثنائه ما لم يهلك المال كله. وعند المالكية والشافعية والحنابلة يُشترط ألا ينزل المال عن النصاب في أثناء الحول. وكثير من الأسر تتخذ يومًا للزكاة كل عام، كثيرًا ما يكون في رمضان، وتقارن ما تملكه فيه بنصاب ذلك اليوم، و${h.a('when-is-zakat-due', 'حاسبة موعد الزكاة')} تعطيك نهاية حولك الهجري.</p>
<p>وما دون النصاب لا زكاة فيه، وما بلغه تجب الزكاة فيه كله لا في الزائد عليه وحده.</p>
`;
    },
  },
});
