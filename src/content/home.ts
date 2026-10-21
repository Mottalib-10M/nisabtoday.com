/**
 * Home pages (/en/, /ar/). Every figure comes from the kit (h.*): metal prices of the day, nisab, dates, published
 * fitr amounts. The text is written so that it stays true whatever the price of gold does.
 */
import type { Helpers, FAQ } from '../lib/page-types';
import type { Lang } from '../lib/format';

export interface HomeText {
  title: string; description: string; h1: string; intro: string; trust: string; resume: string;
  boardTitle: string; boardIntro: (h: Helpers) => string;
  datesTitle: string;
  faqs: FAQ[];
  body: (h: Helpers) => string;
  pagesTitle: string;
  sources: string[];
}

const BOARD = ['USD', 'GBP', 'EUR', 'CAD', 'AUD', 'PKR', 'INR', 'BDT', 'MYR', 'IDR', 'SAR', 'AED', 'QAR', 'KWD', 'EGP', 'MAD', 'TRY', 'NGN', 'ZAR', 'SGD'];
export const boardRows = (h: Helpers) => BOARD.filter((c) => h.MARKET.fx[c]).map((c) => [`${c} · ${h.cur(c)}`, h.money(h.nisab('silver', c), c), h.money(h.nisab('gold', c), c), h.money2(Math.round(h.gram('gold', c) * 100) / 100, c)]);

const sources = ['quran-9-60', 'bukhari-1447', 'jordan-nisab', 'egypt-nisab', 'ppz-nisab', 'pk-ordinance', 'iifa-shares', 'iifa-pension', 'egypt-jewel', 'zatca-reg', 'gold-api', 'ecb', 'erapi'];

