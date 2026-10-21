import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en'), A = makeKit('ar');
const eT = E.zakat({ cur: 'GBP', shares: 24000, sharesMode: 'trade' });
const eI = E.zakat({ cur: 'GBP', shares: 24000, sharesMode: 'invest', investPct: 30 });
const aT = A.zakat({ cur: 'SAR', shares: 120000, sharesMode: 'trade' });
const aI = A.zakat({ cur: 'SAR', shares: 120000, sharesMode: 'invest', investPct: 25 });

export default defineGuide({
  id: 'zakat-on-shares', group: 'assets', order: 40, tool: 'shares', toolArg: { amt: 24000, mode: 'invest', pc: 30 },
  related: ['zakat-on-business', 'zakat-on-pension', 'zakat-on-crypto', 'how-to-calculate-zakat', 'zakat-al-maal'],
  sources: ['iifa-shares', 'iifa-shares-income', 'egypt-shares', 'ppz-shares', 'kuwait-calc', 'pk-ordinance', 'zatca-reg'],
  en: {
    slug: 'zakat-on-shares', nav: 'Zakat on shares', card: 'Shares, funds and ISAs: full market value when you trade, the company’s zakatable assets when you hold.',
    title: 'Zakat on Shares 2026: Trading, Long-Term Holdings and ISAs',
    description: 'Zakat on shares in 2026: market value for shares you trade, the company’s zakatable assets for long-term holdings, both amounts shown, with ISAs and funds.',
    h1: 'Zakat on shares, funds and ISAs',
    intro: 'Enter the market value of your shares on your zakat day, say whether you trade them or hold them for dividends, and, if you hold them, the zakatable share of the companies’ assets.',
    resume: `Shares are zakatable, but how much you count depends on why you hold them. Shares bought to sell at a profit are trade goods: under resolution 28 of the International Islamic Fiqh Academy you pay ${E.pct(E.P.rate.lunar)} of their market value on your zakat day, plus any dividends still held. Shares kept for their income are counted on the zakatable assets of the company behind them, its cash, receivables and stock, in proportion to your stake; when the company holds none, the Academy says zakat falls on the dividends only. Dar al-Ifta of Egypt and the Kuala Lumpur zakat centre take the simpler route of market value for every holding. On a ${E.money(24000, 'GBP')} ISA portfolio, the trading view gives ${E.money(eT.zakat, 'GBP')}, while the holding view with companies whose zakatable assets are 30 % of the total gives ${E.money(eI.zakat, 'GBP')}. The nisab is tested on all your wealth together, not on the shares alone.`,
    faqs: [
      { q: 'Do I pay zakat on the full value of a stocks and shares ISA?', a: 'The ISA wrapper changes your tax, not your zakat. Look at what is inside: shares you buy and sell to profit from the price count at full market value; shares or funds you keep for income can be counted on the zakatable part of the companies’ assets. Cash waiting inside the ISA is simply cash and counts in full.' },
      { q: 'How do I find the zakatable percentage of a company I hold?', a: 'Open its latest balance sheet. Add cash and deposits, trade receivables and inventory, then divide by total assets. A company with cash of 40, receivables of 60 and stock of 50 out of total assets of 500 has a zakatable ratio of 30 %. Multiply your holding’s market value by that ratio, then add it to your other wealth.' },
      { q: 'Are dividends received during the year added to the zakat on shares?', a: 'Dividends you have spent are gone and owe nothing. Dividends still sitting in your account on your zakat day are cash and count with the rest. Resolution 28 of the Fiqh Academy and Dar al-Ifta of Egypt both add dividends held to the market value of trading shares; for long-term holdings the dividends count as part of your cash.' },
      { q: 'What happens if the company already pays zakat for its shareholders?', a: 'Resolution 28 places zakat on the shareholders but says the company must pay it on their behalf in the cases it lists. Kuwait Zakat House publishes, for listed companies, the zakat per share still due and marks firms that have paid for their shareholders. Where a company pays for you, check its figure before adding the holding to your own sum.' },
      { q: 'Are shares that fell in price valued at what I paid or at today’s price?', a: 'At today’s price. Resolution 28 speaks of the market value, and Pakistan’s Ordinance values listed shares at the closing rate on the valuation date. A loss on paper therefore lowers your zakat, and a gain raises it. Shares in an unlisted company have no market price, and Pakistan uses their paid-up value instead.' },
    ],
    body: (h) => {
      const cur = 'GBP';
      const amt = 24000;
      const z = (mode: 'trade' | 'invest', pc = 100) => h.zakat({ cur, shares: amt, sharesMode: mode, investPct: pc });
      const t = z('trade'), i30 = z('invest', 30), i15 = z('invest', 15);
      const mixed = h.zakat({ cur, cash: 1800, shares: 9000, sharesMode: 'invest', investPct: 20 });
      const row = (label: string, x: ReturnType<typeof z>, who: string) => [label, h.money(x.net, cur), h.money(x.zakat, cur), who];
      return `
<h2>Why the reason you hold a share changes the sum</h2>
<p>A share is a slice of a company: its buildings, machines, cash, debts owed to it and goods on its shelves. Zakat is not due on buildings and machines used to earn a living, and it is due on cash, receivables and trade goods. That is why scholars ask what you do with the share. If you buy to sell when the price rises, the share itself is your merchandise and its whole price counts. If you buy to keep and collect dividends, you own a slice of a business, and only the zakatable part of that business counts.</p>
<p>The ${h.src('iifa-shares', 'International Islamic Fiqh Academy, resolution 28')}, adopted in Jeddah in 1988, draws exactly this line. For the shareholder who invested “for business purposes”, zakat is ${h.pct(h.P.rate.lunar)} “of their market value plus their dividends”. For the holder who keeps shares for their yearly income, the resolution looks through to the company’s assets, and ${h.src('iifa-shares-income', 'resolution 121')} adds that the holder should investigate as far as possible and pay on the zakatable portion; if the company has no zakatable assets at all, zakat is due “on the income only and not on the principal of the shares”.</p>
${h.table(['Your portfolio of £24,000 held as', 'Value counted', 'Zakat', 'Basis'], [row('Shares you trade', t, 'IIFA resolution 28, full market value'), row('Long-term holdings, companies at 30 % zakatable', i30, 'IIFA resolutions 28 and 121'), row('Long-term holdings, companies at 15 % zakatable', i15, 'IIFA resolutions 28 and 121'), row('Any holding, market value', t, 'Dar al-Ifta of Egypt, PPZ Kuala Lumpur')], `Pounds sterling, silver nisab of ${h.priceDay}. A value counted below the nisab still adds to your other wealth.`, ['l', 'r', 'r', 'l'])}
${h.mini('shares', { t: 'Long-term holdings in pounds', p: ['amt', 'mode', 'pc'], d: { amt: 18500, mode: 'invest', pc: 25, cur } })}

<h2>Reading a balance sheet in five minutes</h2>
<p>The holding view needs one ratio: the company’s zakatable assets divided by its total assets. Every listed company publishes a balance sheet. Take cash and short-term deposits, trade receivables (money customers owe it) and inventories, add them, and divide by total assets. A software firm with little stock and a large cash pile can come out high; a utility full of pipes and power stations comes out low. The result is the percentage to enter in the calculator above.</p>
<p>Two shortcuts help. For a fund or an exchange traded fund with hundreds of holdings, the factsheet lists the largest ones; working out the ratio for those and applying it to the whole fund gives an estimate, in the spirit of resolution 121, which asks the holder to make the fullest inquiry possible before paying. And if you cannot get any figure, the cautious choice is to count the full market value, which can only overpay. Shares that fell since you bought them are valued at today’s price: resolution 28 speaks of market value, not cost.</p>

<h2>Market value for everyone: Egypt and Kuala Lumpur</h2>
<p>Not every body asks savers to read accounts. ${h.src('egypt-shares', 'Dar al-Ifta of Egypt, fatwa 12218')}, answering someone who held shares as savings, says the zakat is taken from the current value of the shares once the year has passed, with the dividends added. The ${h.src('ppz-shares', 'Federal Territories zakat centre')} in Malaysia ruled in 2015 that shares bought to trade and shares held for annual returns or long ownership both pay ${h.pct(h.P.rate.lunar)} of the current market price. On these views the last line of the table above is your answer, whatever your reason for holding.</p>
<p>The gap between the two methods is large on paper and small in cash for most families. On ${h.money(9000, cur)} of long-term holdings at a 20 % ratio, plus ${h.money(1800, cur)} in the bank, the holding view counts ${h.money(mixed.net, cur)} and asks ${h.money(mixed.zakat, cur)}. The point is to choose one method, use it every year, and note the figures you used.</p>
${h.mini('zakat', { t: 'Shares added to your other wealth', p: ['cash', 'shares'], d: { cur, cash: 1800, shares: 9000, sharesMode: 'invest', investPct: 20 } })}

<h2>When the company pays for you: Kuwait, Pakistan, Saudi Arabia</h2>
<p>Resolution 28 states that zakat on shares is an obligation on the shareholders, and that the company must pay it on their behalf in the cases it sets out, “on the assumption that the capital of all shareholders is the property of a single person”. ${h.src('kuwait-calc', 'Kuwait Zakat House')} publishes the zakat per share for Kuwaiti listed companies, and marks some as having paid for their shareholders or as owing nothing.</p>
<p>Pakistan deducts at source. The First Schedule of the ${h.src('pk-ordinance', 'Zakat and Ushr Ordinance 1980')} sets zakat on listed shares at 2.5 % of the market value, the closing rate of the Karachi Stock Exchange on the valuation date, and on unlisted shares at 2.5 % of the paid-up value. In Saudi Arabia the ${h.src('zatca-reg', 'ZATCA regulations')} have companies that hold legal accounts compute their own zakat base. If you hold Saudi or Pakistani shares from abroad, check what was already paid before you count them again.</p>
<p>Pension funds that invest in shares raise a separate question of ownership, covered on the ${h.a('zakat-on-pension', 'pension page')}. Shares of a family business you run follow the ${h.a('zakat-on-business', 'business zakat rules')}, and coins and tokens have their own page on ${h.a('zakat-on-crypto', 'crypto')}.</p>
`;
    },
  },
  ar: {
    slug: 'zakat-on-shares', nav: 'زكاة الأسهم', card: 'الأسهم والصناديق: القيمة السوقية لأسهم المتاجرة، والأصول الزكوية للشركة لأسهم الاستثمار.',
    title: 'زكاة الأسهم 2026: أسهم المتاجرة والاستثمار والصناديق',
    description: 'زكاة الأسهم 2026: القيمة السوقية لأسهم المتاجرة، والأصول الزكوية للشركة لأسهم الاقتناء الطويل، والمبلغان معًا، مع حكم الصناديق والشركات التي تزكي عن مساهميها.',
    h1: 'زكاة الأسهم والصناديق الاستثمارية',
    intro: 'أدخل القيمة السوقية لأسهمك في يوم زكاتك، وبيّن هل تتاجر فيها أم تقتنيها للأرباح، وأدخل النسبة الزكوية من أصول الشركات إن كانت للاقتناء.',
    resume: `تجب الزكاة في الأسهم، ويتوقف القدر المحتسب على نية المساهم. فما اشتُري بقصد البيع والربح من فرق السعر عروض تجارة، يُخرج عنه ${A.pct(A.P.rate.lunar)} من قيمته السوقية في يوم الوجوب مع ما بقي من أرباحه، بحسب قرار مجمع الفقه الإسلامي الدولي رقم 28. وما اقتُني للعائد السنوي يُزكى على ما يقابله من الأصول الزكوية للشركة، أي النقد والذمم المدينة والمخزون، فإن لم يكن للشركة أصول زكوية فالزكاة في الريع وحده كما نص القرار 121. وتأخذ دار الإفتاء المصرية ومركز الزكاة في كوالالمبور القيمة السوقية في الحالين. فمحفظة قيمتها ${A.money(120000, 'SAR')} تبلغ زكاتها ${A.money(aT.zakat, 'SAR')} إن كانت للمتاجرة، و${A.money(aI.zakat, 'SAR')} إن كانت للاقتناء في شركات نسبة أصولها الزكوية 25 %. ويُعتبر النصاب بمجموع مالك لا بالأسهم وحدها، والشركة التي تزكي عن مساهميها تُراجع أرقامها قبل الحساب.`,
    faqs: [
      { q: 'هل يُزكى السهم بسعر الشراء أم بسعره في السوق يوم الزكاة؟', a: 'بسعره في السوق يوم وجوب الزكاة. فقرار المجمع رقم 28 ينص على القيمة السوقية، والمرسوم الباكستاني يقوّم الأسهم المدرجة بسعر الإغلاق في تاريخ التقويم. فإن هبط السهم عن سعر شرائك قلت زكاته، وإن ارتفع زادت. أما أسهم الشركات غير المدرجة فلا سعر سوقي لها، وتعتمد باكستان قيمتها الاسمية المدفوعة.' },
      { q: 'كيف أستخرج النسبة الزكوية من القوائم المالية لشركة أملك أسهمها؟', a: 'افتح قائمة المركز المالي في آخر تقرير للشركة، واجمع النقد وما في حكمه والذمم المدينة التجارية والمخزون، ثم اقسم المجموع على إجمالي الأصول. فإن كان المجموع ربع الأصول فالنسبة 25 %. اضرب القيمة السوقية لأسهمك في هذه النسبة، وأضف الناتج إلى بقية مالك قبل المقارنة بالنصاب.' },
      { q: 'هل أزكي أسهمي إذا كانت الشركة تدفع الزكاة عن مساهميها؟', a: 'نص قرار المجمع رقم 28 على أن زكاة الأسهم واجبة على أصحابها، وأن الشركة تخرجها نيابة عنهم في حالات ذكرها. ويعلن بيت الزكاة الكويتي زكاة السهم الواحد للشركات المدرجة ويبيّن ما أخرجت الشركة زكاته عن مساهميها. فراجع ما دفعته الشركة عنك قبل أن تضيف أسهمها إلى حسابك، حتى لا تحسب المال مرتين.' },
      { q: 'ما حكم وحدات الصناديق الاستثمارية في الزكاة؟', a: 'الوحدة حصة في محفظة أسهم أو صكوك أو نقد، فتُعامل معاملة الأسهم: إن اشتريتها للبيع السريع زكيت قيمتها كاملة، وإن اقتنيتها للعائد زكيت ما يقابلها من الأصول الزكوية للشركات التي يملكها الصندوق. ونشرة الصندوق تذكر أكبر مكوناته، ومنها تقدّر النسبة إن تعذرت معرفتها بدقة.' },
    ],
    body: (h) => {
      const cur = 'SAR';
      const amt = 120000;
      const z = (mode: 'trade' | 'invest', pc = 100) => h.zakat({ cur, shares: amt, sharesMode: mode, investPct: pc });
      const t = z('trade'), i25 = z('invest', 25), i10 = z('invest', 10);
      const small = h.zakat({ cur, cash: 3000, shares: 14000, sharesMode: 'invest', investPct: 20 });
      return `
<h2>لماذا تغيّر النية مقدار الزكاة</h2>
<p>السهم حصة شائعة في شركة: في مبانيها وآلاتها ونقدها وديونها على العملاء وبضاعتها. والزكاة لا تجب في الأصول الثابتة المستعملة في الإنتاج، وتجب في النقد والذمم وعروض التجارة. ولذلك يسأل الفقهاء عن غرض المساهم: فمن اشترى ليبيع إذا ارتفع السعر فالسهم عنده سلعة يتجر فيها، فتُحتسب قيمته كلها. ومن اشترى ليحتفظ ويأخذ الأرباح فهو شريك في نشاط، ولا يُحتسب إلا ما يقابل حصته من الأصول الزكوية.</p>
<p>وهذا التفريق هو ما قرره ${h.src('iifa-shares', 'مجمع الفقه الإسلامي الدولي في قراره رقم 28')} في دورته الرابعة بجدة: من اقتنى الأسهم بقصد التجارة زكاها زكاة عروض التجارة، فيخرج ربع العشر من قيمتها السوقية مع أرباحها إن كانت لها أرباح. ومن اقتناها للاستفادة من ريعها السنوي نُظر إلى أصول الشركة. ثم جاء ${h.src('iifa-shares-income', 'القرار 121')} فطلب من المساهم أن يتحرى ما استطاع من حسابات الشركة ويزكي الجزء الزكوي، فإن لم تملك الشركة أموالًا زكوية فالزكاة في الريع وحده دون أصل السهم.</p>
${h.table(['محفظة قيمتها 120,000 ريال', 'المحتسب', 'الزكاة', 'المستند'], [['للمتاجرة', h.money(t.net, cur), h.money(t.zakat, cur), 'قرار المجمع 28'], ['للاقتناء، الأصول الزكوية 25 %', h.money(i25.net, cur), h.money(i25.zakat, cur), 'القراران 28 و121'], ['للاقتناء، الأصول الزكوية 10 %', h.money(i10.net, cur), h.money(i10.zakat, cur), 'القراران 28 و121'], ['أي سهم بقيمته السوقية', h.money(t.net, cur), h.money(t.zakat, cur), 'دار الإفتاء المصرية، مركز الزكاة الماليزي']], `بالريال السعودي، بنصاب الفضة بتاريخ ${h.priceDay}. وما نقص عن النصاب يُضم إلى بقية مالك.`, ['l', 'r', 'r', 'l'])}
${h.mini('shares', { t: 'أسهم مقتناة للعائد بالريال', p: ['amt', 'mode', 'pc'], d: { amt: 85000, mode: 'invest', pc: 25, cur } })}

<h2>القيمة السوقية عند دار الإفتاء ومركز كوالالمبور</h2>
<p>لا تطلب كل الجهات من المدخر قراءة القوائم المالية. فقد أجابت ${h.src('egypt-shares', 'دار الإفتاء المصرية في الفتوى 12218')} من يملك أسهمًا للادخار بأن يخرج الزكاة من قيمة الأسهم الحالية متى حال عليها الحول مضافًا إليها الأرباح، ونصابها ما يقابل 85 غرامًا من الذهب عيار 21. وقرر ${h.src('ppz-shares', 'مركز الزكاة في الأقاليم الاتحادية بماليزيا')} سنة 2015 أن الأسهم المشتراة للتداول والمقتناة للعائد أو للملكية الطويلة تُزكى كلها بنسبة ${h.pct(h.P.rate.lunar)} من سعرها السوقي الحالي. فعلى هذا القول يكفيك السطر الأخير من الجدول أيًا كانت نيتك.</p>
<p>ومثال ذلك شركة تجزئة مجموع أصولها 800 مليون، منها نقد 60 وذمم مدينة 90 ومخزون 150، فنسبة أصولها الزكوية 300 من 800، أي 37.5 %. أما شركة اتصالات معظم أصولها أبراج وشبكات فقد لا تتجاوز نسبتها العُشر. ولهذا يختلف المحتسب من سهم إلى آخر في المحفظة الواحدة، وتحسب كل شركة بنسبتها ثم تجمع النتائج.</p>
<p>والفرق بين الطريقتين كبير في الأرقام وأصغر في الواقع عند أكثر الأسر. فمن اقتنى أسهمًا بـ${h.money(14000, cur)} نسبتها الزكوية 20 % ولديه ${h.money(3000, cur)} في الحساب يُحتسب له ${h.money(small.net, cur)}، وزكاته ${small.zakat > 0 ? h.money(small.zakat, cur) : 'لا شيء لأن المجموع دون النصاب'}. والمهم أن تختار طريقة واحدة تلتزمها كل عام وتحفظ الأرقام التي اعتمدتها.</p>

<h2>حين تزكي الشركة عن مساهميها</h2>
<p>ينص القرار 28 على أن زكاة الأسهم واجبة على المساهمين، وأن على الشركة إخراجها نيابة عنهم في حالات عددها، فتزكي أموالها كأن رأس مال المساهمين جميعًا ملك شخص واحد. ويعلن ${h.src('kuwait-calc', 'بيت الزكاة الكويتي')} زكاة السهم الواحد لكل شركة مدرجة، ويذكر الشركات التي أخرجت الزكاة عن مساهميها وتلك التي ليس عليها زكاة، فيضرب المساهم عدد أسهمه في المبلغ المعلن.</p>
<p>وفي المملكة تحسب الشركات التي تمسك حسابات نظامية وعاءها الزكوي بنفسها وفق ${h.src('zatca-reg', 'اللائحة التنفيذية لجباية الزكاة')}، وتدفعه إلى هيئة الزكاة والضريبة والجمارك. وفي باكستان يقتطع ${h.src('pk-ordinance', 'مرسوم الزكاة والعشر لسنة 1980')} من الأسهم المدرجة 2.5 % من قيمتها السوقية بسعر إغلاق البورصة في تاريخ التقويم، ومن غير المدرجة 2.5 % من قيمتها المدفوعة. فمن ملك أسهمًا زكّتها الشركة أو اقتُطعت زكاتها فليراجع ما دُفع قبل أن يحسبها ثانية، ولحالته الخاصة يسأل عالمًا يثق به.</p>

<h2>الصناديق والأسهم الهابطة والأرباح الموزعة</h2>
<p>وحدات الصناديق الاستثمارية والصناديق المتداولة حصص في محافظ، فتأخذ حكم ما فيها: أسهم تتبع ما سبق، ونقد يُزكى كله. والأرباح التي قبضتها وأنفقتها لا شيء فيها، وما بقي منها في حسابك يوم الزكاة نقد يُضم إلى مالك. والسهم الذي هبط سعره يُقوّم بسعره اليوم لا بكلفة شرائه، فالخسارة غير المحققة تنقص زكاته. ولجمع الأسهم مع النقد والذهب في حساب واحد انظر ${h.a('zakat-al-maal', 'زكاة المال')}، وللأسهم التي تملكها في منشأتك التجارية انظر ${h.a('zakat-on-business', 'زكاة عروض التجارة')}.</p>
${h.mini('zakat', { t: 'الأسهم مع بقية مالك', p: ['cash', 'shares'], d: { cur, cash: 3000, shares: 14000, sharesMode: 'invest', investPct: 20 } })}
`;
    },
  },
});
