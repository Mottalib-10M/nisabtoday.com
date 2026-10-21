import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en'), A = makeKit('ar');

export default defineGuide({
  id: 'who-can-receive-zakat', group: 'zakat', order: 70, tool: 'receive',
  toolArg: { own: 45000 },
  related: ['zakat-meaning', 'zakat-al-maal', 'nisab', 'zakat-al-fitr', 'zakat-on-debts', 'zakat-calculator-pakistan'],
  sources: ['quran-9-60', 'ppz-asnaf', 'a-egypt-maintenance', 'pk-faq', 'a-bukhari-1395', 'iifa-debts'],
  en: {
    slug: 'who-can-receive-zakat', nav: 'Who can receive zakat', card: 'The eight groups of Qur’an 9:60, the nisab test of poverty, and the relatives you cannot pay.',
    title: 'Zakat Recipients 2026: The Eight Groups and Who Is Excluded',
    description: 'Zakat recipients in 2026: the eight groups named in Qur’an 9:60, the nisab test of who is poor, and why parents, children and a wife cannot take your zakat.',
    h1: 'Who can receive zakat',
    intro: 'Enter what the person owns beyond their basic needs; the tool compares it with today’s nisab, the test the Hanafi school uses for receiving zakat as poor.',
    resume: `Zakat can go only to the eight groups named in Qur’an 9:60: the poor, the needy, those employed to collect it, those whose hearts are to be won over, the freeing of captives, people in debt, the cause of God and the stranded traveller. In everyday terms most zakat reaches the first two: people who do not have enough to meet their needs. The Hanafi school draws the line with the nisab itself: someone who owns, beyond home, clothes and tools, less than ${E.money(E.nisab('silver', 'BDT'), 'BDT')} today, the silver nisab in Bangladesh at the prices of ${E.priceDay}, may receive zakat as poor. Your zakat cannot go to those you are already bound to support: Dar al-Ifta of Egypt cites the rule that it may not go to parents and grandparents, to children and grandchildren, or from a husband to his wife. Pakistan’s state system pays it only to Muslim citizens living below the poverty line.`,
    faqs: [
      { q: 'Can I give zakat to my brother or sister?', a: 'The condition that excludes relatives is about maintenance: zakat may not go to someone whose living costs you are already obliged to cover. Parents and children fall under it, and so does a wife for her husband. A brother or sister with their own household is usually outside that duty, so many scholars allow it if they are eligible. Ask if they live on your support.' },
      { q: 'Can zakat be given to a person who has a job?', a: 'Yes, if their income does not cover their basic needs and they do not own the nisab beyond them. Having a salary is not the test; whether it is enough is. A worker supporting a large family on a low wage can be among the needy, while someone without a job but with savings above the nisab is not poor in the zakat sense.' },
      { q: 'Can I pay off someone’s debt with my zakat?', a: 'People in debt, al-gharimin, are one of the eight groups. A person who cannot repay a lawful debt can receive zakat to clear it, either given to them or, in many fatwas, paid directly to the creditor on their behalf. The debt must be real and due, and the person unable to pay it from what they own.' },
      { q: 'Can zakat be given to non-Muslims?', a: 'Schools differ on some of the eight groups, notably those whose hearts are to be won over. Pakistan’s Zakat and Ushr Department states that non-Muslims are not eligible under its law. Many scholars apply the same rule to the poor and needy categories, and suggest voluntary sadaqah for a non-Muslim in need instead.' },
    ],
    body: (h) => {
      const c = 'BDT';
      const n = h.nisab('silver', c), ng = h.nisab('gold', c);
      const low = h.tool('receive', { own: 45000, cur: c });
      const high = h.tool('receive', { own: Math.ceil(n / 10000) * 10000 + 20000, cur: c });
      return `
<h2>The eight groups of the verse</h2>
<p>The list is closed. “Zakah expenditures are only for”, the verse begins, and then names eight groups (${h.src('quran-9-60', 'Qur’an 9:60')}). Statutory bodies repeat it as it stands; the ${h.src('ppz-asnaf', 'Federal Territories zakat centre in Malaysia')} calls them the eight asnaf. Their Arabic names are worth knowing because fatwas use them.</p>
${h.table(['Group', 'Arabic', 'Who it covers today'], [
        ['The poor', 'al-fuqara’', 'People with little or nothing to meet their needs'],
        ['The needy', 'al-masakin', 'People who earn something but not enough'],
        ['Zakat workers', 'al-‘amilin ‘alayha', 'Staff appointed to collect and distribute zakat'],
        ['Hearts to be won', 'al-mu’allafati qulubuhum', 'New Muslims and others whose goodwill is sought'],
        ['Captives', 'fi al-riqab', 'Freeing people from bondage'],
        ['Debtors', 'al-gharimin', 'People unable to repay a lawful debt'],
        ['Cause of God', 'fi sabil Allah', 'Read narrowly by most jurists, more widely by some bodies'],
        ['Traveller', 'ibn al-sabil', 'Someone stranded away from home, even if rich at home'],
      ], 'The recipients named in Qur’an 9:60.', ['l', 'l', 'l'])}
<p>The hadith of Mu‘adh sums up the main flow: zakat is “taken from the wealthy among them and given to the poor” (${h.src('a-bukhari-1395', 'Sahih al-Bukhari 1395')}). Most of what a family pays will therefore go to the first two groups, directly or through a body that distributes it.</p>

<h2>Who counts as poor: the nisab test</h2>
<p>The Hanafi school uses the same threshold for both sides of zakat. Someone who owns the nisab beyond their basic needs is wealthy for this purpose and pays; someone who owns less may receive. Basic needs here means the home they live in, clothing, furniture, the tools of their trade and a means of transport, not savings or gold kept aside. In Bangladesh today the silver nisab is ${h.money(n, c)}; on the gold measure it would be ${h.money(ng, c)}.</p>
<p>A widow in Sylhet with ${h.money(45000, c)} saved and nothing else beyond her needs comes out as “${low.value}” on this test. A shopkeeper with ${h.money(Math.ceil(n / 10000) * 10000 + 20000, c)} of stock and cash comes out as “${high.value}”, even if business is slow. The other schools frame the question differently, asking whether the person’s income and assets cover a year of needs for them and their dependants; the result is often the same, but not always, which is why the tool states the test it applies.</p>
${h.mini('receive', { t: 'Is this person below the nisab?', p: ['own'], d: { own: 45000, cur: c } })}

<h2>People you cannot pay with your own zakat</h2>
<p>A condition shared by the four schools is that the person receiving must not be someone whose maintenance you already owe. Dar al-Ifta of Egypt states it plainly in its ${h.src('a-egypt-maintenance', 'fatwa 18483')}: if the recipient is among those the payer must support, zakat may not be given to them. It quotes al-Kasani applying this to parents “however high” and children “however low”, that is grandparents and grandchildren too, and adds that a man may not give zakat to his wife, by consensus. The reasoning is simple: paying them would only shift money you owe them anyway, and the benefit would return to you.</p>
<p>Relatives outside that duty, such as a brother, a sister, an aunt or a cousin with their own household, are not caught by the condition. If they are poor or in debt, they can receive your zakat like anyone else in the eight groups, and many families start there. What decides the case is the duty of support under your own school and circumstances, not the closeness of the tie, so a married daughter living on her husband’s income is treated differently from a son still at home.</p>

<h2>Debtors and travellers</h2>
<p>Two groups are often forgotten. The gharimin are people who cannot meet a lawful debt: a family that borrowed to cover a hospital bill, a tenant facing eviction over arrears. Zakat can clear the debt even if their monthly income is otherwise adequate, because the debt itself is the need. The traveller, ibn al-sabil, can receive zakat while stranded even if he owns property at home, because he cannot reach it. For the money you are owed rather than the money others owe, see the ${h.a('zakat-on-debts', 'page on debts and zakat')}; the ${h.src('iifa-debts', 'Fiqh Academy’s resolution 1')} covers how a lender counts a loan that may not come back.</p>

<h2>When the state chooses for you</h2>
<p>In Pakistan, zakat deducted at source by banks goes into the public zakat system, and the ${h.src('pk-faq', 'Punjab Zakat and Ushr Department')} sets its own rule for recipients: a Muslim citizen of Pakistan living below the poverty line. It states that non-Muslims are not eligible. Where no such system exists, you choose the recipient yourself. The calculators on this site compute what you owe; they do not recommend anyone to pay it to. For a close case, a relative whose position is unclear or a debt you are unsure about, ask a scholar you trust.</p>
`;
    },
  },
  ar: {
    slug: 'who-can-receive-zakat', nav: 'مستحقو الزكاة', card: 'الأصناف الثمانية في آية التوبة، ومعيار الفقر بالنصاب، ومن لا تُدفع إليهم زكاتك.',
    title: 'مستحقو الزكاة 2026: الأصناف الثمانية ومن لا تُعطى لهم',
    description: 'مستحقو الزكاة 2026: الأصناف الثمانية في سورة التوبة، ومعيار الفقر بالنصاب عند الحنفية، ولماذا لا تُدفع الزكاة إلى الوالدين والأولاد والزوجة، مع أمثلة بالدينار.',
    h1: 'من يستحق الزكاة',
    intro: 'أدخل ما يملكه الشخص زائدًا عن حاجاته الأصلية، فتقارنه الحاسبة بنصاب اليوم، وهو معيار الحنفية في أخذ الزكاة بوصف الفقر.',
    resume: `لا تُصرف الزكاة إلا في الأصناف الثمانية التي حصرتها آية التوبة: الفقراء، والمساكين، والعاملين عليها، والمؤلفة قلوبهم، وفي الرقاب، والغارمين، وفي سبيل الله، وابن السبيل. وأكثر ما تذهب إليه الزكاة في الواقع الصنفان الأولان، أي من لا يجد كفايته. ويجعل الحنفية النصاب نفسه حدًا بين المعطي والآخذ: فمن ملك فاضلًا عن مسكنه وثيابه وأدوات عمله أقل من ${A.money(A.nisab('silver', 'JOD'), 'JOD')}، وهو نصاب الفضة في الأردن بأسعار ${A.priceDay}، جاز له أخذ الزكاة بوصف الفقر. ولا يجوز أن تدفع زكاتك إلى من تلزمك نفقته: فقد نقلت دار الإفتاء المصرية أنها لا تُدفع إلى الوالدين وإن علوا ولا إلى الأولاد وإن نزلوا، ولا من الزوج إلى زوجته بالإجماع. أما الإخوة والأعمام وسائر الأقارب الذين لا تجب عليك نفقتهم فيجوز إعطاؤهم إن كانوا من أهلها.`,
    faqs: [
      { q: 'هل يجوز إعطاء الزكاة للأخ أو الأخت؟', a: 'الشرط المانع متعلق بالنفقة: لا تُدفع الزكاة إلى من تلزمك نفقته. والأخ أو الأخت المستقل ببيته لا تجب نفقته عليك في الغالب، فيجوز إعطاؤه إن كان فقيرًا أو مدينًا. فإن كان يعيش في كنفك وتنفق عليه فاسأل عالمًا تثق به، لأن الحكم يتبع وجوب النفقة لا مجرد القرابة.' },
      { q: 'هل يأخذ الزكاة من له راتب شهري؟', a: 'نعم إذا كان راتبه لا يفي بحاجاته الأصلية ولم يملك نصابًا فاضلًا عنها. فالعبرة بالكفاية لا بوجود الدخل. فرب عامل يعول أسرة كبيرة بأجر قليل هو من المساكين، ورب عاطل عن العمل عنده مدخرات فوق النصاب ليس فقيرًا بالمعنى الذي تُصرف إليه الزكاة.' },
      { q: 'هل يجوز سداد دين المعسر من الزكاة؟', a: 'نعم، فالغارمون أحد الأصناف الثمانية. ومن عجز عن وفاء دين مباح حالّ جاز أن يُعطى من الزكاة ما يقضي به دينه، ويجيز كثير من المفتين دفعها إلى الدائن مباشرة نيابة عنه. ويُشترط أن يكون الدين ثابتًا حالًّا، وأن يعجز المدين عن سداده مما يملك.' },
      { q: 'هل تُعطى الزكاة لغير المسلم؟', a: 'اختلف العلماء في بعض الأصناف، وبخاصة المؤلفة قلوبهم. وتنص إدارة الزكاة والعشر في البنجاب الباكستانية على أن غير المسلمين لا يستحقون الزكاة بموجب قانونها. ويرى كثير من العلماء ذلك في صنفي الفقراء والمساكين، ويوصون بالصدقة التطوعية لغير المسلم المحتاج، فبابها واسع لا يتقيد بالأصناف.' },
    ],
    body: (h) => {
      const c = 'JOD';
      const n = h.nisab('silver', c), ng = h.nisab('gold', c);
      const low = h.tool('receive', { own: 450, cur: c });
      const highAmt = Math.ceil(n / 100) * 100 + 300;
      const high = h.tool('receive', { own: highAmt, cur: c });
      return `
<h2>الأصناف الثمانية</h2>
<p>جاءت الآية بأسلوب الحصر: ${h.src('quran-9-60', 'إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ')} ثم عدّت بقية الأصناف، فلا تُصرف الزكاة في غيرها. وتنقل هيئات الزكاة الرسمية القائمة كما هي، ومنها ${h.src('ppz-asnaf', 'مركز الزكاة في الأقاليم الاتحادية بماليزيا')} الذي يسميها الأصناف الثمانية.</p>
${h.table(['الصنف', 'من يدخل فيه اليوم'], [
        ['الفقراء', 'من لا يجد شيئًا أو يجد القليل من كفايته'],
        ['المساكين', 'من يجد بعض كفايته ولا يجد تمامها'],
        ['العاملون عليها', 'من تعيّنهم الجهة المختصة لجمع الزكاة وتوزيعها'],
        ['المؤلفة قلوبهم', 'حديثو العهد بالإسلام ومن يُرجى تأليف قلبه'],
        ['في الرقاب', 'فك الرقاب وتحرير الأسرى'],
        ['الغارمون', 'من عجز عن سداد دين مباح'],
        ['في سبيل الله', 'يضيّقه أكثر الفقهاء ويوسّعه بعض الهيئات'],
        ['ابن السبيل', 'المسافر المنقطع عن ماله ولو كان غنيًا في بلده'],
      ], 'مصارف الزكاة في سورة التوبة 60.', ['l', 'l'])}
<p>وفي حديث معاذ رضي الله عنه وصفٌ جامع لمسار الزكاة: تؤخذ من أغنيائهم فترد على فقرائهم (${h.src('a-bukhari-1395', 'صحيح البخاري 1395')}). ولذلك يذهب أكثر ما تخرجه الأسرة إلى الصنفين الأولين، مباشرة أو عن طريق جهة تتولى التوزيع.</p>

<h2>معيار الفقر بالنصاب</h2>
<p>يستعمل الحنفية الحد نفسه في الطرفين: فمن ملك نصابًا فاضلًا عن حاجاته الأصلية فهو غني في باب الزكاة يعطي ولا يأخذ، ومن ملك أقل منه جاز له الأخذ. والحاجات الأصلية المسكن والثياب والأثاث وأدوات الحرفة ووسيلة التنقل، لا المدخرات ولا ذهب الادخار. ونصاب الفضة في الأردن اليوم ${h.money(n, c)}، وبنصاب الذهب ${h.money(ng, c)}.</p>
<p>فأرملة في إربد ادخرت ${h.money(450, c)} ولا تملك شيئًا آخر زائدًا عن حاجتها تكون النتيجة في حقها «${low.value}». وصاحب بقالة عنده ${h.money(highAmt, c)} بين بضاعة ونقد تكون النتيجة في حقه «${high.value}» ولو كانت تجارته كاسدة. أما المذاهب الأخرى فتنظر إلى كفاية الدخل والمال لحاجات سنة له ولمن يعول، والنتيجة تتفق غالبًا مع معيار النصاب وقد تختلف، ولذلك تذكر الحاسبة المعيار الذي تطبقه.</p>
${h.mini('receive', { t: 'هل يملك هذا الشخص أقل من النصاب؟', p: ['own'], d: { own: 450, cur: c } })}

<h2>من لا تُدفع إليهم زكاتك</h2>
<p>من الشروط المتفق عليها عند جمهور الفقهاء ألا يكون الآخذ ممن تلزم المزكي نفقته. وقد نصت ${h.src('a-egypt-maintenance', 'دار الإفتاء المصرية في الفتوى 18483')} على ذلك: ألا يكون المعطى له من الزكاة ممن تلزمه نفقته، فإن كان كذلك لم يجز إعطاؤه. ونقلت عن الكاساني في بدائع الصنائع أن هذا يشمل الوالدين وإن علوا والمولودين وإن سفلوا، وأنه لا يجوز أن يدفع الرجل الزكاة إلى زوجته بالإجماع. والعلة أن الدفع إليهم يغنيهم عن نفقة واجبة عليه أصلًا، فيعود نفعه إليه.</p>
<p>أما الأقارب الذين لا تجب نفقتهم عليك، كالأخ المستقل ببيته والأخت المتزوجة والعم والخال وأبنائهم، فلا يشملهم هذا الشرط، فإن كانوا من أحد الأصناف الثمانية جاز إعطاؤهم كغيرهم، وفي ذلك صلة للرحم مع أداء الفريضة.</p>
<p>والفيصل في هذه المسائل وجوب النفقة لا درجة القرابة. فالابن الذي يعيش في بيت أبيه ولا مال له نفقته على أبيه، فلا يأخذ من زكاته. أما من وجبت نفقته على غيرك، كالبنت المتزوجة التي ينفق عليها زوجها، فحكمها مختلف. وإذا تعدد المحتاجون من الأقارب وغيرهم، فلك أن تقسم زكاتك بينهم أو تخص بها بعضهم، ما دام كل واحد منهم من أهلها، وما دامت نيتك عند الدفع أنها زكاة مالك المفروضة لا هدية ولا صدقة تطوع.</p>

<h2>الغارمون وابن السبيل</h2>
<p>صنفان كثيرًا ما يُغفل عنهما. فالغارم من عجز عن وفاء دين مباح: أسرة استدانت لعلاج مريض، أو مستأجر يُهدَّد بالإخلاء لتأخر الأجرة. فيُعطى ما يقضي به دينه ولو كان دخله الشهري كافيًا لنفقته، لأن الدين نفسه هو الحاجة. وابن السبيل يأخذ وهو منقطع في سفره ولو كان له مال في بلده، لأنه لا يصل إليه. أما الدين الذي لك على غيرك فحكمه في زكاتك أنت مذكور في ${h.src('iifa-debts', 'قرار مجمع الفقه الإسلامي الدولي رقم 1')}.</p>

<h2>حين تتولى الدولة التوزيع</h2>
<p>في باكستان تذهب الزكاة التي تقتطعها البنوك إلى النظام الرسمي، وتحدد ${h.src('pk-faq', 'إدارة الزكاة والعشر في البنجاب')} المستحق بأنه المواطن الباكستاني المسلم الذي يعيش تحت خط الفقر، وتنص على أن غير المسلمين لا يستحقونها. وحيث لا يوجد نظام كهذا يختار المزكي بنفسه من يعطيه. والحاسبات في هذا الموقع تحسب مقدار ما عليك ولا توصي بجهة بعينها، وما أشكل عليك من حال قريب أو دين فاسأل عنه عالمًا تثق به.</p>
`;
    },
  },
});
