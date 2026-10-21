import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en'), A = makeKit('ar');

const eL = E.zakat({ cur: 'NGN', stock: 18500000, cash: 6200000, receivable: 4300000, debts: 7900000, basis: 'gold' });
const eS = E.zakat({ cur: 'NGN', stock: 18500000, cash: 6200000, receivable: 4300000, debts: 7900000, basis: 'gold', year: 'solar' });
const aL = A.zakat({ cur: 'OMR', stock: 52000, cash: 9500, receivable: 4800, debts: 14000, basis: 'gold' });
const aS = A.zakat({ cur: 'OMR', stock: 52000, cash: 9500, receivable: 4800, debts: 14000, basis: 'gold', year: 'solar' });

export default defineGuide({
  id: 'zakat-on-business', group: 'assets', order: 80, tool: 'business',
  related: ['zakat-on-property', 'zakat-on-debts', 'zakat-on-shares', 'zakat-percentage', 'how-to-calculate-zakat', 'nisab'],
  sources: ['ppz-business', 'pk-calc', 'zatca-reg', 'zatca-faq', 'islamweb-debts', 'iifa-shares', 'gold-api'],
  en: {
    slug: 'zakat-on-business', nav: 'Business and stock', card: 'A shop, a trading company or a partnership: stock, cash and customer debts, less what you owe suppliers.',
    title: 'Zakat on Business 2026: Stock, Receivables and Payables',
    description: 'Zakat on business 2026 by the working capital method: stock at sale value, cash and collectable receivables, less payables due, 2.5 % lunar or the solar rate.',
    h1: 'Zakat on a business, by working capital',
    intro: 'Enter your stock at today’s sale value, the business cash, what customers will pay you and what you owe suppliers now.',
    resume: `Zakat on a business is ${E.pct(E.P.rate.lunar)} of its net working capital on the zakat day: stock valued at what it would sell for, plus cash and the customer debts you expect to collect, minus supplier bills and other debts falling due. Buildings, machines, vans and shelving are not counted. A Lagos wholesaler with ${E.money(18500000, 'NGN')} of stock, ${E.money(6200000, 'NGN')} in the bank, ${E.money(4300000, 'NGN')} owed by customers and ${E.money(7900000, 'NGN')} owed to suppliers has a base of ${E.money(eL.net, 'NGN')} and owes ${eL.due ? E.money(eL.zakat, 'NGN') : 'nothing at today’s gold nisab'} on a lunar year. Kept on the Gregorian calendar, Saudi regulations raise the rate in proportion to the days, ${E.pct(E.P.rate.solar, 3)}, which gives ${eS.due ? E.money(eS.zakat, 'NGN') : 'nothing'}. The Federal Territories zakat centre in Malaysia uses the same formula, current assets minus current liabilities, with a nisab of 85 g of gold valued at the end of the year.`,
    faqs: [
      { q: 'Do I pay zakat on the shop premises and the machines?', a: 'No. Zakat on a business falls on what circulates: goods for sale, cash and money customers owe you. The premises, the machines, the delivery van and the shelving serve the trade and are not sold, so they are left out, as the calculator reminds you under the result. Only stock meant for sale is valued.' },
      { q: 'At what price should business stock be valued?', a: 'At what it would fetch on your zakat day. The athar of Maymun ibn Mihran quoted by the Malaysian zakat centre says to value the goods in money, add what solvent customers owe and subtract your own debts. Most traders use the wholesale price they could sell at today, not the cost price paid months ago.' },
      { q: 'Should customer debts that will probably never be paid be counted?', a: 'The Punjab Zakat and Ushr Department’s calculator subtracts bad debts from receivables, and the calculator here asks only for customer debts you expect to collect. A debt that is written off is left out; if it is recovered later, the views on paying for the years it was owed are set out on the page on debts.' },
      { q: 'How does a partner in a business count zakat?', a: 'Each partner counts his share. Work out the net working capital of the whole business, then take your percentage of it and add it to your own cash and savings before comparing with the nisab. The Malaysian centre’s formula does exactly this with a line for the share held by Muslim owners.' },
    ],
    body: (h) => {
      const c = 'NGN';
      const lun = h.zakat({ cur: c, stock: 18500000, cash: 6200000, receivable: 4300000, debts: 7900000, basis: 'gold' });
      const sol = h.zakat({ cur: c, stock: 18500000, cash: 6200000, receivable: 4300000, debts: 7900000, basis: 'gold', year: 'solar' });
      const silv = h.zakat({ cur: c, stock: 18500000, cash: 6200000, receivable: 4300000, debts: 7900000, basis: 'silver' });
      const partnerBase = lun.net * 0.35;
      const partner = h.zakat({ cur: c, cash: partnerBase + 2400000, basis: 'gold' });
      const rows = [
        ['Stock at sale value', h.money(18500000, c), 'Counted'],
        ['Cash and bank', h.money(6200000, c), 'Counted'],
        ['Customer debts you expect to collect', h.money(4300000, c), 'Counted'],
        ['Supplier bills and debts due', `-${h.money(7900000, c)}`, 'Deducted'],
        ['Net working capital', h.money(lun.net, c), lun.due ? 'Above the gold nisab' : 'Below the gold nisab'],
        [`Zakat, lunar year (${h.pct(h.P.rate.lunar)})`, h.money(lun.zakat, c), ''],
        [`Zakat, solar year (${h.pct(h.P.rate.solar, 3)})`, h.money(sol.zakat, c), ''],
      ];
      return `
<h2>The working capital method</h2>
<p>Trade goods have been zakatable since the first generations, and the method has barely changed. The ${h.src('ppz-business', 'Federal Territories zakat centre in Malaysia')} quotes the instruction attributed to Maymun ibn Mihran: value the goods you have for trade in money, take into account the debts your customers are able to repay, then subtract your own debts. Modern accountants call the result net working capital, and the same centre writes the formula as current assets minus current liabilities, times the share held by Muslim owners, times 2.5 %.</p>
<p>In practice, a trader adds three things and subtracts one. Stock is valued at its sale price on the zakat day. Cash covers the till, the business bank account and money in transit. Receivables are the invoices customers will pay. From that total come the supplier bills, wages, rent and loan instalments that fall due. What is left is compared with the nisab, the minimum threshold, and taxed at ${h.pct(h.P.rate.lunar)} if it reaches it.</p>
${h.table(['Line', 'Amount', 'Treatment'], rows, `A wholesaler in Lagos, valued on ${h.priceDay}.`, ['l', 'r', 'l'])}
<p>The example uses the gold nisab, the threshold the Malaysian centre applies to business wealth. On the silver nisab the result is ${h.money(silv.zakat, c)}, the same figure, because a business of this size is far above both thresholds; the choice of metal matters only for a small trader near the line.</p>

<h2>What the sum leaves out</h2>
<p>Fixed assets stay out of the calculation. The shop, the warehouse, the machines, the vans and the computers serve the trade; they are not offered for sale. The ${h.src('pk-calc', 'Punjab Zakat and Ushr Department’s calculator')} lists only the value of saleable stock and the amount receivable from credit sales, then subtracts the amount payable to suppliers and bad debts. That last line matters: an invoice owed by a customer who has disappeared is not wealth you can count on, and it is removed before the comparison.</p>
<p>Raw materials that will become finished goods for sale are usually treated with the stock, since they are bought in order to be sold in another form. Packaging and spare parts kept to run the machines are a harder case, and the sources read for this page do not settle it; a small business can ask a scholar it trusts or follow the practice of its local zakat body.</p>
${h.mini('business', { t: 'Your business in naira', p: ['stock', 'cash', 'rec', 'pay'], d: { stock: 18500000, cash: 6200000, rec: 4300000, pay: 7900000, cur: c, basis: 'gold' } })}

<h2>Debts of the business</h2>
<p>Deducting supplier debts follows the majority view set out by ${h.src('islamweb-debts', 'Islamweb in fatwa 47139')}: for Abu Hanifa, Malik, al-Shafi‘i in his older opinion and Ahmad, a debt reduces the zakat on cash, gold, silver and trade goods; in his newer opinion al-Shafi‘i does not deduct it. Without the deduction, the Lagos wholesaler would count ${h.money(lun.gross, c)} rather than ${h.money(lun.net, c)}. Long loans are a separate question: the calculator subtracts only the instalments and bills due in the coming months, not the full balance of a ten year facility, so that a business financed by credit does not erase its zakat on paper.</p>

<h2>Lunar year or financial year</h2>
<p>Most businesses close their accounts on a Gregorian date. A Gregorian year is eleven days longer than a lunar one, so paying ${h.pct(h.P.rate.lunar)} on it pays slightly too little over time. The Saudi zakat authority fixes the correction in article 15 of its ${h.src('zatca-reg', 'implementing regulations')}: 2.5 % divided by the number of days of the Hijri year, multiplied by the number of days of the zakat payer’s fiscal year. Its ${h.src('zatca-faq', 'guide for taxpayers')} states the same rule with 354 days. For a year of 365 days that is ${h.pct(h.P.rate.solar, 3)}: the Lagos wholesaler would pay ${h.money(sol.zakat, c)} instead of ${h.money(lun.zakat, c)}. Article 15 also makes a first fiscal period shorter than 354 days subject to zakat.</p>

<h2>Partners, shareholders and sole traders</h2>
<p>A sole trader adds the business working capital to personal savings, since both belong to one person, and compares the total with the nisab once. A partner does the same with his share. If a partner owns 35 % of the Lagos business, his part of the working capital is ${h.money(partnerBase, c)}; with ${h.money(2400000, c)} of personal savings his zakat comes to ${partner.due ? h.money(partner.zakat, c) : 'nothing'}, unless the partnership has already paid on his behalf.</p>
<p>Shareholders of a company follow a related rule. The ${h.src('iifa-shares', 'International Islamic Fiqh Academy')} holds that zakat on shares is due from the shareholders, and that the company pays it on their behalf in certain cases, treating all the capital as if it belonged to one person; shareholders then do not pay twice. The ${h.a('zakat-on-shares', 'page on shares')} covers the investor who holds listed shares without running the business.</p>
`;
    },
  },
  ar: {
    slug: 'zakat-on-business', nav: 'زكاة عروض التجارة', card: 'المتجر والشركة والشراكة: البضاعة والنقد وديون العملاء، بعد خصم ديون الموردين الحالّة.',
    title: 'زكاة عروض التجارة 2026: المخزون والذمم وديون الموردين',
    description: 'زكاة عروض التجارة 2026 بطريقة رأس المال العامل: البضاعة بسعر البيع والنقد والديون المرجوة بعد خصم الديون الحالّة، بربع العشر للحول الهجري أو بنسبة السنة الشمسية',
    h1: 'زكاة عروض التجارة بطريقة رأس المال العامل',
    intro: 'أدخل بضاعتك بسعر بيعها اليوم، ونقد المنشأة، وما لك على العملاء، وما عليك للموردين من ديون حالّة.',
    resume: `زكاة التجارة ربع العشر، أي ${A.pct(A.P.rate.lunar)}، من صافي رأس المال العامل في يوم الزكاة: البضاعة المعدّة للبيع بقيمتها السوقية، مضافًا إليها النقد والديون المرجوة على العملاء، مطروحًا منها ديون الموردين وسائر الديون الحالّة. ولا تدخل المباني والآلات والسيارات والرفوف في الحساب. فتاجر جملة في مسقط عنده بضاعة قيمتها ${A.money(52000, 'OMR')}، وفي حسابه ${A.money(9500, 'OMR')}، وله على عملائه ${A.money(4800, 'OMR')}، وعليه للموردين ${A.money(14000, 'OMR')}، يكون وعاء زكاته ${A.money(aL.net, 'OMR')}، فيخرج ${aL.due ? A.money(aL.zakat, 'OMR') : 'لا شيء بنصاب الذهب اليوم'} عن حول هجري. فإن أمسك حساباته بالسنة الميلادية فاللائحة السعودية ترفع النسبة بقدر الأيام إلى ${A.pct(A.P.rate.solar, 3)}، فتبلغ زكاته ${aS.due ? A.money(aS.zakat, 'OMR') : 'لا شيء'} عن السنة كلها. وبالمعادلة نفسها يعمل مركز الزكاة في الأقاليم الاتحادية بماليزيا: الأصول المتداولة ناقص الخصوم المتداولة، بنصاب 85 غرامًا من الذهب يُقوَّم في آخر الحول، وتُترك الأصول الثابتة خارج الوعاء في كل الأحوال.`,
    faqs: [
      { q: 'هل تجب الزكاة في محل التجارة ومعداته؟', a: 'لا. زكاة التجارة في المال المتداول: البضاعة المعدّة للبيع، والنقد، والديون المرجوة على العملاء. أما المحل والمستودع والآلات وسيارات التوصيل فهي عروض قِنية تخدم التجارة ولا تُباع، فلا تدخل في الوعاء، وتنبهك الحاسبة إلى ذلك تحت النتيجة كلما أجريت الحساب.' },
      { q: 'بأي سعر تُقوَّم البضاعة عند إخراج الزكاة؟', a: 'بما تساويه في يوم الزكاة. والأثر المنقول عن ميمون بن مهران، الذي يذكره مركز الزكاة الماليزي، يأمر بتقويم البضاعة بالنقد وحساب ديون العملاء الملِيئين ثم طرح ما على التاجر من دين. ويأخذ أكثر التجار سعر البيع بالجملة اليوم، لا سعر الشراء القديم الذي دفعوه قبل أشهر.' },
      { q: 'كيف يزكي الشريك نصيبه من الشركة؟', a: 'يحسب صافي رأس المال العامل للشركة كلها، ثم يأخذ منه نسبة حصته، ويضمها إلى نقده ومدخراته الخاصة قبل المقارنة بالنصاب. ومعادلة مركز الزكاة الماليزي تتضمن هذا صراحة بسطر لنسبة ملكية المساهمين المسلمين، ما لم تكن الشركة قد أخرجت الزكاة عن الشركاء جميعًا.' },
    ],
    body: (h) => {
      const c = 'OMR';
      const lun = h.zakat({ cur: c, stock: 52000, cash: 9500, receivable: 4800, debts: 14000, basis: 'gold' });
      const sol = h.zakat({ cur: c, stock: 52000, cash: 9500, receivable: 4800, debts: 14000, basis: 'gold', year: 'solar' });
      const noDed = h.zakat({ cur: c, stock: 52000, cash: 9500, receivable: 4800, debts: 14000, debtRule: 'none', basis: 'gold' });
      const b = 'BHD';
      const share = 26000 * 0.4;
      const p = h.zakat({ cur: b, cash: share + 1800, basis: 'gold' });
      const rows = [
        ['البضاعة بسعر البيع', h.money(52000, c), 'تُحتسب'],
        ['النقد والحسابات', h.money(9500, c), 'تُحتسب'],
        ['ديون العملاء المرجوة', h.money(4800, c), 'تُحتسب'],
        ['ديون الموردين الحالّة', `-${h.money(14000, c)}`, 'تُخصم'],
        ['صافي رأس المال العامل', h.money(lun.net, c), lun.due ? 'فوق نصاب الذهب' : 'دون نصاب الذهب'],
        [`الزكاة بالحول الهجري (${h.pct(h.P.rate.lunar)})`, h.money(lun.zakat, c), ''],
        [`الزكاة بالسنة الميلادية (${h.pct(h.P.rate.solar, 3)})`, h.money(sol.zakat, c), ''],
      ];
      return `
<h2>تقويم البضاعة وطرح الديون</h2>
<p>عروض التجارة كل ما أُعدّ للبيع بقصد الربح، والزكاة فيها قديمة قِدم الأسواق الإسلامية. وينقل ${h.src('ppz-business', 'مركز الزكاة في الأقاليم الاتحادية بماليزيا')} الأثر المروي عن ميمون بن مهران: قوّم ما عندك من بضاعة بالنقد، واحسب ما لك على عملائك المليئين الذين يُرجى وفاؤهم، ثم اطرح ما عليك من دين. وهذا ما يسميه المحاسبون اليوم صافي رأس المال العامل، ويكتبه المركز معادلةً: الأصول المتداولة ناقص الخصوم المتداولة، مضروبًا في نسبة ملكية المسلمين، مضروبًا في 2.5 %.</p>
<p>فالتاجر يجمع ثلاثة أشياء ويطرح شيئًا واحدًا: البضاعة بسعر بيعها في يوم الزكاة، والنقد في الصندوق والحساب، وفواتير العملاء التي سيدفعونها. ثم يطرح ديون الموردين والأجور والإيجار والأقساط الحالّة. فإن بلغ الباقي النصاب أخرج منه ${h.pct(h.P.rate.lunar)}.</p>
${h.table(['البند', 'المبلغ', 'المعاملة'], rows, `تاجر جملة في مسقط، بأسعار ${h.priceDay}.`, ['l', 'r', 'l'])}
<p>ولو لم تُخصم ديون الموردين، على القول الجديد للشافعي الذي ينقله ${h.src('islamweb-debts', 'إسلام ويب في الفتوى 47139')}، لكانت زكاته ${h.money(noDed.zakat, c)} بدل ${h.money(lun.zakat, c)}. والجمهور، أبو حنيفة ومالك والشافعي في القديم وأحمد، على أن الدين يمنع الزكاة في عروض التجارة بقدره.</p>
${h.mini('business', { t: 'زكاة متجرك بالريال العماني', p: ['stock', 'cash', 'rec', 'pay'], d: { stock: 52000, cash: 9500, rec: 4800, pay: 14000, cur: c, basis: 'gold' } })}

<h2>ما لا يدخل في الوعاء</h2>
<p>الأصول الثابتة خارج الحساب: المحل والمستودع والآلات والسيارات والحواسيب تخدم التجارة ولا تُعرض للبيع. وحاسبة ${h.src('pk-calc', 'إدارة الزكاة والعشر في البنجاب')} لا تذكر إلا قيمة البضاعة القابلة للبيع والمبالغ المستحقة من البيع بالأجل، ثم تطرح المستحق للموردين والديون المعدومة. والسطر الأخير مهم: فاتورة على عميل اختفى ليست مالًا يُعتمد عليه، فتُرفع قبل المقارنة بالنصاب.</p>
<p>والمواد الخام التي تُصنع منها البضاعة تُلحق في الغالب بالمخزون لأنها تُشترى لتُباع في صورة أخرى. أما قطع الغيار المحفوظة لتشغيل الآلات فمسألة أدق لا تحسمها المصادر التي قرأناها، فليرجع صاحبها إلى عالم يثق به أو إلى عمل هيئة الزكاة في بلده.</p>

<h2>السنة المالية والسنة الهجرية</h2>
<p>تقفل أكثر المنشآت حساباتها في تاريخ ميلادي، والسنة الميلادية أطول من الهجرية بأحد عشر يومًا تقريبًا. وقد عالجت المادة الخامسة عشرة من ${h.src('zatca-reg', 'اللائحة التنفيذية لجباية الزكاة')} في السعودية هذا الفرق: تُقسم نسبة 2.5 % على عدد أيام السنة الهجرية وتُضرب في عدد أيام السنة المالية للمكلف، ويكرر ${h.src('zatca-faq', 'دليل الأسئلة الشائعة للهيئة')} القاعدة بـ354 يومًا. فتبلغ النسبة ${h.pct(h.P.rate.solar, 3)} عن 365 يومًا، وتصير زكاة تاجر مسقط ${h.money(sol.zakat, c)} بدل ${h.money(lun.zakat, c)}. وتنص المادة نفسها على أن الفترة المالية الأولى التي تقل عن 354 يومًا من بدء النشاط تخضع للزكاة.</p>

<h2>الشريك والمساهم والتاجر الفرد</h2>
<p>التاجر الفرد يضم رأس المال العامل لتجارته إلى مدخراته الخاصة، لأن المالك واحد، ثم يقارن المجموع بالنصاب مرة واحدة. والشريك يفعل ذلك بحصته: فشريك في المنامة يملك 40 % من شركة صافي رأس مالها العامل ${h.money(26000, b)} تكون حصته ${h.money(share, b)}، فإذا كان معه ${h.money(1800, b)} من مدخرات خاصة فزكاته ${p.due ? h.money(p.zakat, b) : 'لا شيء'}، ما لم تكن الشركة قد أخرجت الزكاة عنه.</p>
<p>وإذا اختلفت حصص الشركاء في الربح عن حصصهم في رأس المال فالعبرة بما يملكه كل واحد من صافي الأصول المتداولة في يوم الزكاة، ويحسن أن يتفق الشركاء على يوم واحد وطريقة واحدة في التقويم، حتى لا يزكي أحدهم بسعر البيع والآخر بسعر الشراء. ومن كانت له تجارة صغيرة في البيت أو عبر الإنترنت فحكمه حكم التاجر الفرد: يقوّم ما عنده من بضاعة جاهزة للبيع، ويضيف رصيد حساب المتجر وما ينتظره من المشترين، ويطرح ما عليه لمورديه، ثم يضم الناتج إلى بقية ماله.</p>
<p>وللمساهم في الشركات حكم قريب: فقد قرر ${h.src('iifa-shares', 'مجمع الفقه الإسلامي الدولي')} أن زكاة الأسهم على أصحابها، وأن الشركة تخرجها نيابة عنهم في أحوال معينة على اعتبار أن رأس مال المساهمين كله مال شخص واحد، فلا يزكي المساهم مرة ثانية. و${h.a('zakat-on-shares', 'صفحة زكاة الأسهم')} تتناول المستثمر الذي يملك أسهمًا مدرجة دون أن يدير الشركة.</p>
`;
    },
  },
});
