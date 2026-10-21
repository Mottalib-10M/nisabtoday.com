import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en'), A = makeKit('ar');
const hwE = E.hawl(E.PRICE_DAY), hwA = A.hawl(A.PRICE_DAY);

export default defineGuide({
  id: 'when-is-zakat-due', group: 'zakat', order: 60, tool: 'hawl',
  related: ['nisab', 'zakat-al-maal', 'how-to-calculate-zakat', 'zakat-percentage', 'zakat-on-property', 'zakat-al-fitr'],
  sources: ['a-abudawud-1573', 'a-quran-6-141', 'bukhari-1483', 'iifa-property', 'iifa-debts', 'iifa-pension', 'ppz-epf', 'zatca-reg', 'pk-faq', 'pk-ordinance', 'ummalqura'],
  en: {
    slug: 'when-is-zakat-due', nav: 'When zakat is due', card: 'The end of your lunar year from any start date, and the assets that follow another timetable.',
    title: 'Zakat Due Date 2026: Your Lunar Year (Hawl), Day by Day',
    description: 'Zakat due date 2026: zakat falls due one lunar year after your wealth reached the nisab. Find the end of your hawl, the Ramadan 1448 dates and the exceptions.',
    h1: 'When zakat is due',
    intro: 'Enter the day your wealth first reached the nisab, or the zakat day you used last year; the calculator gives the matching date one lunar year later.',
    resume: `Zakat on wealth falls due when you have held at least the nisab for one full lunar year, called the hawl. The hadith in Abu Dawud is direct: no zakat is due on wealth until a year has passed over it. A lunar year is about eleven days shorter than a Gregorian one, so your zakat day moves earlier on the calendar each year. If your year began on ${E.day(E.PRICE_DAY)}, ${E.hijri(E.PRICE_DAY)}, it ends on ${E.day(hwE.end)}, ${E.hijri(hwE.end)}, after ${hwE.days} days in the Umm al-Qura calendar. Many families pay in Ramadan instead of tracking the exact date; Ramadan 1448 is expected to begin on ${E.day(E.ramadan1448)}. Some wealth follows its own clock: crops are due on the day of harvest, rent from a building one year after it is received, and a locked pension or a debt that is hard to recover, on the view of the Fiqh Academy, one year’s zakat when the money is paid out.`,
    faqs: [
      { q: 'What is the hawl in zakat?', a: 'The hawl is the full lunar year that zakatable wealth must be owned before zakat is due on it. It starts on the day your wealth first reaches the nisab and ends on the same Hijri date a year later. On the Hanafi view, and in the practice of most households, money that joins your savings during the year, such as salary, is counted on the zakat day with the rest rather than starting a new year of its own.' },
      { q: 'Can I choose Ramadan as my zakat date?', a: 'Many people do, because they do not know the exact day their wealth first passed the nisab. The point is to keep a lunar year between two payments. If you move from another date to Ramadan, the usual practice is to move earlier rather than later, so that no zakat ends up paid after it fell due.' },
      { q: 'Does my zakat year restart if my savings drop below the nisab?', a: 'On the Hanafi view, a dip in the middle of the year does not matter as long as you are above the nisab at its start and end, unless the wealth is wiped out entirely. The Maliki, Shafi‘i and Hanbali schools require the wealth to stay above the nisab throughout, so a fall below it ends that year and a new one begins when the threshold is reached again.' },
      { q: 'Is zakat due on money I received a week before my zakat day?', a: 'For most people, yes. Cash and similar wealth that arrive during the year are added to what you already hold and paid with it on your zakat day, a practice that keeps one date for everything. The calculation looks at the balance on that day, not at the date each amount came in, which spares you from tracking separate years.' },
    ],
    body: (h) => {
      const starts = [h.PRICE_DAY, '2026-12-01', '2027-01-01', h.ramadan1448, h.shawwal1448];
      const rows = starts.map((d) => { const x = h.hawl(d); return [`${h.day(d)}<br>${h.hijri(d)}`, `${h.day(x.end)}<br>${h.hijri(x.end)}`, `${x.days} days`]; });
      const c = 'SGD';
      const lunar = h.zakat({ cur: c, cash: 26000 }), solar = h.zakat({ cur: c, cash: 26000, year: 'solar' });
      return `
<h2>The rule of the lunar year</h2>
<p>Ali ibn Abi Talib reports that the Prophet set five dirhams on two hundred once a year has passed over them, and that no zakat is due on property until a year has passed over it (${h.src('a-abudawud-1573', 'Sunan Abi Dawud 1573')}). The year is the Hijri year of twelve lunar months. Because it runs about eleven days short of the Gregorian year, a zakat day kept in the Islamic calendar slides back through the seasons: a family that pays in late October one year will pay in mid October the next.</p>
<p>The clock starts on the day your zakatable wealth first reaches the nisab. A graduate who starts saving in January and crosses the threshold in June begins the hawl in June, not in January. Few people remember that day, so the common practice is to fix a date and keep it. The calculator above takes any start and returns the end of the lunar year, with its Hijri equivalent, in the ${h.src('ummalqura', 'Umm al-Qura calendar')} used in Saudi Arabia. Where the month begins with a local sighting of the moon, the date may shift by a day.</p>

<h2>Lunar years from five starting points</h2>
${h.table(['Year begins', 'Zakat falls due', 'Length'], rows, 'End of the hawl in the Umm al-Qura calendar.', ['l', 'l', 'r'])}
<p>Paying in Ramadan is a popular choice: the month of fasting is a time of giving, and charities and families plan around it. If you adopt it, the first Ramadan after the date your hawl actually ends may fall later than that end. The cautious course is to pay early rather than late, so the zakat of a year is never delayed beyond its due date.</p>

<h2>What happens during the year</h2>
<p>Two readings exist of the months between the start and the end. The Hanafi school checks the nisab at both ends of the year and ignores dips in between, provided some wealth remains. The other three schools ask for the wealth to stay above the nisab without a break, so a month below it resets the count. In practice the difference only matters for someone hovering around the threshold; most savers are clearly above or clearly below it all year.</p>
<p>New money is the other question. Salary, gifts and profits that arrive in the middle of the year are not given separate anniversaries by most households. They are added to the existing pot and paid with it on the zakat day. This keeps one date for everything, and it means a bonus paid in the last week is included.</p>
${h.mini('hawl', { t: 'Last year’s zakat day to this year’s', p: ['d', 'm', 'y'], d: { d: 15, m: '3', y: '2026' } })}

<h2>Wealth that follows another calendar</h2>
<p>Several kinds of wealth do not wait for your general zakat day.</p>
<ul>
<li><strong>Crops and fruit.</strong> The Qur’an says “give its due on the day of its harvest” (${h.src('a-quran-6-141', 'Qur’an 6:141')}). The rate is a tenth or a twentieth depending on irrigation (${h.src('bukhari-1483', 'Sahih al-Bukhari 1483')}), and no year has to pass.</li>
<li><strong>Rent from a building.</strong> The ${h.src('iifa-property', 'Fiqh Academy’s resolution 2')} puts zakat on the rent after a year from the day it is actually received, if the other conditions are met.</li>
<li><strong>Debts owed to you.</strong> A loan to a solvent borrower is zakatable every year; one owed by someone who cannot or will not pay is zakatable for one year after you receive it (${h.src('iifa-debts', 'resolution 1')}).</li>
<li><strong>Locked pensions.</strong> A fund you cannot control carries one year’s zakat when it is paid out (${h.src('iifa-pension', 'resolution 143')}). The Malaysian zakat centre applies zakat to EPF withdrawals at the moment they are taken, without waiting a year (${h.src('ppz-epf', 'PPZ-MAIWP')}).</li>
</ul>

<h2>If you count on the Gregorian calendar</h2>
<p>Companies, and households who tie zakat to the tax year, can use a solar year provided they adjust the rate. Saudi Arabia’s ${h.src('zatca-reg', 'zakat regulations')} divide 2.5 % by the days of the Hijri year and multiply by the days of the fiscal year, giving ${h.pct(h.P.rate.solar, 3)} for 365 days. On savings of ${h.money(26000, c)} in Singapore that is ${h.money(solar.zakat, c)} a year instead of ${h.money(lunar.zakat, c)}, the extra covering the days a lunar count would have reached sooner.</p>
<p>In Pakistan the state sets the date for some accounts: banks deduct zakat on 1 Ramadan from savings accounts above the notified nisab, as the ${h.src('pk-faq', 'Punjab Zakat and Ushr Department')} explains. Holders who pay that way have their bank zakat date fixed for them; their other wealth still follows their own hawl.</p>
`;
    },
  },
  ar: {
    slug: 'when-is-zakat-due', nav: 'موعد وجوب الزكاة', card: 'نهاية حولك الهجري من أي تاريخ بداية، والأموال التي لها موعد آخر.',
    title: 'موعد الزكاة 2026: حساب الحول الهجري ونهاية سنتك الزكوية',
    description: 'موعد الزكاة 2026: تجب زكاة المال بعد حولان حول هجري كامل على بلوغ النصاب. احسب نهاية حولك بتقويم أم القرى، واعرف ما يُزكى يوم حصاده أو قبضه من الأموال.',
    h1: 'متى تجب الزكاة',
    intro: 'أدخل اليوم الذي بلغ فيه مالك النصاب أول مرة، أو يوم زكاتك في العام الماضي، فتعطيك الحاسبة التاريخ المقابل بعد حول هجري كامل.',
    resume: `تجب زكاة المال إذا ملك المسلم النصاب وحال عليه الحول، أي مضت عليه سنة هجرية كاملة. والأصل فيه حديث علي رضي الله عنه عند أبي داود: ليس في مال زكاة حتى يحول عليه الحول. والسنة الهجرية أقصر من الميلادية بنحو أحد عشر يومًا، فيتقدم يوم الزكاة في التقويم الميلادي كل عام. فمن بدأ حوله في ${A.day(A.PRICE_DAY)}، الموافق ${A.hijri(A.PRICE_DAY)}، انتهى حوله في ${A.day(hwA.end)}، الموافق ${A.hijri(hwA.end)}، بعد ${hwA.days} يومًا بتقويم أم القرى. وكثير من الأسر تجعل زكاتها في رمضان، ويُتوقع أن يبدأ رمضان 1448 في ${A.day(A.ramadan1448)}. ولبعض الأموال موعد خاص: فالزروع تُزكى يوم حصادها، وأجرة العقار بعد حول من قبضها، والتقاعد المقفل والدين المتعثر يُزكيان لسنة واحدة عند القبض على قول مجمع الفقه الإسلامي الدولي.`,
    faqs: [
      { q: 'ما معنى الحول في الزكاة؟', a: 'الحول سنة هجرية كاملة يمضيها المال الزكوي في ملك صاحبه بعد بلوغه النصاب، ولا تجب الزكاة قبل تمامها. ويبدأ من اليوم الذي بلغ فيه المال النصاب، وينتهي في مثل ذلك اليوم من العام الهجري التالي. وما يستفيده المرء في أثناء الحول من راتب ونحوه يُضم إلى ماله ويُزكى معه في يوم الزكاة عند كثير من الناس.' },
      { q: 'هل يجوز أن أجعل زكاتي في رمضان كل عام؟', a: 'يفعل ذلك كثيرون لأنهم لا يعرفون اليوم الذي بلغ فيه مالهم النصاب بدقة، والمهم أن يكون بين الإخراجين حول هجري. فإن أراد أن ينقل موعده إلى رمضان فالأحوط أن ينقله إلى ما قبل الموعد لا إلى ما بعده، حتى لا تتأخر زكاة سنة عن وقت وجوبها، فتعجيل الزكاة أهون من تأخيرها.' },
      { q: 'هل ينقطع الحول إذا نقص المال عن النصاب في أثناء السنة؟', a: 'عند الحنفية لا ينقطع ما دام المال تامًا في أول الحول وآخره ولم يهلك كله. وعند المالكية والشافعية والحنابلة ينقطع بنقصه عن النصاب في أي وقت، فيبدأ حول جديد إذا عاد فبلغه. والخلاف لا يظهر أثره إلا فيمن يدور ماله حول النصاب، أما من كان فوقه بوضوح فلا يتأثر.' },
      { q: 'متى تجب زكاة الزروع والثمار؟', a: 'لا يُشترط فيها الحول، بل تجب يوم الحصاد لقوله تعالى: وآتوا حقه يوم حصاده. ومقدارها العشر فيما سُقي بالمطر أو العيون، ونصف العشر فيما سُقي بكلفة، كما في حديث البخاري. أما باكستان فتأخذ عشرًا موحدًا بنسبة خمسة في المئة من نصيب المزارع بحسب قانونها لسنة 1980.' },
    ],
    body: (h) => {
      const starts = [h.PRICE_DAY, '2027-01-01', h.ramadan1448, h.shawwal1448];
      const rows = starts.map((d) => { const x = h.hawl(d); return [`${h.day(d)}<br>${h.hijri(d)}`, `${h.day(x.end)}<br>${h.hijri(x.end)}`, `${x.days} يومًا`]; });
      const c = 'QAR';
      const lunar = h.zakat({ cur: c, cash: 95000 }), solar = h.zakat({ cur: c, cash: 95000, year: 'solar' });
      return `
<h2>دليل اشتراط الحول</h2>
<p>روى أبو داود عن علي بن أبي طالب رضي الله عنه أن النبي صلى الله عليه وسلم قال: فإذا كانت لك مئتا درهم وحال عليها الحول ففيها خمسة دراهم، وفيه: ليس في مال زكاة حتى يحول عليه الحول (${h.src('a-abudawud-1573', 'سنن أبي داود 1573')}). والمراد السنة القمرية باثني عشر شهرًا هلاليًا. ولأنها أقصر من السنة الشمسية بنحو أحد عشر يومًا، فإن من يلتزم يومًا هجريًا لزكاته يجده يتقدم في التقويم الميلادي عامًا بعد عام، فيدور على فصول السنة كلها.</p>
<p>ويبدأ الحول من اليوم الذي بلغ فيه المال الزكوي النصاب، لا من أول يوم بدأ فيه الادخار. فالموظف الذي بدأ يدخر في المحرم وبلغ النصاب في رجب يبدأ حوله من رجب. وقلّ من يحفظ هذا اليوم، فيتخذ كثيرون يومًا ثابتًا ويحافظون عليه. والحاسبة أعلاه تأخذ أي تاريخ وتعطيك نهاية الحول بالتاريخين، بحسب ${h.src('ummalqura', 'تقويم أم القرى')} المعتمد في المملكة العربية السعودية، وقد يختلف يومًا حيث يبدأ الشهر بالرؤية المحلية.</p>

<h2>نهاية الحول من أربعة تواريخ</h2>
${h.table(['بداية الحول', 'تجب الزكاة في', 'المدة'], rows, 'نهاية الحول بتقويم أم القرى.', ['l', 'l', 'r'])}
<p>ومن اختار رمضان موعدًا ثابتًا فليعلم أن أول رمضان بعد نهاية حوله الحقيقي قد يتأخر عنها، فالأحوط أن يقدّم الإخراج ولا يؤخره، حتى لا تتأخر زكاة عام عن وقت وجوبها.</p>
<h2>رمضان 1448 موعدًا للزكاة</h2>
<p>يُتوقع بحسب تقويم أم القرى أن يبدأ رمضان 1448 في ${h.day(h.ramadan1448)}، وأن يكون عيد الفطر في ${h.day(h.shawwal1448)}، وقد يتقدم الموعدان يومًا أو يتأخران حيث يُعتمد على رؤية الهلال. فمن اتخذ أول رمضان يومًا لزكاته نظر في رصيده وذهبه وأسهمه في ذلك اليوم بعينه، وقوّمها بأسعاره، ثم أخرج ربع العشر. ويحسن أن يكتب التاريخ والأسعار التي اعتمدها في ورقة يحفظها، ليعيد الحساب في العام المقبل على الطريقة نفسها، ويعرف ما تغيّر في ماله بين الحولين.</p>
${h.mini('hawl', { t: 'من يوم زكاتك الماضي إلى يومها هذا العام', p: ['d', 'm', 'y'], d: { d: 1, m: '3', y: '2026' } })}

<h2>ما يطرأ على المال في أثناء الحول</h2>
<p>للفقهاء في الأشهر الواقعة بين طرفي الحول نظران. فالحنفية يعتبرون النصاب في أوله وآخره، ولا يضر عندهم نقصه في أثنائه ما بقي شيء من المال. والمالكية والشافعية والحنابلة يشترطون بقاءه فوق النصاب طوال السنة، فإن نقص عنه انقطع الحول واستُؤنف حول جديد عند بلوغه. ولا يظهر أثر الخلاف إلا فيمن يدور ماله حول حد النصاب.</p>
<p>أما المال المستفاد في أثناء الحول، كالراتب والهدية والربح، فأكثر الأسر لا تجعل له حولًا مستقلًا، بل تضمه إلى ما عندها وتزكيه معه في يوم الزكاة، فيبقى لها موعد واحد للجميع، وتدخل فيه مكافأة قبضتها قبل يوم الزكاة بأسبوع.</p>

<h2>أموال لها موعد آخر</h2>
<ul>
<li><strong>الزروع والثمار:</strong> تجب يوم الحصاد لقوله تعالى: ${h.src('a-quran-6-141', 'وآتوا حقه يوم حصاده')}، ومقدارها العشر أو نصفه بحسب السقي (${h.src('bukhari-1483', 'صحيح البخاري 1483')}).</li>
<li><strong>أجرة العقار:</strong> تُزكى بعد حول من يوم قبضها كما قرر ${h.src('iifa-property', 'مجمع الفقه الإسلامي الدولي')} في قراره رقم 2.</li>
<li><strong>الدين الذي لك:</strong> يُزكى كل عام إن كان على مليء باذل، ولسنة واحدة بعد قبضه إن كان على معسر أو مماطل (${h.src('iifa-debts', 'القرار رقم 1')}).</li>
<li><strong>مكافأة نهاية الخدمة والتقاعد المقفل:</strong> لا زكاة فيهما ما دام الموظف لا يملك التصرف، ويزكي عند القبض لسنة واحدة (${h.src('iifa-pension', 'القرار رقم 143')}). ويوجب مركز الزكاة في كوالالمبور الزكاة على ما يُسحب من صندوق الادخار عند سحبه دون انتظار حول (${h.src('ppz-epf', 'PPZ-MAIWP')}).</li>
</ul>

<h2>من يحسب بالسنة الميلادية</h2>
<p>تمسك الشركات حساباتها بالسنة المالية الميلادية، ومثلها أسر كثيرة. وقد نصت ${h.src('zatca-reg', 'اللائحة التنفيذية لجباية الزكاة')} على أن تُقسم 2.5 % على عدد أيام السنة الهجرية وتُضرب في أيام السنة المالية، فتبلغ ${h.pct(h.P.rate.solar, 3)} عن 365 يومًا. فمن ادخر في قطر ${h.money(95000, c)} يخرج ${h.money(solar.zakat, c)} بالسنة الميلادية بدل ${h.money(lunar.zakat, c)} بالسنة الهجرية، والفرق يقابل الأيام الزائدة.</p>
<p>وفي باكستان تحدد الدولة الموعد لبعض الحسابات، إذ تقتطع البنوك الزكاة في الأول من رمضان من حسابات الادخار التي تتجاوز النصاب المعلن، كما تشرح ${h.src('pk-faq', 'إدارة الزكاة والعشر في البنجاب')}. ويبقى سائر مال صاحب الحساب على حوله الخاص.</p>
`;
    },
  },
});
