import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en'), A = makeKit('ar');
const sa = E.P.fitr.saKg;
const withFitr = E.FITR.filter((r) => r.fitr !== undefined);

export default defineGuide({
  id: 'zakat-al-fitr', group: 'fitr', order: 10, tool: 'fitr',
  related: ['fitrana', 'zakat-fitrah', 'fidya', 'who-can-receive-zakat', 'zakat-calculator-uae', 'zakat-calculator-usa'],
  sources: ['bukhari-1503', 'egypt-fitr-cash', 'egypt-fitr-hanafi', 'islamweb-fitr-cash', 'jordan-fitr-cash', 'b-uae-fatwa-1447', 'b-fcna-1447'],
  en: {
    slug: 'zakat-al-fitr', nav: 'Zakat al-fitr', card: 'The official amount per person for 2026 country by country, the sa’ in kilograms, and whether cash is accepted.',
    title: 'Zakat al-Fitr 2026: Official Amount per Person by Country',
    description: 'Zakat al-fitr 2026: the official amount per person set by fatwa councils and zakat bodies in 12 countries, the sa’ in kilograms and the debate on paying cash.',
    h1: 'Zakat al-fitr: how much per person',
    intro: 'Enter the number of people you pay for and pick the body of your country, or type your own amount per person if none publishes one.',
    resume: `Zakat al-fitr is one sa’ of staple food for every Muslim in the household, young or old, paid before the Eid prayer that ends Ramadan. The sa’ is a measure of volume; converted to weight it is about ${sa.majority} kg of wheat for the majority of scholars, according to Dar al-Ifta of Egypt, ${sa.jordan} kg for the Jordanian Iftaa Council and the UAE Council for Fatwa, and about ${sa.caution} kg as a precaution in Saudi practice. For Ramadan 1447, official bodies converted it into cash: ${E.money(E.fitr('uae').fitr!, 'AED')} in the Emirates, ${E.money(E.fitr('egypt').fitr!, 'EGP')} in Egypt as a minimum, ${E.money(E.fitr('pakistan').fitr!, 'PKR')} in Pakistan on wheat, ${E.money(E.fitr('usa').fitr!, 'USD')} recommended by the Fiqh Council of North America. A family of five in the Emirates therefore paid ${E.money(5 * E.fitr('uae').fitr!, 'AED')}. Paying in cash is accepted by the Hanafi school and by these bodies; the Maliki, Shafi‘i and Hanbali schools ask for food. Amounts for 1448 are to be published before Ramadan.`,
    faqs: [
      { q: 'Who do I have to pay zakat al-fitr for?', a: 'For yourself and for every Muslim you are responsible for maintaining: your wife, your young children, and dependants who live on your income. A baby born before sunset on the last day of Ramadan is included. Adult children with their own income pay for themselves, though a parent may pay on their behalf.' },
      { q: 'What is the latest time to pay zakat al-fitr?', a: 'Before the Eid prayer, as the hadith in al-Bukhari says. Many scholars allow paying a day or two before Eid, and some schools allow it earlier in Ramadan, which lets the payment reach the poor in time. Paying after the prayer counts as ordinary charity on the view of most scholars.' },
      { q: 'Does someone who did not fast still pay zakat al-fitr?', a: 'Yes. The duty is tied to being alive at the end of Ramadan and having more than a day’s food for the household, not to having fasted. The sick, travellers, the elderly and children all fall under it, and the head of the family pays for those who depend on him.' },
      { q: 'Can I give zakat al-fitr to a relative?', a: 'To a poor relative whom you are not obliged to maintain, yes, and many scholars see it as better. You cannot give it to your parents, grandparents, children or wife, because you already owe them maintenance. The recipients are the poor and needy, the first categories of zakat.' },
    ],
    body: (h) => {
      const rows = withFitr.map((r) => [r.country.en, r.body.en, h.money2(r.fitr!, r.cur), h.day(r.date)]);
      return `
<h2>Where the duty comes from</h2>
<p>Ibn ‘Umar reports that the Prophet made zakat al-fitr obligatory as one sa’ of dates or one sa’ of barley on every Muslim, slave or free, male or female, young or old, and ordered that it be paid before people go out to the prayer (${h.src('bukhari-1503', 'Sahih al-Bukhari 1503')}). Two aims are usually given: it cleanses the fast of idle talk, and it makes sure the poor have food on the day of Eid. That second aim explains why the timing is strict and why the recipients are the poor and needy.</p>
<p>The duty falls on anyone who, on the night of Eid, has more than the food needed by his household for that day and night. It does not depend on the nisab of zakat on wealth. The head of the family pays for those he maintains.</p>

<h2>How much is one sa’</h2>
<p>The sa’ is a volume, four double handfuls, so its weight depends on the food. Bodies convert it differently:</p>
<ul>
<li><strong>${sa.majority} kg of wheat</strong>: the reading of the majority, used by ${h.src('egypt-fitr-cash', 'Dar al-Ifta of Egypt')}.</li>
<li><strong>${sa.jordan} kg</strong>: the Jordanian Iftaa Council for wheat, the ${h.src('b-uae-fatwa-1447', 'UAE Council for Fatwa')} and Indonesia’s BAZNAS for rice.</li>
<li><strong>About ${sa.caution} kg</strong>: the cautious figure used in Saudi Arabia.</li>
<li><strong>Half a sa’ of wheat, ${sa.hanafiHalfSaKg} kg</strong>, or a full sa’ of dates or barley, ${sa.hanafiSaKg} kg: the Hanafi measure, as ${h.src('egypt-fitr-hanafi', 'Dar al-Ifta')} explains it.</li>
</ul>
<p>The choice changes the amount. At a price of 2 units of your currency per kilo of rice, a family of four gives ${h.num(4 * sa.majority * 2, 2)} on the ${sa.majority} kg reading and ${h.num(4 * sa.caution * 2, 2)} on the ${sa.caution} kg reading. Where a body has fixed a cash amount, that figure already contains its choice.</p>

<h2>Official amounts for Ramadan 1447</h2>
<p>The table lists every amount published by a government body, a statutory zakat agency or a fatwa council for 2026. Charities also publish figures; this site leaves them out. Where a body gives tiers, the table shows the lowest, which several bodies describe as a minimum.</p>
${h.table(['Country', 'Body', 'Per person', 'Published'], rows, 'Zakat al-fitr per person, Ramadan 1447 (2026). Amounts for 1448 are to be published before Ramadan.', ['l', 'l', 'r', 'r'])}
<p>No official amount was found for the United Kingdom, Canada, India, Saudi Arabia or Kuwait. In those countries, choose My own amount in the calculator and enter the local price of one sa’ of the staple your household eats.</p>
${h.mini('fitr', { t: 'Zakat al-fitr with your own price per person', p: ['n', 'body', 'per'], d: { n: 4, body: 'own', per: 12 } })}

<h2>Food or money: the two positions</h2>
<p>The question divides the schools, and the amount you give can differ with it. The Maliki, Shafi‘i and Hanbali schools hold that zakat al-fitr must be given as food, since the hadith names foods. The Hanafi school allows its value in money, and Ibn Taymiyya accepted cash where it serves the poor better, as ${h.src('islamweb-fitr-cash', 'Islamweb’s fatwa')} summarises; it calls both views recognised. ${h.src('egypt-fitr-cash', 'Dar al-Ifta of Egypt')} considers cash permissible and closer to the purpose, and the ${h.src('jordan-fitr-cash', 'Jordanian Iftaa Department')} notes that the Hanafis allowed it because it is more useful to the poor and easier for the payer.</p>
<p>In practice, the bodies that publish a cash figure have taken the Hanafi position for their public. A family that follows the majority view buys the rice or wheat itself and hands it over, or asks a trusted person to do so.</p>

<h2>Who receives it</h2>
<p>Most scholars restrict zakat al-fitr to the poor and the needy, because its purpose is to feed them on the day of Eid. One poor family may receive the fitr of several households, and the fitr of one person may be split between several recipients. It is normally paid where you live, and many scholars allow sending it to a country in greater need. The ${h.a('who-can-receive-zakat', 'recipients page')} sets out the eight categories of zakat.</p>

<h2>When to pay in 1448</h2>
<p>On the Umm al-Qura calendar, Ramadan 1448 is expected to begin on ${h.day(h.ramadan1448)} and Eid al-Fitr to fall on ${h.day(h.shawwal1448)}; local sighting may shift both by a day. The obligation becomes fixed at sunset on the last day of Ramadan, and the payment should reach the poor before the Eid prayer. Amounts for 1448 are to be published before Ramadan; the ${h.a('fitrana', 'fitrana page')} and the ${h.a('zakat-fitrah', 'zakat fitrah page')} cover South Asia and South East Asia in more detail.</p>
`;
    },
  },
  ar: {
    slug: 'zakat-al-fitr', nav: 'زكاة الفطر', card: 'مقدار زكاة الفطر عن الفرد لعام 1447 في الدول العربية وغيرها، ووزن الصاع، وحكم إخراجها نقدًا.',
    title: 'زكاة الفطر 2026: مقدارها عن الفرد بالريال والدرهم والجنيه',
    description: 'زكاة الفطر 2026: المقدار عن الفرد كما أعلنته دور الإفتاء وهيئات الزكاة لعام 1447، ووزن الصاع بالكيلوغرام عند كل جهة، وخلاف المذاهب في إخراج القيمة نقدًا.',
    h1: 'زكاة الفطر: كم تُخرج عن كل فرد',
    intro: 'أدخل عدد من تُخرج عنهم واختر الجهة الرسمية في بلدك، أو اكتب مبلغك عن الفرد إن لم تُعلن جهتك مقدارًا.',
    resume: `زكاة الفطر صاع من غالب قوت البلد عن كل مسلم تعوله، صغيرًا كان أو كبيرًا، تُخرج قبل صلاة العيد. والصاع مكيال لا وزن، فاختلفت الجهات في تقديره: ${A.dec(sa.majority, 2)} كغ من القمح عند الجمهور كما تذكر دار الإفتاء المصرية، و${A.dec(sa.jordan, 1)} كغ عند مجلس الإفتاء الأردني ومجلس الإمارات للإفتاء الشرعي، ونحو ${sa.caution} كغ احتياطًا في العمل السعودي. وقد حددت الجهات الرسمية قيمتها لعام 1447: ${A.money(A.fitr('uae').fitr!, 'AED')} في الإمارات، و${A.money(A.fitr('qatar').fitr!, 'QAR')} في قطر، و${A.money(A.fitr('egypt').fitr!, 'EGP')} حدًّا أدنى في مصر، و${A.money2(A.fitr('jordan').fitr!, 'JOD')} في الأردن، و${A.money(A.fitr('morocco').fitr!, 'MAD')} في المغرب، و${A.money(A.fitr('algeria').fitr!, 'DZD')} في الجزائر. فأسرة من ستة أفراد في الدوحة أخرجت ${A.money(6 * A.fitr('qatar').fitr!, 'QAR')}. ويجيز الحنفية إخراج القيمة، ويشترط المالكية والشافعية والحنابلة الطعام، فمن اتبع قولهم اشترى الأرز أو القمح وسلمه إلى الفقير. ومن كان في بلد لم تعلن فيه جهة رسمية مبلغًا، كالسعودية والكويت، يحسب ثمن الصاع بسعر السوق ويكتبه في الحاسبة. أما مقادير 1448 فلم تُعلن بعد، وتصدر عادة قبيل رمضان أو في أوله.`,
    faqs: [
      { q: 'عمّن يجب عليّ إخراج زكاة الفطر؟', a: 'عن نفسك وعن كل مسلم تلزمك نفقته: الزوجة والأولاد الصغار ومن يعيش في كفالتك. ويدخل المولود إذا وُلد قبل غروب شمس آخر يوم من رمضان. أما الأولاد البالغون الذين لهم دخل فيخرجون عن أنفسهم، ويجوز للأب أن يخرج عنهم بإذنهم.' },
      { q: 'ما آخر وقت لإخراج زكاة الفطر؟', a: 'قبل صلاة العيد كما في حديث البخاري. ويجيز كثير من العلماء تقديمها بيوم أو يومين، ويجيز بعض المذاهب إخراجها قبل ذلك في رمضان حتى تصل إلى الفقير في وقتها. ومن أخّرها إلى ما بعد الصلاة بغير عذر فهي عند أكثر العلماء صدقة من الصدقات.' },
      { q: 'هل تجب زكاة الفطر على من أفطر رمضان لعذر؟', a: 'نعم. الوجوب متعلق بإدراك آخر رمضان وملك ما يزيد على قوت يوم العيد وليلته، لا بالصيام نفسه. فالمريض والمسافر والكبير العاجز والطفل كلهم تُخرج عنهم، ويخرجها رب الأسرة عمن يعولهم من ماله، ولا يسقطها الفطر لعذر ولا ترك الصيام بغير عذر، وإن كان الثاني إثمًا مستقلًا.' },
      { q: 'هل يجوز دفع زكاة الفطر إلى أقاربي؟', a: 'يجوز دفعها إلى القريب الفقير الذي لا تلزمك نفقته، كالأخ والعم وابن العم، وهو أولى عند كثير من العلماء. ولا تُدفع إلى الوالدين والأجداد ولا إلى الأولاد والزوجة، لأن نفقتهم واجبة عليك أصلًا، فلا تكون الزكاة بدلًا منها. ومصرفها الفقراء والمساكين من الأقارب وغيرهم.' },
    ],
    body: (h) => {
      const arab = ['uae', 'qatar', 'egypt', 'jordan', 'morocco', 'algeria', 'tunisia'].map((id) => h.fitr(id));
      const rows = arab.map((r) => [r.country.ar, r.body.ar, h.money2(r.fitr!, r.cur), h.day(r.date)]);
      const riceSar = 6;
      return `
<h2>أصل الوجوب وحكمته</h2>
<p>روى ابن عمر رضي الله عنهما أن النبي صلى الله عليه وسلم فرض زكاة الفطر صاعًا من تمر أو صاعًا من شعير على العبد والحر، والذكر والأنثى، والصغير والكبير من المسلمين، وأمر بها أن تؤدى قبل خروج الناس إلى الصلاة (${h.src('bukhari-1503', 'صحيح البخاري 1503')}). ويذكر العلماء لها حكمتين: أنها طهرة للصائم من اللغو والرفث، وطعمة للمساكين يستغنون بها يوم العيد عن السؤال. ومن هنا جاء التشديد في وقتها، وقصر مصرفها على الفقراء والمساكين.</p>
<p>وتجب على من ملك ليلة العيد ما يزيد على قوته وقوت من يعولهم يومه وليلته، ولا يُشترط فيها النصاب المعروف في زكاة المال، فقد تجب على من لا تجب عليه زكاة ماله.</p>

<h2>كم يزن الصاع</h2>
<p>الصاع أربعة أمداد، والمد ملء كفي الرجل المعتدل، فهو كيل يختلف وزنه باختلاف الطعام. ولذلك تتعدد تقديرات الجهات:</p>
<ul>
<li><strong>${h.dec(sa.majority, 2)} كغ من القمح</strong> على مذهب الجمهور، وهو ما تعتمده ${h.src('egypt-fitr-cash', 'دار الإفتاء المصرية')}.</li>
<li><strong>${h.dec(sa.jordan, 1)} كغ</strong> من القمح في الأردن، ومن الأرز عند ${h.src('b-uae-fatwa-1447', 'مجلس الإمارات للإفتاء الشرعي')}.</li>
<li><strong>نحو ${sa.caution} كغ</strong> احتياطًا، وهو المعمول به في السعودية.</li>
<li><strong>نصف صاع من البر، ${h.dec(sa.hanafiHalfSaKg, 3)} كغ</strong>، أو صاع كامل من التمر أو الشعير، ${h.dec(sa.hanafiSaKg, 2)} كغ، عند الحنفية كما تشرح ${h.src('egypt-fitr-hanafi', 'دار الإفتاء')}.</li>
</ul>
<p>ويتغير المبلغ بتغير التقدير. فلو كان ثمن كيلو الأرز ${h.num(riceSar)} وحدات من عملتك، فإن أسرة من خمسة أفراد تخرج ${h.num(5 * sa.majority * riceSar, 2)} على تقدير ${h.dec(sa.majority, 2)} كغ، و${h.num(5 * sa.caution * riceSar, 2)} على تقدير ${sa.caution} كغ. والسعر هنا رقم مجرد للمثال لا سعر سوق، ولم نجد مبلغًا نقديًا رسميًا لعام 1447 في السعودية، لأن الأصل فيها الإخراج طعامًا.</p>

<h2>المقادير الرسمية لعام 1447 في الدول العربية</h2>
<p>يجمع الجدول المبالغ التي أعلنتها جهات رسمية أو مجالس إفتاء لرمضان 1447. وما تعلنه الجمعيات الخيرية لا يُذكر هنا. وحيث تعلن الجهة فئات متعددة يذكر الجدول أدناها، وهو الحد الأدنى عند كثير منها.</p>
${h.table(['الدولة', 'الجهة', 'عن الفرد', 'تاريخ الإعلان'], rows, 'زكاة الفطر عن الفرد لرمضان 1447 (2026). مقادير 1448 لم تُعلن بعد.', ['l', 'l', 'r', 'r'])}
<p>ولم نعثر على مبلغ رسمي لعام 1447 في السعودية ولا في الكويت ولا في البحرين ولا في عُمان. فمن كان في هذه البلاد يختار في الحاسبة خيار «مبلغ أحدده بنفسي» ويكتب ثمن صاع من قوت أهله بسعر السوق.</p>
${h.mini('fitr', { t: 'زكاة الفطر لأسرة في قطر', p: ['n', 'body'], d: { n: 6, body: 'qatar' } })}

<h2>الطعام أم القيمة</h2>
<p>هذه مسألة خلافية يتغير فيها ما تخرجه. فالمالكية والشافعية والحنابلة على أن زكاة الفطر لا تجزئ إلا طعامًا، لأن الحديث نص على الأطعمة. والحنفية يجيزون إخراج القيمة، واختار ابن تيمية الإجزاء إذا كانت القيمة أنفع للفقير، كما تلخص ${h.src('islamweb-fitr-cash', 'فتوى إسلام ويب')} التي تعد القولين معتبرين. وترى ${h.src('egypt-fitr-cash', 'دار الإفتاء المصرية')} جواز إخراجها مالًا وأنه أوفق لمقاصد الشرع، وتنقل ${h.src('jordan-fitr-cash', 'دائرة الإفتاء الأردنية')} أن الحنفية أجازوا القيمة لأنها أنفع للفقير وأيسر على المزكي.</p>
<p>والجهات التي تعلن مبلغًا نقديًا أخذت بقول الحنفية لعموم الناس. ومن يتبع قول الجمهور يشتري الأرز أو القمح بنفسه ويسلمه إلى الفقير، أو يوكّل من يثق به في ذلك.</p>

<h2>لمن تُدفع</h2>
<p>مصرف زكاة الفطر عند جمهور العلماء الفقراء والمساكين خاصة، لأن مقصودها إغناؤهم يوم العيد. ويجوز أن تُعطى فطرة الأسرة كلها لفقير واحد، وأن تُقسم فطرة الفرد الواحد على أكثر من فقير. وتُدفع في البلد الذي يقيم فيه المزكي عادة، ويجيز كثير من العلماء نقلها إلى بلد أشد حاجة. وتفصيل الأصناف الثمانية في صفحة ${h.a('who-can-receive-zakat', 'مستحقي الزكاة')}.</p>

<h2>موعدها في رمضان 1448</h2>
<p>بحسب تقويم أم القرى يُتوقع أن يبدأ رمضان 1448 في ${h.day(h.ramadan1448)}، وأن يكون عيد الفطر في ${h.day(h.shawwal1448)}، وقد تختلف الرؤية المحلية بيوم. ويستقر الوجوب بغروب شمس آخر يوم من رمضان، والسنة أن تصل إلى الفقير قبل صلاة العيد. ومقادير 1448 لم تُعلن بعد، وتصدر عادة في الأسابيع الأولى من رمضان أو قبله. ولمن فاته صيام لا يقدر على قضائه صفحة ${h.a('fidya', 'الفدية')}، ولمن أفسد صومه صفحة ${h.a('kaffarah', 'الكفارة')}.</p>
`;
    },
  },
});