const en: HomeText = {
  title: 'Zakat Calculator 2026: Today’s Nisab in Gold and Silver',
  description: 'Zakat calculator 2026 with the nisab of the day in 40 currencies, gold, savings, shares and pension, both results where the schools differ. No sign-up, free.',
  h1: 'Zakat calculator with today’s nisab',
  intro: 'Enter what you own on your zakat day. The calculator counts it against the nisab of the day, in your currency, and shows both results where the schools of law differ.',
  trust: 'No account, no e-mail, no donation asked',
  resume: '', // filled below, needs the kit
  boardTitle: 'Nisab today in 20 currencies',
  boardIntro: (h) => `Spot prices of ${h.priceDay}: ${h.money2(Math.round(h.gram('gold', 'USD') * 100) / 100, 'USD')} for one gram of pure gold and ${h.money2(Math.round(h.gram('silver', 'USD') * 100) / 100, 'USD')} for one gram of fine silver. The nisab is ${h.nisabGrams('silver')} g of silver or ${h.nisabGrams('gold')} g of gold. The calculator above covers ${Object.keys(h.MARKET.fx).length} currencies.`,
  datesTitle: 'Dates of the coming lunar year',
  pagesTitle: 'Every calculator, by subject',
  sources,
  faqs: [
    { q: 'Is the nisab measured in gold or in silver?', a: 'Both measures come from the hadith: twenty dinars of gold or two hundred dirhams of silver. Many scholars prefer silver for cash because it lets more wealth reach the poor, while the zakat bodies of Kuala Lumpur and Kuwait use gold for savings. The calculator shows the two thresholds and lets you choose.' },
    { q: 'Do I pay zakat on the gold jewellery I wear?', a: 'The Hanafi school says yes, once your gold reaches the nisab. The Maliki, Shafi’i and Hanbali schools exempt jewellery kept for normal personal use, as Dar al-Ifta of Egypt explains in its fatwa 22484. The calculator lets you count it or leave it out.' },
    { q: 'What rate do I use if I pay on a solar year?', a: 'Zakat is 2.5 % of wealth held for a lunar year of about 354 days. If you count on a solar year of 365 days, the Saudi zakat authority prorates the rate by days, which gives about 2.578 %. The calculator offers both years.' },
    { q: 'Does this site collect or pass on my zakat?', a: 'No. It is an independent calculator. It does not collect money, does not point to any charity and does not ask for your name or e-mail. Every calculation runs in your browser; you choose yourself where to pay, and you can ask a scholar you trust about your own case.' },
    { q: 'How often are the gold and silver prices updated?', a: 'Once a day, from the spot prices published by gold-api.com, with exchange rates from the European Central Bank and ExchangeRate-API. The date of the prices is written under every result, so you always know which day the nisab was computed on and can check it.' },
    { q: 'Can I enter my figures in one currency and pay in another?', a: 'Yes. Choose the currency you hold most of your wealth in, enter every amount in it, and the nisab of the day is converted into that currency before the comparison. If you hold money in several currencies, convert the smaller ones at the day’s rate before entering them. The amount due can then be paid in any currency at the rate of the day you pay.' },
  ],
  body: (h) => {
    const s = h.nisab('silver', 'USD'), g = h.nisab('gold', 'USD');
    const r = h.ratio();
    const z = h.zakat({ cur: 'USD', cash: 12000, basis: 'silver' });
    const zg = h.zakat({ cur: 'USD', cash: 12000, basis: 'gold' });
    const jw = h.zakat({ cur: 'GBP', cash: 9000, jewelG: 60, jewelK: 22, jewelRule: 'include', basis: 'silver' });
    const jx = h.zakat({ cur: 'GBP', cash: 9000, jewelG: 60, jewelK: 22, jewelRule: 'exclude', basis: 'silver' });
    const hw = h.hawl(h.PRICE_DAY);
    const fitrRows = h.FITR.filter((x) => x.fitr !== undefined).slice(0, 10).map((x) => [x.country.en, x.body.en, h.money2(x.fitr!, x.cur), h.day(x.date)]);
    return `
<h2>What the calculator counts</h2>
<p>Zakat is due on wealth that can grow and that you have owned for a full lunar year, once it reaches the nisab. The calculator asks for each kind of wealth separately, because the rules are not the same for all of them: cash and bank balances, gold and silver, shares and funds, a pension you could withdraw, business stock and money owed to you. Your home, your car, your furniture and the tools of your work are never counted, whatever their value.</p>
<p>Debts that fall due now are taken off before the comparison with the nisab, on the view of the Hanafi, Maliki and Hanbali schools and the older view of al-Shafi‘i. The newer Shafi‘i view does not deduct them; Islamweb sets out both in its ${h.src('islamweb-debts', 'fatwa 47139')}. The calculator deducts by default and lets you switch the rule off in the extra options. The field asks for debts due now, such as bills and the instalments of the coming months, and not for the whole balance of a mortgage that runs for twenty years.</p>
<p>Then the total is compared with the nisab of the day. Below it, nothing is due. Above it, the whole amount is subject to zakat at ${h.pct(h.P.rate.lunar)}, one fortieth, and not only the part above the nisab. That is the point people miss most often: someone with ${h.money(z.net, 'USD')} in savings does not pay on the surplus over ${h.money(s, 'USD')}, but ${h.money(z.zakat, 'USD')} on the whole ${h.money(z.net, 'USD')}.</p>

<h2>Gold or silver: the choice that changes the result</h2>
<p>The nisab comes from the hadith reported by al-Bukhari: no zakat is due on less than five awaq of silver (${h.src('bukhari-1447', 'Sahih al-Bukhari 1447')}), that is two hundred dirhams; for gold the threshold is twenty dinars. Converted to grams, the figures most bodies use are ${h.nisabGrams('gold')} g of gold, twenty dinars of 4.25 g as the ${h.src('jordan-nisab', 'Jordanian Iftaa Department')} explains, and ${h.nisabGrams('silver')} g of silver, used by the ${h.src('ppz-silver', 'Federal Territories zakat centre in Malaysia')}. Pakistan’s ${h.src('pk-ordinance', 'Zakat and Ushr Ordinance of 1980')} writes ${h.dec(h.nisabGrams('silver', 'pk'))} g of silver and ${h.dec(h.nisabGrams('gold', 'pk'))} g of gold; the calculator offers these weights too.</p>
<p>In the Prophet’s time the two thresholds were worth about the same. Today they are far apart: at the prices of ${h.priceDay}, the gold nisab is ${h.money(g, 'USD')} and the silver nisab ${h.money(s, 'USD')}, so gold is ${h.dec(r, 1)} times higher. With ${h.money(12000, 'USD')} in savings you owe ${h.money(z.zakat, 'USD')} on the silver measure and ${zg.zakat > 0 ? h.money(zg.zakat, 'USD') : 'nothing'} on the gold one. Many scholars recommend the silver nisab for cash because it lets more wealth reach the poor; the zakat centre of Kuala Lumpur, Kuwait Zakat House and Egypt’s Dar al-Ifta use gold for savings. Choose the measure followed where you live, or ask a scholar you trust.</p>
<p>Gold bodies also differ on the carat. Kuwait Zakat House values ${h.nisabGrams('gold')} g of 24 carat gold, Dar al-Ifta of Egypt ${h.src('egypt-nisab', '85 g of 21 carat')}, and Indonesia’s BAZNAS 85 g of 14 carat for income zakat. The calculator uses pure gold, the reading of the Shafi‘i and Hanbali schools that Dar al-Ifta reports, and lets you enter jewellery in its own carat.</p>

<h2>Where scholars differ, you see both results</h2>
<p>Four questions change the amount more than any other, and the calculator shows each answer with its source rather than choosing for you.</p>
<p><strong>Gold jewellery you wear.</strong> The Hanafi school counts it; the Maliki, Shafi‘i and Hanbali schools exempt jewellery kept for normal personal use, as ${h.src('egypt-jewel', 'Dar al-Ifta of Egypt')} sets out. With ${h.money(9000, 'GBP')} in savings and 60 g of 22 carat jewellery, the zakat is ${h.money(jw.zakat, 'GBP')} when the jewellery counts and ${h.money(jx.zakat, 'GBP')} when it does not. Singapore’s MUIS and the Kuala Lumpur zakat centre exempt worn jewellery up to a customary weight, 860 g and 800 g.</p>
<p><strong>Pensions.</strong> The International Islamic Fiqh Academy holds that a fund you cannot control is not fully owned, so zakat is paid once, for one year, when you receive it; a fund in your name whose investments you choose is counted every year (${h.src('iifa-pension', 'resolution 143')}). Another view counts each year what you could take out today after the penalty and tax. The pension calculator does both.</p>
<p><strong>Shares.</strong> Shares bought to resell are counted at their market value. Shares kept for dividends are counted, under ${h.src('iifa-shares', 'resolution 28')} of the Academy, on the zakatable assets of the company, cash, receivables and stock, when you can find them; Dar al-Ifta and the Malaysian centre simply take the market value.</p>
<p><strong>Debts.</strong> Deducted by most schools, not by the newer Shafi‘i view, as above.</p>

<h2>When your zakat falls due</h2>
<p>Zakat is due once your wealth has stayed above the nisab for a full lunar year, the hawl. A lunar year is ${hw.days} days long this time: if your year starts on ${h.day(h.PRICE_DAY)}, ${h.hijri(h.PRICE_DAY)}, it ends on ${h.day(hw.end)}, ${h.hijri(hw.end)}. Many people pay in Ramadan; Ramadan 1448 begins on ${h.day(h.ramadan1448)} and Eid al-Fitr falls on ${h.day(h.shawwal1448)} in the Umm al-Qura calendar, a day earlier or later where the month starts by sighting the moon.</p>
<p>If you keep your accounts on the solar year, the rate rises with the extra days. The Saudi zakat authority writes the rule in its ${h.src('zatca-reg', 'implementing regulations')}: 2.5 % divided by the days of the Hijri year, times the days of your year, which gives ${h.pct(h.P.rate.solar, 3)} for 365 days.</p>

<h2>Zakat al-fitr, fidya and kaffarah</h2>
<p>Zakat al-fitr is one sa‘ of staple food for each member of the household, paid before the Eid prayer (${h.src('bukhari-1503', 'Sahih al-Bukhari 1503')}). Councils and zakat bodies publish its cash value each year before Ramadan. The amounts for Ramadan 1447, in 2026, were:</p>
${h.table(['Country', 'Published by', 'Per person', 'Published on'], fitrRows, 'Zakat al-fitr for Ramadan 1447 (2026). The amounts for 1448 (2027) are to be published before Ramadan.', ['l', 'l', 'r', 'r'])}
<p>Fidya is the meal for one poor person for each day of fasting that someone cannot make up, because of old age or a lasting illness (${h.src('quran-2-184', 'Qur’an 2:184')}). Kaffarah is the expiation for breaking a fast deliberately, sixty poor people fed when two months of fasting are beyond you, or for a broken oath, ten poor people (${h.src('quran-5-89', 'Qur’an 5:89')}). The UAE Fatwa Council, MUIS, BAZNAS, Pakistan’s Council of Islamic Ideology, Jordan’s Iftaa Council and the Fiqh Council of North America published a cash value for 1447; the calculators use them and say which body set each one.</p>

<h2>Islamic inheritance</h2>
<p>The inheritance calculator applies the shares of the Qur’an (${h.src('quran-4-11', '4:11')}, ${h.src('quran-4-12', '4:12')} and ${h.src('quran-4-176', '4:176')}): the half, quarter, eighth, two thirds, third and sixth, then the remainder to the residuary heirs, the son taking twice the daughter. When the fixed shares add up to more than the estate, each is reduced in proportion (‘awl); when something is left and there is no residuary heir, it goes back to the heirs other than the spouse (radd). The well known cases, al-minbariyya, the two ‘umariyya cases and al-mushtaraka, are tested against the published answers before every update.</p>

<h2>What this site does and does not do</h2>
<p>It applies rules that fiqh councils and official zakat bodies have published, with the price of gold and silver of the day, and it cites the source of each rule on the page that uses it. It is not a religious authority, a zakat body or a charity. It does not collect zakat, does not recommend where to pay it and asks for no name, e-mail or account; nothing you type leaves your browser. Where scholars differ it shows both results, and for a case of your own, an unusual asset or a large estate, ask a scholar you trust.</p>
`;
  },
};
en.resume = '';

