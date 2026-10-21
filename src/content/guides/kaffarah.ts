import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en'), A = makeKit('ar');
const uae = E.fitr('uae'), sg = E.fitr('singapore');

export default defineGuide({
  id: 'kaffarah', group: 'fitr', order: 50, tool: 'kaffarah', toolArg: { type: 'fast' },
  related: ['kaffarah-for-broken-oath', 'fidya', 'zakat-al-fitr', 'zakat-calculator-uae', 'fitrana'],
  sources: ['bukhari-1936', 'egypt-kaffarah', 'islamweb-kaffarah', 'b-uae-fatwa-1447', 'b-muis-1447', 'b-cii-1447'],
  en: {
    slug: 'kaffarah', nav: 'Kaffarah for a fast', card: 'The expiation for breaking a Ramadan fast on purpose: sixty days of fasting or feeding sixty poor people, and what that costs in 2026.',
    title: 'Kaffarah 2026: Cost of Breaking a Ramadan Fast on Purpose',
    description: 'Kaffarah 2026 for breaking a Ramadan fast on purpose: 60 days of fasting in a row or feeding 60 poor people, the cost per person, and how the schools differ.',
    h1: 'Kaffarah for breaking a fast in Ramadan',
    intro: 'Choose a broken fast, enter how many kaffarahs you owe and pick the body of your country, or type the price of one meal where you live.',
    resume: `Kaffarah is the heavy expiation owed by someone who deliberately breaks a fast of Ramadan without excuse. Following the hadith in al-Bukhari, it is to free a slave, which no longer applies; if that is not possible, to fast sixty days in a row; and if that is beyond you, to feed sixty poor people. The make-up fast for the day is owed as well. For 1447, the UAE Council for Fatwa priced the feeding at ${E.money(uae.kaffarah!, 'AED')} per poor person, ${E.money(60 * uae.kaffarah!, 'AED')} in all; MUIS in Singapore set ${E.money2(sg.kaffarah!, 'SGD')} per person, or ${E.money2(60 * sg.kaffarah!, 'SGD')}. The schools agree that intercourse during a fast requires kaffarah. They differ on eating or drinking on purpose: the Hanafi and Maliki schools require kaffarah, while the Shafi‘i school requires only the make-up, the view Dar al-Ifta of Egypt adopts. In the Emirates that is the difference between ${E.money(60 * uae.kaffarah!, 'AED')} and nothing beyond the make-up day.`,
    faqs: [
      { q: 'Can I feed sixty poor people instead of fasting two months?', a: 'Only if you cannot fast sixty consecutive days, because of illness, old age or real hardship. The order in the hadith is strict: fasting comes first, feeding is the fallback. Someone who is able to fast but finds it inconvenient does not move to feeding on the view of most scholars.' },
      { q: 'What breaks the sixty consecutive days of a kaffarah fast?', a: 'Missing a day without an excuse restarts the count. Days missed because of menstruation do not break the sequence, and many scholars treat illness the same way. The two Eids and the days when fasting is forbidden must be avoided, so plan the sixty days around them.' },
      { q: 'Is kaffarah owed for a fast broken by mistake?', a: 'No. Eating or drinking out of forgetfulness does not break the fast at all on the view of most scholars, and someone who broke it believing the sun had set owes the make-up day only. Kaffarah is for a deliberate breach, done knowingly, during Ramadan itself.' },
      { q: 'Does a make-up fast broken on purpose need kaffarah?', a: 'No. The kaffarah is tied to the sanctity of the days of Ramadan. Breaking a make-up fast, a vow or a voluntary fast is sinful in some cases but carries no kaffarah; you simply fast the day again. The calculator therefore counts only Ramadan days.' },
    ],
    body: (h) => {
      const t1 = h.tool('kaffarah', { type: 'fast', times: 1, body: 'uae' });
      return `
<h2>The hadith behind it</h2>
<p>A man came to the Prophet saying he had been intimate with his wife while fasting in Ramadan. He was asked whether he could free a slave; he could not. Whether he could fast two consecutive months; he could not. Whether he could feed sixty poor people (${h.src('bukhari-1936', 'Sahih al-Bukhari 1936')}). That order, freeing, then fasting, then feeding, is the structure of the kaffarah. With slavery gone, the duty starts at sixty consecutive days of fasting, and the feeding of sixty poor people is for those who cannot manage them.</p>

<h2>Which acts require it: two positions, two amounts</h2>
<p>Every school requires kaffarah for intercourse during a Ramadan fast, done deliberately and knowing it is forbidden, as ${h.src('islamweb-kaffarah', 'Islamweb’s fatwa 93029')} states. On eating or drinking on purpose they split:</p>
<ul>
<li><strong>Hanafi and Maliki</strong>: the make-up day and the full kaffarah. Al-Marghinani writes that whoever eats or drinks food or medicine on purpose owes both.</li>
<li><strong>Shafi‘i</strong>, with the Hanbali school close to it: the make-up day only, with repentance; kaffarah is for intercourse alone. ${h.src('egypt-kaffarah', 'Dar al-Ifta of Egypt')} adopts this view in its fatwa 16806.</li>
</ul>
<p>Someone in the Emirates who ate deliberately on one day of Ramadan and cannot fast two months therefore owes ${t1.value} on the first view and nothing beyond the make-up day on the second. Both views are held by recognised schools; follow your own, or the fatwa body of your country.</p>
${h.mini('kaffarah', { t: 'Feeding sixty poor people, UAE amount', p: ['type', 'times', 'body'], d: { type: 'fast', times: 1, body: 'uae' } })}

<h2>The cost of feeding sixty people in 2026</h2>
<p>Few bodies publish a figure. The ${h.src('b-uae-fatwa-1447', 'UAE Council for Fatwa')} set the kaffarah for spoiling a day of Ramadan at ${h.money(60 * uae.kaffarah!, 'AED')}, distributed to sixty poor people at ${h.money(uae.kaffarah!, 'AED')} each. ${h.src('b-muis-1447', 'MUIS')} in Singapore aligned its kafarah rate with fidyah at ${h.money2(sg.kaffarah!, 'SGD')} per person, ${h.money2(60 * sg.kaffarah!, 'SGD')} for sixty. Pakistan’s ${h.src('b-cii-1447', 'Council of Islamic Ideology')} described the duty as sixty consecutive fasts or feeding sixty needy persons two meals each, without a rupee figure: the amount is sixty times the local price of two simple meals. Elsewhere too, price two simple meals locally and type that as your own amount.</p>
${h.mini('kaffarah', { t: 'Kaffarah with your own meal price', p: ['times', 'per'], d: { type: 'fast', times: 1, body: 'own', per: 7 } })}

<h2>One day or several</h2>
<p>If someone broke several days of the same Ramadan, scholars differ on whether one kaffarah covers them all, when none was paid in between, or whether each day needs its own. The difference is large: one kaffarah or several, each of sixty days of fasting or sixty meals. The calculator’s “how many times” field lets you see both totals; ask a scholar you trust which applies.</p>

<h2>Fasting the sixty days</h2>
<p>For anyone in good health, fasting is the kaffarah, and feeding is not an option to choose for convenience. The sixty days must follow one another. Plan them so that neither Eid nor the days of Tashriq after Eid al-Adha fall inside, since fasting is forbidden on them. Many people start at the beginning of a lunar month: two lunar months then count even if they make fifty-nine days, while a start in mid-month is usually counted as sixty days. Short winter days make the task lighter, and nothing stops you from beginning soon after Ramadan. A day missed without excuse means starting again from day one; days of menstruation and, for many scholars, of illness only pause the count.</p>
<p>The same structure applies to the expiation for zihar, a form of repudiation forbidden in the Qur’an; the UAE Council for Fatwa gave it the same amount as the Ramadan kaffarah for 1447. The kaffarah for an oath is a different, lighter duty, built on ten poor people rather than sixty.</p>

<h2>Feeding in practice</h2>
<p>The sixty must be sixty people, or sixty meals given over time to fewer people on the Hanafi view. Each receives a meal of average quality, the kind your family eats, or its value where cash is accepted. They must be poor and must not be people you are already obliged to maintain. For fasts you simply cannot keep because of age or lasting illness, the lighter duty is ${h.a('fidya', 'fidya')}; for a broken oath, see ${h.a('kaffarah-for-broken-oath', 'kaffarah for a broken oath')}.</p>
`;
    },
  },
  ar: {
    slug: 'kaffarah', nav: 'كفارة الصيام', card: 'كفارة إفساد صوم رمضان عمدًا: صيام شهرين متتابعين أو إطعام ستين مسكينًا، وكلفتها لعام 1447.',
    title: 'كفارة الصيام 2026: إفساد صوم رمضان عمدًا ومقدار الإطعام',
    description: 'كفارة الصيام 2026 لمن أفسد صوم رمضان عمدًا: صيام شهرين متتابعين أو إطعام ستين مسكينًا، ومقدار مجلس الإمارات للإفتاء لعام 1447، وخلاف المذاهب في الأكل عمدًا.',
    h1: 'كفارة إفساد صوم رمضان',
    intro: 'اختر إفساد الصوم، وأدخل عدد الكفارات واختر الجهة الرسمية في بلدك، أو اكتب ثمن الوجبة حيث تقيم.',
    resume: `الكفارة الكبرى تجب على من أفسد صوم يوم من رمضان عمدًا بغير عذر، وهي على الترتيب الوارد في حديث البخاري: عتق رقبة، فإن لم يجد فصيام شهرين متتابعين، فإن لم يستطع فإطعام ستين مسكينًا، مع قضاء ذلك اليوم. وقد قدّر مجلس الإمارات للإفتاء الشرعي كفارة إفساد صوم يوم من رمضان لعام 1447 بـ${A.money(60 * A.fitr('uae').kaffarah!, 'AED')} توزع على ستين مسكينًا، لكل مسكين ${A.money(A.fitr('uae').kaffarah!, 'AED')}. واتفق الفقهاء على وجوبها بالجماع في نهار رمضان عمدًا. واختلفوا فيمن أكل أو شرب عمدًا: فالحنفية والمالكية يوجبون عليه القضاء والكفارة، والشافعية لا يوجبون إلا القضاء مع التوبة، وهو ما اختارته دار الإفتاء المصرية. فالفرق بين القولين في الإمارات ${A.money(60 * A.fitr('uae').kaffarah!, 'AED')} أو لا شيء سوى قضاء اليوم. ولم تُعلن مقادير 1448 بعد. ومن عجز عن الصيام عجزًا دائمًا فواجبه الفدية لا الكفارة، وهي أخف منها بكثير.`,
    faqs: [
      { q: 'متى يجوز الانتقال من الصيام إلى الإطعام في كفارة رمضان؟', a: 'إذا عجز المكفّر عن صيام شهرين متتابعين لمرض أو كبر أو مشقة حقيقية. فالترتيب في الحديث واجب: الصيام أولًا، والإطعام بدل عند العجز. ومن قدر على الصيام لكنه استثقله فلا ينتقل إلى الإطعام عند أكثر العلماء، بل يختار وقتًا أيسر عليه كأيام الشتاء القصيرة.' },
      { q: 'ما الذي يقطع تتابع الشهرين في الكفارة؟', a: 'الفطر بغير عذر يقطع التتابع فيستأنف العدّ من جديد. أما الحيض فلا يقطعه، ويلحق به كثير من العلماء المرض. ويجب أن يتجنب يومي العيدين وأيام التشريق التي يحرم صومها، فليختر المكفّر وقتًا يتسع للشهرين كاملين دون أن يدخلها شيء من تلك الأيام.' },
      { q: 'هل تجب الكفارة على من أفطر ناسيًا أو مخطئًا؟', a: 'لا. الأكل والشرب نسيانًا لا يفسد الصوم عند الجمهور أصلًا، ومن أفطر ظانًّا غروب الشمس ثم تبين خطؤه فعليه القضاء وحده. وإنما تجب الكفارة على من تعمد الإفساد عالمًا بالتحريم في نهار رمضان نفسه، لا في صوم قضاء ولا نذر ولا تطوع.' },
    ],
    body: (h) => {
      const u = h.fitr('uae');
      const sar = 25, kwd = 2;
      return `
<h2>أصل الكفارة في السنة</h2>
<p>جاء رجل إلى النبي صلى الله عليه وسلم فأخبره أنه وقع على امرأته وهو صائم في رمضان، فسأله: هل تجد رقبة تعتقها؟ قال: لا. قال: فهل تستطيع أن تصوم شهرين متتابعين؟ قال: لا. قال: فهل تجد إطعام ستين مسكينًا؟ (${h.src('bukhari-1936', 'صحيح البخاري 1936')}). فهذا الترتيب هو بناء الكفارة: العتق ثم الصيام ثم الإطعام. ولما انقطع الرق في زماننا صار أول الواجب صيام شهرين متتابعين، ولا يُنتقل إلى إطعام ستين مسكينًا إلا لمن عجز عن الصيام.</p>

<h2>ما الذي يوجبها: قولان ومبلغان</h2>
<p>أجمع الفقهاء على وجوب الكفارة على من جامع في نهار رمضان عامدًا عالمًا بالتحريم، كما تنص ${h.src('islamweb-kaffarah', 'فتوى إسلام ويب 93029')}. واختلفوا في الأكل والشرب عمدًا:</p>
<ul>
<li><strong>الحنفية والمالكية</strong>: عليه القضاء والكفارة جميعًا. قال المرغيناني: ولو أكل أو شرب ما يُتغذى به أو ما يُتداوى به فعليه القضاء والكفارة.</li>
<li><strong>الشافعية</strong>، والحنابلة قريب منهم: عليه القضاء وحده مع التوبة، ولا كفارة إلا بالجماع. وهذا ما اختارته ${h.src('egypt-kaffarah', 'دار الإفتاء المصرية في فتواها 16806')}.</li>
</ul>
<p>فمن أكل عمدًا يومًا من رمضان في أبوظبي وعجز عن الصيام يخرج على القول الأول ${h.money(60 * u.kaffarah!, 'AED')}، ولا يلزمه على القول الثاني إلا قضاء اليوم والتوبة. وكلا القولين معتبر، فليتبع المكلف مذهبه أو جهة الفتوى في بلده.</p>
${h.mini('kaffarah', { t: 'إطعام ستين مسكينًا بمقدار الإمارات', p: ['type', 'times', 'body'], d: { type: 'fast', times: 1, body: 'uae' } })}

<h2>كلفة الإطعام في البلاد العربية</h2>
<p>قليل من الجهات يعلن مبلغًا للكفارة. وقد حدده ${h.src('b-uae-fatwa-1447', 'مجلس الإمارات للإفتاء الشرعي')} لعام 1447 بـ${h.money(60 * u.kaffarah!, 'AED')} لكفارة إفساد صوم يوم من رمضان أو الظهار، توزع على ستين مسكينًا لكل منهم ${h.money(u.kaffarah!, 'AED')}، بناء على دراسة ميدانية مع وزارة الاقتصاد والسياحة. ولم نجد مقدارًا رسميًا لعام 1447 في السعودية ولا الكويت ولا مصر ولا الأردن. فمن كان فيها يقدّر ثمن وجبة وسط مما يطعم أهله ويكتبه في الحاسبة: فلو كانت الوجبة في الرياض بـ${h.money(sar, 'SAR')} لبلغت الكفارة ${h.money(60 * sar, 'SAR')}، ولو كانت في الكويت بـ${h.money(kwd, 'KWD')} لبلغت ${h.money(60 * kwd, 'KWD')}. والأسعار هنا افتراضية للمثال.</p>
${h.mini('kaffarah', { t: 'الكفارة بثمن الوجبة في بلدك', p: ['times', 'per'], d: { type: 'fast', times: 1, body: 'own', per: 25 } })}

<h2>يوم واحد أم أيام</h2>
<p>من أفسد أكثر من يوم في رمضان واحد اختلف العلماء في حقه: فمنهم من يرى أن كفارة واحدة تكفيه عن أيام رمضان الواحد إذا لم يكفّر بينها، ومنهم من يوجب لكل يوم كفارة مستقلة. والفرق كبير، إذ قد تكون كفارة واحدة أو عدة كفارات كل منها شهران أو ستون وجبة. وخانة «عدد المرات» في الحاسبة تبين لك المجموع على القولين، والأولى سؤال عالم تثق به في حالتك.</p>

<h2>صيام الشهرين في الواقع</h2>
<p>الصيام هو الكفارة لمن كان صحيحًا قادرًا، وليس الإطعام خيارًا يُلجأ إليه طلبًا للأيسر. ويُشترط التتابع، فليرتب المكفّر صيامه بحيث لا يدخل فيه يوم العيد ولا أيام التشريق. ومن بدأ مع أول الشهر الهجري أجزأه شهران بالأهلّة ولو كانا تسعة وخمسين يومًا، ومن بدأ في أثناء الشهر فالعدّ عند كثير من العلماء ستون يومًا. وأيام الشتاء القصيرة أخف على الصائم، ولا مانع من البدء بعد رمضان مباشرة. ومن أفطر يومًا بغير عذر استأنف من أوله.</p>
<p>وعلى هذا البناء نفسه كفارة الظهار، وقد جعل لها مجلس الإمارات للإفتاء الشرعي المقدار نفسه لعام 1447. أما كفارة اليمين فأخف منها، وهي إطعام عشرة مساكين أو كسوتهم، فإن عجز صام ثلاثة أيام.</p>

<h2>كيف يكون الإطعام</h2>
<p>يُطعم ستون مسكينًا من أوسط ما يطعم أهله، ويجوز عند الحنفية أن يُطعم مسكينًا واحدًا ستين يومًا. ويُشترط أن يكونوا فقراء، وألا يكونوا ممن تلزمه نفقتهم كالوالدين والأولاد والزوجة. ويجوز إخراج القيمة عند الحنفية وفي عمل الجهات التي تعلن مبلغًا نقديًا. ومن عجز عن الصيام عجزًا دائمًا فعليه ${h.a('fidya', 'الفدية')} لا الكفارة، ولزكاة الفطر صفحة ${h.a('zakat-al-fitr', 'زكاة الفطر')}.</p>
`;
    },
  },
});
