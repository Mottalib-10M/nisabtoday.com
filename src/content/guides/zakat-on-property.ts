import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en'), A = makeKit('ar');

const eRent = E.zakat({ cur: 'NZD', rentSaved: 26400, basis: 'silver' });
const aRent = A.zakat({ cur: 'MAD', rentSaved: 84000, basis: 'silver' });

export default defineGuide({
  id: 'zakat-on-property', group: 'assets', order: 70, tool: 'rent',
  related: ['zakat-on-business', 'zakat-on-debts', 'how-to-calculate-zakat', 'when-is-zakat-due', 'zakat-on-savings', 'nisab'],
  sources: ['iifa-property', 'pk-calc', 'ppz-business', 'islamweb-debts', 'zatca-reg', 'gold-api'],
  en: {
    slug: 'zakat-on-property', nav: 'Property and rent', card: 'Your home, a rented flat, a plot bought to resell: what counts, and why the rent matters more than the walls.',
    title: 'Zakat on Property 2026: Rent, Homes and Land for Resale',
    description: 'Zakat on property in 2026: none on your home or on a rented building itself, 2.5 % on rent saved for a year, and market value on land bought to resell.',
    h1: 'Zakat on property: the house, the rent and the plot',
    intro: 'Enter the rent you have received and still hold: the calculator compares it with today’s nisab, not the value of the building.',
    resume: `Zakat is not due on the house you live in, and the International Islamic Fiqh Academy ruled in 1985 that it is not due on rented real estate itself either: what is zakatable is the rent, at ${E.pct(E.P.rate.lunar)}, once a year has passed from the day you received it. So a landlord in Auckland who has put aside ${E.money(26400, 'NZD')} of net rent owes ${eRent.due ? E.money(eRent.zakat, 'NZD') : 'nothing on that sum alone'} on it at today’s silver nisab of ${E.money(E.nisab('silver', 'NZD'), 'NZD')}, measured on the spot prices of ${E.priceDay}, whatever the flat is worth. Property bought in order to sell it is different: it is stock in trade, counted every year at its market value, which is how the Punjab Zakat and Ushr Department’s calculator lists land held as an investment or a business. Mortgage instalments falling due are deducted on the majority view. Rent already spent before your zakat day is not counted at all.`,
    faqs: [
      { q: 'Is zakat due on the full value of a buy-to-let flat?', a: 'Not on the resolution of the International Islamic Fiqh Academy, which says zakat is not due on real estate assets and leased land. It is due on the yield, the rent, at 2.5 % once a year has passed from the day you received it, provided the rent is still in your hands and your wealth reaches the nisab.' },
      { q: 'I bought a plot of land to sell when prices rise. Do I count it?', a: 'Land bought for resale is treated as trade goods, so it is counted at its market value on your zakat day, every year. The Punjab Zakat and Ushr Department’s calculator lists landed property held as an investment or business at its current market value. Ask a scholar you trust if your intention has changed since you bought it.' },
      { q: 'Does the rent I spent during the year count for zakat?', a: 'No. Zakat is assessed on what you hold on your zakat day. Rent that paid for repairs, the mortgage, school fees or food is gone before the day arrives. Only the part saved and still held is added to your cash and compared with the nisab, as the rent field of the calculator asks.' },
      { q: 'Are the costs of letting deducted before the rent is counted?', a: 'The Punjab Zakat and Ushr Department’s calculator counts rent from property as the amount remaining after deducting all expenses. In practice that is already the case if you enter what is left in your account: agent fees, insurance and repairs have been paid out of the gross rent before your zakat day.' },
    ],
    body: (h) => {
      const c = 'NZD';
      const rent = h.zakat({ cur: c, rentSaved: 26400, cash: 7800, basis: 'silver' });
      const rentG = h.zakat({ cur: c, rentSaved: 26400, cash: 7800, basis: 'gold' });
      const flipD = h.zakat({ cur: c, stock: 640000, cash: 12500, debts: 31200, debtRule: 'deduct', basis: 'silver' });
      const flipN = h.zakat({ cur: c, stock: 640000, cash: 12500, debts: 31200, debtRule: 'none', basis: 'silver' });
      const rows = [
        ['The home you live in', 'Not counted', h.src('iifa-property', 'IIFA resolution 2')],
        ['A flat or shop you rent out', 'Only the rent you still hold', h.src('iifa-property', 'IIFA resolution 2')],
        ['Land or a house bought to resell', 'Market value every year', h.src('pk-calc', 'Punjab Zakat Department')],
        ['Rent spent before your zakat day', 'Not counted', 'Nothing left to assess'],
        ['Mortgage instalments due', 'Deducted on the majority view', h.src('islamweb-debts', 'Islamweb 47139')],
      ];
      return `
<h2>Three kinds of property, three answers</h2>
<p>Property is where people most often overestimate their zakat. A family that owns a house worth ten times its savings will sometimes add the house to the sum, and end up with a figure it cannot pay. That is not what the jurists ask. What matters is why you hold the property: to live in it, to earn a rent from it, or to sell it at a profit. Each purpose leads to a different rule, and only one of them puts the value of the building itself in the calculation.</p>
${h.table(['Property', 'What counts', 'Source'], rows, 'How each kind of property enters the zakat sum.', ['l', 'l', 'l'])}
<p>The house you live in sits with your car, your furniture and the tools of your trade: it serves a personal need and is not wealth set aside to grow. It is left out however much it is worth, and so is a second home kept for the family’s own use.</p>

<h2>Rented property: the rent, not the walls</h2>
<p>For a building you let, the ${h.src('iifa-property', 'International Islamic Fiqh Academy')} gave a clear answer at its second session in December 1985: zakat is not due on real estate assets and leased land, but it is due on their yield, at one fourth of one tenth, ${h.pct(h.P.rate.lunar)}, after a year has passed from the day the yield was actually received. In plain terms, the tenant’s payments become your cash, and cash is zakatable once it has been held for a lunar year and your wealth reaches the nisab, the minimum threshold.</p>
<p>Take a landlord in Auckland with one rented flat. Over the year the net rent came to more than she needed, and on her zakat day ${h.money(26400, c)} of it is still in a separate account, beside ${h.money(7800, c)} of ordinary savings. The flat is worth many times that. Her zakat is ${rent.due ? h.money(rent.zakat, c) : 'nothing'} on the silver nisab and ${rentG.due ? h.money(rentG.zakat, c) : 'nothing'} on the gold one, because the comparison is made on ${h.money(rent.net, c)}, not on the price of the flat.</p>
${h.mini('rent', { t: 'Zakat on the rent you have saved, in New Zealand dollars', p: ['amt', 'basis'], d: { amt: 26400, cur: c } })}
<p>The year runs from receipt. Rent that arrived last month has not completed its own year; many landlords simplify by adding all the rent still held on one zakat day, which pays a little early on the newest months. Paying early is allowed; paying on wealth you no longer hold is not required. The ${h.a('when-is-zakat-due', 'zakat date calculator')} gives the end of a lunar year from any starting day.</p>
<p>Expenses come out first. The ${h.src('pk-calc', 'Punjab Zakat and Ushr Department’s calculator')} counts rentals coming from property as any amount remaining after deducting all expenses. If you enter the balance actually left once the agent, the insurer, the rates and the plumber have been paid, the deduction is already done.</p>

<h2>Property bought to sell</h2>
<p>A plot bought as an investment, a house bought to renovate and resell, apartments built for sale: here the property is stock in trade, like the goods on a shop’s shelves. It is counted at what it would fetch on your zakat day, every year until it is sold, alongside your cash. The Punjab calculator has a line for landed property held as an investment or a business, at its current market value, and the ${h.src('ppz-business', 'Federal Territories zakat centre in Malaysia')} values trade goods at the state they are in at the end of the year, with a nisab of 85 g of gold for business wealth.</p>
<p>Suppose a builder in Hamilton holds a finished house valued at ${h.money(640000, c)}, with ${h.money(12500, c)} in the business account and ${h.money(31200, c)} of loan instalments due this year. With the debts deducted the zakat is ${h.money(flipD.zakat, c)}; without deducting them, on the newer view of al-Shafi‘i, it is ${h.money(flipN.zakat, c)}. Both figures sit on the same market value; only the treatment of the debt changes.</p>
${h.mini('business', { t: 'A property held for resale, counted as stock', p: ['stock', 'cash', 'pay'], d: { stock: 640000, cash: 12500, rec: 0, pay: 31200, cur: c } })}
<p>Intentions are not always so sharp. A family may buy land planning to build on it one day, then think about selling. The sources read for this page speak of property held for sale and of property that is let; they do not settle every mixed case, and the calculator will not decide your intention for you. If yours has changed, or was never settled, ask a scholar you trust before your zakat day.</p>

<h2>Mortgages and other debts on property</h2>
<p>Most property is bought with a loan. On the majority view reported by ${h.src('islamweb-debts', 'Islamweb in fatwa 47139')}, that of Abu Hanifa, Malik, al-Shafi‘i in his older opinion and Ahmad, debts reduce the cash, gold and trade goods on which zakat is assessed; al-Shafi‘i’s newer opinion does not deduct them. The calculator asks only for what falls due now, the instalments of the coming months and bills already owed, not the whole balance of a loan that runs for twenty years. Entering the full balance would wipe out the zakat of almost any homeowner, which none of the positions above sets out to do.</p>
<p>If you count your accounts on the Gregorian calendar, as a property company does, the rate rises slightly for the extra days: the ${h.src('zatca-reg', 'Saudi zakat regulations')} divide 2.5 % by the days of the Hijri year and multiply by the days of the fiscal year, ${h.pct(h.P.rate.solar, 3)} for 365 days.</p>
<p>For a portfolio of several buildings, the method does not change: list what you hold to live in, what you let and what you hold to sell, then bring the rent saved and the market value of the stock into one sum with the rest of your wealth, using the ${h.a('how-to-calculate-zakat', 'step by step method')}.</p>
`;
    },
  },
  ar: {
    slug: 'zakat-on-property', nav: 'زكاة العقار والإيجار', card: 'المسكن والعقار المؤجر والأرض المشتراة للبيع: ما الذي يُزكى وكيف تُحسب زكاة الأجرة.',
    title: 'زكاة العقار 2026: المسكن والعقار المؤجر وأرض التجارة',
    description: 'زكاة العقار 2026: لا زكاة في المسكن ولا في ذات العقار المؤجر، وتجب في الأجرة المدخرة بعد حول من قبضها، وتُقوَّم أرض التجارة بسعر السوق في كل عام بربع العشر.',
    h1: 'زكاة العقار: المسكن والأجرة وأرض التجارة',
    intro: 'أدخل الأجرة التي قبضتها وما زالت في يدك: تقارنها الحاسبة بنصاب اليوم، لا بقيمة العقار نفسه.',
    resume: `لا زكاة في البيت الذي تسكنه، ولا في العقار المؤجر نفسه بحسب قرار مجمع الفقه الإسلامي الدولي في دورته الثانية سنة 1985، وإنما تجب الزكاة في غلته، أي الأجرة، بنسبة ${A.pct(A.P.rate.lunar)} بعد مضي حول من يوم قبضها إذا تحققت بقية الشروط. فمن ادخر من أجرة شقته في الدار البيضاء ${A.money(84000, 'MAD')} وبقيت في يده حتى يوم زكاته يخرج عنها ${aRent.due ? A.money(aRent.zakat, 'MAD') : 'لا شيء إن لم يكن له مال آخر'} بنصاب الفضة البالغ اليوم ${A.money(A.nisab('silver', 'MAD'), 'MAD')} بأسعار ${A.priceDay}، أيًا كانت قيمة الشقة. أما العقار المشترى بنية البيع فهو من عروض التجارة، يُقوَّم كل عام بسعر السوق ويُضم إلى النقد، وكذلك تعدّه حاسبة إدارة الزكاة والعشر في البنجاب حين تذكر الأرض المملوكة للاستثمار أو التجارة. وتُخصم الأقساط الحالّة على قول الجمهور، وما أُنفق من الأجرة قبل يوم الزكاة لا يدخل في الحساب أصلًا.`,
    faqs: [
      { q: 'هل تجب الزكاة في قيمة الشقة التي أؤجرها؟', a: 'لا تجب في ذات العقار المؤجر بحسب قرار مجمع الفقه الإسلامي الدولي رقم 2، الذي ينص على أن الزكاة لا تجب في الأصول العقارية والأراضي المأجورة. وإنما تجب في الأجرة بنسبة ربع العشر بعد حول من قبضها، إذا بقيت في يدك وبلغ مالك النصاب مع بقية أموالك الزكوية.' },
      { q: 'اشتريت أرضًا أنتظر ارتفاع سعرها لأبيعها، فهل أزكيها؟', a: 'الأرض المشتراة بنية البيع تُعامل معاملة عروض التجارة، فتُقوَّم بسعر السوق في يوم زكاتك من كل عام وتُضم إلى نقدك. وتذكر حاسبة إدارة الزكاة في البنجاب الأرض المملوكة للاستثمار أو التجارة بقيمتها السوقية الحالية. فإن تغيرت نيتك بعد الشراء فاسأل عالمًا تثق به.' },
      { q: 'هل تُحسب الأجرة التي أنفقتها خلال السنة؟', a: 'لا. تُحسب الزكاة على ما تملكه في يوم زكاتك. فما دُفع من الأجرة في الصيانة أو أقساط القرض أو نفقات البيت قد خرج من يدك قبل ذلك اليوم. وإنما يُضاف ما ادُّخر منها وبقي في الحساب إلى نقدك ثم يُقارن المجموع بالنصاب.' },
    ],
    body: (h) => {
      const c = 'MAD';
      const r = h.zakat({ cur: c, rentSaved: 84000, cash: 31000, basis: 'silver' });
      const rg = h.zakat({ cur: c, rentSaved: 84000, cash: 31000, basis: 'gold' });
      const k = 'KWD';
      const fD = h.zakat({ cur: k, stock: 145000, cash: 6200, debts: 9800, debtRule: 'deduct', basis: 'silver' });
      const fN = h.zakat({ cur: k, stock: 145000, cash: 6200, debts: 9800, debtRule: 'none', basis: 'silver' });
      const rows = [
        ['المسكن الذي تقيم فيه', 'لا يُحتسب', h.src('iifa-property', 'قرار المجمع رقم 2')],
        ['شقة أو محل مؤجر', 'الأجرة المدخرة وحدها', h.src('iifa-property', 'قرار المجمع رقم 2')],
        ['أرض أو بيت للبيع', 'القيمة السوقية كل عام', h.src('pk-calc', 'إدارة الزكاة في البنجاب')],
        ['أقساط القرض الحالّة', 'تُخصم عند الجمهور', h.src('islamweb-debts', 'إسلام ويب 47139')],
      ];
      return `
<h2>العبرة بالنية التي يُقتنى لها العقار</h2>
<p>العقار أكثر الأموال التي يُبالغ الناس في تقدير زكاتها. فقد تملك الأسرة بيتًا تبلغ قيمته أضعاف مدخراتها، فتضيفه إلى المجموع وتخرج برقم لا تقدر عليه، وليس هذا ما يطلبه الفقهاء. فالسؤال الأول: لماذا تملك هذا العقار؟ للسكنى، أم للإجارة، أم للبيع والربح؟ ولكل غرض حكم، وواحد منها فقط يُدخل قيمة العقار نفسه في الحساب.</p>
${h.table(['العقار', 'ما يُحتسب', 'المصدر'], rows, 'كيف يدخل كل نوع من العقار في حساب الزكاة.', ['l', 'l', 'l'])}
<p>فالمسكن من الحاجات الأصلية كالسيارة والأثاث وأدوات الحرفة، لا يُعد مالًا ناميًا، فلا زكاة فيه مهما ارتفعت قيمته، ومثله بيت ثانٍ تستعمله الأسرة لنفسها.</p>

<h2>العقار المؤجر: الزكاة في الغلة لا في الأصل</h2>
<p>نص ${h.src('iifa-property', 'مجمع الفقه الإسلامي الدولي')} في قراره رقم 2 على أن الزكاة لا تجب في الأصول العقارية والأراضي المأجورة، وأنها تجب في الغلة بنسبة ربع العشر، ${h.pct(h.P.rate.lunar)}، بعد دوران الحول من يوم القبض مع توافر الشروط وانتفاء الموانع. فالأجرة إذا قبضتها صارت نقدًا في يدك، والنقد يُزكى إذا حال عليه الحول وبلغ مالك النصاب.</p>
<p>مثال ذلك مالك شقة مؤجرة في الدار البيضاء ادخر من أجرتها ${h.money(84000, c)}، وعنده إلى جانبها ${h.money(31000, c)} من مدخرات أخرى. زكاته ${r.due ? h.money(r.zakat, c) : 'لا شيء'} بنصاب الفضة، و${rg.due ? h.money(rg.zakat, c) : 'لا شيء'} بنصاب الذهب، لأن المقارنة تجري على ${h.money(r.net, c)}، لا على ثمن الشقة.</p>
${h.mini('rent', { t: 'زكاة الأجرة المدخرة بالدرهم المغربي', p: ['amt', 'basis'], d: { amt: 84000, cur: c } })}
<p>والحول يبدأ من القبض، فأجرة الشهر الماضي لم يتم حولها بعد. ويجمع كثير من الملاك كل ما بقي من الأجرة في يوم زكاة واحد تيسيرًا، فيعجلون زكاة الأشهر الأخيرة، وتعجيل الزكاة جائز. و${h.a('when-is-zakat-due', 'حاسبة موعد الزكاة')} تعطيك نهاية الحول الهجري من أي يوم تبدأ منه.</p>
<p>وتُطرح النفقات أولًا: فحاسبة ${h.src('pk-calc', 'إدارة الزكاة والعشر في البنجاب')} تعدّ من إيرادات العقار ما يبقى بعد خصم جميع النفقات. فإذا أدخلت الرصيد الباقي فعلًا بعد أجرة الوسيط والتأمين والإصلاحات فقد تم الخصم.</p>

<h2>العقار المعدّ للبيع</h2>
<p>أما الأرض المشتراة للمضاربة على سعرها، والبيت الذي يُرمَّم ليُباع، والشقق التي تُبنى للبيع، فهي عروض تجارة كالبضاعة على رفوف المتجر، تُقوَّم بما تساويه في يوم الزكاة كل عام حتى تُباع. وتذكر حاسبة البنجاب الأرض المملوكة للاستثمار أو التجارة بقيمتها السوقية الحالية، ويقوّم ${h.src('ppz-business', 'مركز الزكاة في الأقاليم الاتحادية بماليزيا')} عروض التجارة بحالها في آخر الحول.</p>
<p>فلو كان عند مستثمر في الكويت بيت جاهز للبيع قيمته ${h.money(145000, k)}، وفي حسابه ${h.money(6200, k)}، وعليه أقساط حالّة هذا العام قدرها ${h.money(9800, k)}، فزكاته ${h.money(fD.zakat, k)} مع خصم الأقساط، و${h.money(fN.zakat, k)} دون خصمها على القول الجديد للشافعي.</p>
${h.mini('business', { t: 'عقار معدّ للبيع يُحسب كعروض التجارة', p: ['stock', 'cash', 'pay'], d: { stock: 145000, cash: 6200, rec: 0, pay: 9800, cur: k } })}
<p>وليست النية دائمًا واضحة، فقد تشتري الأسرة أرضًا لتبني عليها يومًا ثم تفكر في بيعها. والمصادر التي قرأناها لهذه الصفحة تتكلم عن العقار المعدّ للبيع والعقار المؤجر، ولا تحسم كل حالة مختلطة، والحاسبة لا تقرر نيتك عنك. فإن تغيرت نيتك أو لم تستقر فاسأل عالمًا تثق به.</p>

<h2>القرض العقاري والديون</h2>
<p>ينقل ${h.src('islamweb-debts', 'إسلام ويب في الفتوى 47139')} أن جمهور أهل العلم، أبا حنيفة ومالكًا والشافعي في القديم وأحمد، يرون أن الدين يمنع الزكاة في الأموال الباطنة من نقد وذهب وعروض تجارة بقدره، وأن الشافعي في الجديد لا يراه مانعًا. وتسألك الحاسبة عن الحالّ من الدين فقط، أي أقساط الأشهر المقبلة والفواتير المستحقة، لا عن كامل رصيد قرض يمتد عشرين سنة، فإدخال الرصيد كله يُسقط زكاة كل من اشترى بيتًا تقريبًا.</p>
<p>ومن يمسك حساباته بالسنة الميلادية كشركات العقار تزيد نسبته بالأيام الزائدة: فاللائحة ${h.src('zatca-reg', 'السعودية لجباية الزكاة')} تقسم 2.5 % على أيام السنة الهجرية وتضربها في أيام السنة المالية، فتبلغ ${h.pct(h.P.rate.solar, 3)} عن 365 يومًا. ولمن يملك عدة عقارات فالطريقة واحدة: يفرز ما يسكنه وما يؤجره وما يعدّه للبيع، ثم يجمع الأجرة المدخرة وقيمة عروض التجارة مع بقية ماله، كما في صفحة ${h.a('zakat-al-maal', 'زكاة المال')}.</p>
`;
    },
  },
});