const ar: HomeText = {
  title: 'حاسبة الزكاة 2026: نصاب اليوم بالذهب والفضة وبعملتك',
  description: 'حاسبة الزكاة 2026 بنصاب اليوم بأربعين عملة: النقد والذهب والأسهم والتقاعد، مع النتيجتين حيث اختلفت المذاهب. بلا تسجيل ولا بريد ولا طلب تبرع، ومجانًا تمامًا.',
  h1: 'حاسبة الزكاة بنصاب اليوم',
  intro: 'أدخل ما تملكه في يوم زكاتك. تقارنه الحاسبة بنصاب اليوم بعملتك، وتعرض النتيجتين حيث اختلفت المذاهب الفقهية.',
  trust: 'بلا حساب ولا بريد إلكتروني ولا طلب تبرع',
  resume: '',
  boardTitle: 'نصاب اليوم بعشرين عملة',
  boardIntro: (h) => `الأسعار الفورية بتاريخ ${h.priceDay}: ${h.money2(Math.round(h.gram('gold', 'USD') * 100) / 100, 'USD')} لغرام الذهب الخالص و${h.money2(Math.round(h.gram('silver', 'USD') * 100) / 100, 'USD')} لغرام الفضة الخالصة. النصاب ${h.nisabGrams('silver')} غرامًا من الفضة أو ${h.nisabGrams('gold')} غرامًا من الذهب. تغطي الحاسبة أعلاه ${Object.keys(h.MARKET.fx).length} عملة.`,
  datesTitle: 'مواعيد السنة الهجرية المقبلة',
  pagesTitle: 'كل الحاسبات حسب الموضوع',
  sources,
  faqs: [
    { q: 'هل يُحسب النصاب بالذهب أم بالفضة؟', a: 'كلا التقديرين ثابت في الحديث: عشرون دينارًا من الذهب أو مئتا درهم من الفضة. يختار كثير من العلماء الفضة في النقود لأنها أنفع للفقراء، بينما تعتمد ماليزيا والكويت الذهب في المدخرات. تعرض الحاسبة النصابين وتترك لك الاختيار بحسب ما يُعمل به في بلدك.' },
    { q: 'هل تجب الزكاة في الحلي الذي ألبسه؟', a: 'عند الحنفية نعم إذا بلغ الذهب نصابًا. وعند المالكية والشافعية والحنابلة لا زكاة في الحلي المعدّ للاستعمال المباح، كما تبيّن دار الإفتاء المصرية في الفتوى 22484. تتيح لك الحاسبة احتسابه أو تركه، وتعرض الفرق بين القولين بالمبلغ لتعرف أثر كل قول على زكاتك.' },
    { q: 'ما النسبة إذا كنت أحسب زكاتي بالسنة الميلادية؟', a: 'الزكاة ربع العشر، أي 2.5 % من المال الذي حال عليه حول هجري يقارب 354 يومًا. ومن يحسب بالسنة الميلادية فإن هيئة الزكاة السعودية تقسم النسبة على أيام السنة الهجرية وتضربها في أيام سنته، فتبلغ نحو 2.578 %. والحاسبة تعرض السنتين لتختار ما يوافق حساباتك.' },
    { q: 'هل يجمع هذا الموقع زكاتي أو يوصلها إلى جهة؟', a: 'لا. هو حاسبة مستقلة لا تجمع مالًا ولا تحيل إلى أي جمعية ولا تطلب اسمك أو بريدك. كل الحساب يجري في متصفحك، وأنت من يختار أين يدفع، ويمكنك أن تسأل عالمًا تثق به عن حالتك الخاصة قبل الإخراج، فالموقع يحسب ولا يفتي.' },
    { q: 'كم مرة تُحدَّث أسعار الذهب والفضة؟', a: 'مرة في اليوم من الأسعار الفورية التي ينشرها موقع gold-api.com، مع أسعار الصرف من البنك المركزي الأوروبي وExchangeRate-API. ويُكتب تاريخ الأسعار تحت كل نتيجة، فتعرف دائمًا في أي يوم حُسب النصاب الذي تقارن به مالك، وتستطيع أن تعيد الحساب في يوم زكاتك.' },
    { q: 'هل أستطيع إدخال أموالي بعملة وإخراج الزكاة بعملة أخرى؟', a: 'نعم. اختر العملة التي يغلب فيها مالك وأدخل كل المبالغ بها، فتحوّل الحاسبة نصاب اليوم إلى تلك العملة قبل المقارنة. وإن كان لك مال بعملات متعددة فحوّل الصغيرة منها بسعر اليوم ثم أدخلها. ويجوز بعد ذلك إخراج المبلغ الواجب بأي عملة بسعر صرف يوم الإخراج.' },
  ],
  body: (h) => {
    const s = h.nisab('silver', 'SAR'), g = h.nisab('gold', 'SAR');
    const r = h.ratio();
    const z = h.zakat({ cur: 'SAR', cash: 45000, basis: 'silver' });
    const zg = h.zakat({ cur: 'SAR', cash: 45000, basis: 'gold' });
    const jw = h.zakat({ cur: 'SAR', cash: 30000, jewelG: 60, jewelK: 21, jewelRule: 'include', basis: 'silver' });
    const jx = h.zakat({ cur: 'SAR', cash: 30000, jewelG: 60, jewelK: 21, jewelRule: 'exclude', basis: 'silver' });
    const hw = h.hawl(h.PRICE_DAY);
    const fitrRows = h.FITR.filter((x) => x.fitr !== undefined).slice(0, 10).map((x) => [x.country.ar, x.body.ar, h.money2(x.fitr!, x.cur), h.day(x.date)]);
    return `
<h2>ما الذي تحسبه الحاسبة</h2>
<p>تجب الزكاة في المال النامي الذي ملكته حولًا كاملًا إذا بلغ النصاب. وتسألك الحاسبة عن كل نوع من المال على حدة، لأن أحكامها ليست واحدة: النقد وأرصدة الحسابات، والذهب والفضة، والأسهم والصناديق، والتقاعد الذي يمكنك سحبه، وعروض التجارة، والديون المرجوة لك. أما المسكن والسيارة والأثاث وأدوات العمل فلا تُحتسب مهما بلغت قيمتها.</p>
<p>وتُخصم الديون الحالّة قبل المقارنة بالنصاب على قول الحنفية والمالكية والحنابلة والقول القديم للشافعي، ولا تُخصم على القول الجديد للشافعي، كما يعرض القولين موقع إسلام ويب في ${h.src('islamweb-debts', 'الفتوى 47139')}. تخصمها الحاسبة افتراضيًا ويمكنك إلغاء الخصم في الخيارات الإضافية. ويسألك الحقل عن الديون الحالّة الآن، كالفواتير وأقساط الأشهر المقبلة، لا عن كامل رصيد قرض عقاري يمتد عشرين سنة.</p>
<p>ثم يُقارن المجموع بنصاب اليوم. فإن كان دونه فلا زكاة، وإن بلغه وجبت الزكاة في المال كله بنسبة ${h.pct(h.P.rate.lunar)}، أي ربع العشر، لا في الزائد على النصاب وحده. وهذا أكثر ما يُغفل عنه: من ادخر ${h.money(z.net, 'SAR')} لا يزكي ما زاد على ${h.money(s, 'SAR')}، بل يخرج ${h.money(z.zakat, 'SAR')} عن المبلغ كله.</p>

<h2>الذهب أم الفضة: اختيار يغيّر النتيجة</h2>
<p>أصل النصاب حديث البخاري: ليس فيما دون خمس أواق صدقة (${h.src('bukhari-1447', 'صحيح البخاري 1447')})، والأواقي الخمس مئتا درهم من الفضة، ونصاب الذهب عشرون دينارًا. وبالغرامات تعتمد أكثر الهيئات ${h.nisabGrams('gold')} غرامًا من الذهب، أي عشرين دينارًا وزن كل منها 4.25 غرام كما تشرح ${h.src('jordan-nisab', 'دائرة الإفتاء الأردنية')}، و${h.nisabGrams('silver')} غرامًا من الفضة كما يعتمد ${h.src('ppz-silver', 'مركز الزكاة في الأقاليم الاتحادية بماليزيا')}. أما ${h.src('pk-ordinance', 'مرسوم الزكاة والعشر الباكستاني لسنة 1980')} فينص على ${h.dec(h.nisabGrams('silver', 'pk'), 2)} غرامًا من الفضة و${h.dec(h.nisabGrams('gold', 'pk'), 2)} غرامًا من الذهب، والحاسبة تتيح هذه الأوزان أيضًا.</p>
<p>كان النصابان متقاربين في عهد النبي صلى الله عليه وسلم، أما اليوم فبينهما فرق كبير: بأسعار ${h.priceDay} يبلغ نصاب الذهب ${h.money(g, 'SAR')} ونصاب الفضة ${h.money(s, 'SAR')}، فالذهب أعلى بـ${h.dec(r, 1)} مرة. فمن ادخر ${h.money(45000, 'SAR')} يخرج ${h.money(z.zakat, 'SAR')} بنصاب الفضة، و${zg.zakat > 0 ? h.money(zg.zakat, 'SAR') : 'لا شيء'} بنصاب الذهب. ويوصي كثير من العلماء بنصاب الفضة في النقود لأنه أنفع للفقراء، بينما يعتمد مركز الزكاة في كوالالمبور وبيت الزكاة الكويتي ودار الإفتاء المصرية الذهب في المدخرات. فاختر ما يُعمل به في بلدك، أو اسأل عالمًا تثق به.</p>
<p>وتختلف الهيئات أيضًا في العيار: يقدّر بيت الزكاة الكويتي ${h.nisabGrams('gold')} غرامًا من الذهب عيار 24، ودار الإفتاء المصرية ${h.src('egypt-nisab', '85 غرامًا من عيار 21')}، والهيئة الوطنية للزكاة في إندونيسيا 85 غرامًا من عيار 14 في زكاة الدخل. وتعتمد الحاسبة الذهب الخالص، وهو قول الشافعية والحنابلة الذي تنقله دار الإفتاء، وتتيح لك إدخال الحلي بعياره.</p>

<h2>حيث اختلف العلماء ترى النتيجتين</h2>
<p>أربع مسائل تغيّر المبلغ أكثر من غيرها، والحاسبة تعرض كل جواب مع مصدره ولا تختار عنك.</p>
<p><strong>الحلي الملبوس.</strong> تجب فيه الزكاة عند الحنفية، ولا تجب في الحلي المعدّ للاستعمال المباح عند المالكية والشافعية والحنابلة، كما تبيّن ${h.src('egypt-jewel', 'دار الإفتاء المصرية')}. فمن ادخر ${h.money(30000, 'SAR')} ولبس 60 غرامًا من الذهب عيار 21 تبلغ زكاته ${h.money(jw.zakat, 'SAR')} إن احتُسب الحلي، و${h.money(jx.zakat, 'SAR')} إن لم يُحتسب. ويعفي المجلس الإسلامي في سنغافورة ومركز الزكاة في كوالالمبور الحلي الملبوس إلى وزن معتاد، 860 غرامًا و800 غرام.</p>
<p><strong>التقاعد.</strong> يرى مجمع الفقه الإسلامي الدولي أن الصندوق الذي لا تملك التصرف فيه غير مملوك ملكًا تامًا، فيزكى مرة واحدة عن سنة عند قبضه، وأن الصندوق المسجل باسمك الذي تختار استثماراته يزكى كل عام (${h.src('iifa-pension', 'القرار 143')}). وفي قول آخر يُزكى كل عام ما يمكن سحبه اليوم بعد الغرامة والضريبة. وحاسبة التقاعد تحسب القولين.</p>
<p><strong>الأسهم.</strong> ما اشتُري للمتاجرة يزكى بقيمته السوقية. وما اقتُني للأرباح يزكى بحسب ${h.src('iifa-shares', 'القرار 28')} للمجمع على الأصول الزكوية للشركة من نقد وذمم ومخزون إن أمكن معرفتها، بينما تأخذ دار الإفتاء المصرية ومركز الزكاة الماليزي القيمة السوقية مباشرة.</p>
<p><strong>الديون.</strong> تُخصم عند أكثر المذاهب، ولا تُخصم على القول الجديد للشافعي، كما سبق.</p>

<h2>متى تجب زكاتك</h2>
<p>تجب الزكاة إذا بقي مالك فوق النصاب حولًا هجريًا كاملًا. ومدة الحول هذه المرة ${hw.days} يومًا: فإن بدأ حولك في ${h.day(h.PRICE_DAY)}، الموافق ${h.hijri(h.PRICE_DAY)}، انتهى في ${h.day(hw.end)}، الموافق ${h.hijri(hw.end)}. ويخرج كثيرون زكاتهم في رمضان، ويبدأ رمضان 1448 في ${h.day(h.ramadan1448)} ويوافق عيد الفطر ${h.day(h.shawwal1448)} بتقويم أم القرى، وقد يتقدم يومًا أو يتأخر حيث يبدأ الشهر برؤية الهلال.</p>
<p>ومن يمسك حساباته بالسنة الميلادية ترتفع نسبته بالأيام الزائدة. وقد نصت هيئة الزكاة والضريبة والجمارك على القاعدة في ${h.src('zatca-reg', 'اللائحة التنفيذية لجباية الزكاة')}: 2.5 % مقسومة على أيام السنة الهجرية ومضروبة في أيام سنتك، فتبلغ ${h.pct(h.P.rate.solar, 3)} عن 365 يومًا.</p>

<h2>زكاة الفطر والفدية والكفارة</h2>
<p>زكاة الفطر صاع من غالب قوت البلد عن كل فرد من الأسرة، تُخرج قبل صلاة العيد (${h.src('bukhari-1503', 'صحيح البخاري 1503')}). وتعلن المجالس وهيئات الزكاة قيمتها النقدية كل عام قبل رمضان. وكانت مبالغ رمضان 1447، أي 2026، كما يلي:</p>
${h.table(['البلد', 'الجهة', 'عن الفرد', 'تاريخ الإعلان'], fitrRows, 'زكاة الفطر لرمضان 1447 (2026). مبالغ 1448 (2027) لم تُعلن بعد وتصدر قبل رمضان.', ['l', 'l', 'r', 'r'])}
<p>والفدية إطعام مسكين عن كل يوم لا يستطيع صاحبه قضاءه لكبر أو مرض لا يرجى برؤه (${h.src('quran-2-184', 'البقرة 184')}). والكفارة عن إفساد الصوم عمدًا إطعام ستين مسكينًا لمن عجز عن صيام شهرين متتابعين، وعن اليمين إطعام عشرة مساكين (${h.src('quran-5-89', 'المائدة 89')}). وقد أعلن مجلس الإمارات للإفتاء الشرعي والمجلس الإسلامي في سنغافورة والهيئة الوطنية للزكاة في إندونيسيا ومجلس الفكر الإسلامي في باكستان ومجلس الإفتاء الأردني والمجلس الفقهي لأمريكا الشمالية قيمة نقدية لعام 1447، وتعتمدها الحاسبات مع ذكر الجهة التي حددت كل مبلغ.</p>

<h2>المواريث</h2>
<p>تطبق حاسبة المواريث فروض القرآن الكريم (${h.src('quran-4-11', 'النساء 11')} و${h.src('quran-4-12', '12')} و${h.src('quran-4-176', '176')}): النصف والربع والثمن والثلثان والثلث والسدس، ثم الباقي للعصبة، للذكر مثل حظ الأنثيين. فإذا زادت الفروض على التركة نقص كل فرض بنسبته، وهو العَول؛ وإذا بقي شيء ولا عاصب رُدّ على أصحاب الفروض عدا الزوجين، وهو الرد. والمسائل المشهورة، المنبرية والعمريتان والمشتركة، تُختبر على أجوبتها المنشورة قبل كل تحديث.</p>

<h2>ما يفعله هذا الموقع وما لا يفعله</h2>
<p>يطبق الأحكام التي نشرتها المجامع الفقهية وهيئات الزكاة الرسمية بسعر الذهب والفضة لليوم، ويذكر مصدر كل حكم في الصفحة التي تستعمله. وليس جهة دينية ولا هيئة زكاة ولا جمعية خيرية. لا يجمع الزكاة ولا يوصي بجهة لدفعها، ولا يطلب اسمًا ولا بريدًا ولا حسابًا، ولا يغادر شيء مما تكتبه متصفحك. وحيث اختلف العلماء يعرض النتيجتين، ولحالتك الخاصة أو لمال غير معتاد أو تركة كبيرة اسأل عالمًا تثق به.</p>
`;
  },
};

/** The citable paragraph (§21), built with the figures of the day. */
export function homeResume(lang: Lang, h: Helpers): string {
  const s = h.nisab('silver', lang === 'ar' ? 'SAR' : 'USD'), g = h.nisab('gold', lang === 'ar' ? 'SAR' : 'USD');
  const c = lang === 'ar' ? 'SAR' : 'USD';
  if (lang === 'ar') return `الزكاة ربع العشر، أي ${h.pct(h.P.rate.lunar)} من المال الزكوي الذي بقي فوق النصاب حولًا هجريًا كاملًا. ونصاب اليوم، بأسعار ${h.priceDay}، يبلغ ${h.money(s, c)} بالفضة (${h.nisabGrams('silver')} غرامًا) و${h.money(g, c)} بالذهب (${h.nisabGrams('gold')} غرامًا). يُجمع النقد وأرصدة الحسابات وذهب الادخار والأسهم والتقاعد القابل للسحب وعروض التجارة والديون المرجوة، وتُخصم الديون الحالّة، فإن بلغ الصافي النصاب وجبت الزكاة في المبلغ كله لا في الزائد وحده. ومن يحسب بالسنة الميلادية يخرج ${h.pct(h.P.rate.solar, 3)} بحسب قاعدة هيئة الزكاة السعودية. وفي الحلي الملبوس والتقاعد المقفل وأسهم الاستثمار والديون تعرض الحاسبة قولي المذاهب بالمبلغ. وفي الموقع أيضًا حاسبة للمواريث بفروض القرآن مع العول والرد، وجدول بمقادير زكاة الفطر والفدية والكفارة التي أعلنتها هيئات الإفتاء والزكاة لرمضان 1447، كل مقدار بتاريخه ورابط مصدره. تُحدَّث الأسعار كل يوم بأربعين عملة، ويجري الحساب في متصفحك بلا حساب ولا بريد ولا طلب تبرع.`;
  return `Zakat is ${h.pct(h.P.rate.lunar)}, one fortieth, of the zakatable wealth that has stayed above the nisab for a full lunar year. At the prices of ${h.priceDay}, the nisab is ${h.money(s, c)} on the silver measure (${h.nisabGrams('silver')} g) and ${h.money(g, c)} on the gold measure (${h.nisabGrams('gold')} g). Add up cash and bank balances, gold kept as savings, shares, the pension you could withdraw, business stock and money you are sure to get back, take off debts due now, and if the net reaches the nisab, zakat is due on the whole amount, not only on the part above it. On a solar year the rate is ${h.pct(h.P.rate.solar, 3)}, the day-for-day rule of the Saudi zakat authority. For worn jewellery, locked pensions, shares held for dividends and debts, the calculator shows the amount under each school’s view. Prices are refreshed every day in 40 currencies, and the calculation runs in your browser with no account, no e-mail and no donation asked.`;
}

export const HOME: Record<Lang, HomeText> = { en, ar };
