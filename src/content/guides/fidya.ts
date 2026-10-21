import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en'), A = makeKit('ar');
const sa = E.P.fitr.saKg;
const mudd = sa.majority / 4;
const withFidya = E.FITR.filter((r) => r.fidya !== undefined);

export default defineGuide({
  id: 'fidya', group: 'fitr', order: 40, tool: 'fidya',
  related: ['kaffarah', 'zakat-al-fitr', 'fitrana', 'zakat-fitrah', 'zakat-calculator-uae'],
  sources: ['quran-2-184', 'islamweb-fidya', 'ppz-fidyah', 'b-muis-1447', 'b-uae-fatwa-1447', 'b-fcna-1447', 'b-cii-1447'],
  en: {
    slug: 'fidya', nav: 'Fidya', card: 'Fidya per missed fast in 2026, from the UAE, Pakistan, the US, Singapore, Indonesia and Jordan, and the mudd or half sa’ behind it.',
    title: 'Fidya 2026: Amount per Missed Fast and Who Has to Pay It',
    description: 'Fidya 2026: the amount per fast missed for good, set by six official bodies, the mudd or half sa’ of each school, and the rule on make-up fasts left too late.',
    h1: 'Fidya: feeding a poor person for each fast you cannot keep',
    intro: 'Enter the number of fasts you cannot make up and pick the body of your country, or type the price of one meal where you live.',
    resume: `Fidya is the feeding of one poor person for each day of Ramadan that someone cannot fast and will never be able to make up, such as a very old person or someone with a lasting illness. Its basis is the Qur’an, 2:184. The schools measure the meal differently: one mudd of food a day for the Maliki and Shafi‘i schools, about ${E.dec(mudd, 2)} kg on the ${sa.majority} kg sa’; half a sa’ for the Hanafi school, which is ${sa.hanafiHalfSaKg} kg of wheat. Official bodies turned this into money for 1447: ${E.money(E.fitr('uae').fidya!, 'AED')} a day in the Emirates, ${E.money(E.fitr('pakistan').fidya!, 'PKR')} in Pakistan on wheat, ${E.money(E.fitr('usa').fidya!, 'USD')} recommended by the Fiqh Council of North America, ${E.money2(E.fitr('singapore').fidya!, 'SGD')} in Singapore and ${E.money(E.fitr('indonesia').fidya!, 'IDR')} in Indonesia. For thirty days missed, a resident of Abu Dhabi pays ${E.money(30 * E.fitr('uae').fidya!, 'AED')}. Amounts for 1448 are to be published before Ramadan.`,
    faqs: [
      { q: 'Who pays fidya instead of making up the fast?', a: 'Someone who cannot fast and has no realistic hope of being able to later: the very old, and people with a chronic illness that rules out fasting. A temporary illness or a journey calls for making up the days, not fidya. When in doubt about your own case, ask a doctor and a scholar you trust together.' },
      { q: 'Do I owe fidya if I delayed my make-up fasts until the next Ramadan?', a: 'The Shafi‘i school says yes: one mudd per day for each year of delay, on top of the make-up fast, and the Federal Territories zakat centre in Malaysia multiplies it per year. The Hanafi school asks only for the make-up. MUIS in Singapore stopped requiring the compounded fidyah by default in 2026.' },
      { q: 'Can fidya for the whole month be given to one poor person?', a: 'Most scholars allow it, as long as each day’s meal is counted: thirty meals may go to one family. Some prefer feeding a different person for each day. Paying fidya in advance for the coming Ramadan is accepted by the Hanafi school; others ask you to pay each day as it comes, or at the end of the month.' },
    ],
    body: (h) => {
      const rows = withFidya.map((r) => [r.country.en, r.body.en, h.money2(r.fidya!, r.cur), r.basis?.en.split(';').find((x) => /fidya/i.test(x))?.trim() ?? '']);
      const riceKg = 3;
      return `
<h2>What the verse says</h2>
<p>The fasting verses give a choice to those who can fast only with great hardship: “a ransom of feeding a poor person” for each day (${h.src('quran-2-184', 'Qur’an 2:184')}). Scholars apply it today to people who will not be able to fast in the future: the elderly whose strength will not return, and the chronically ill whose doctors forbid fasting. They do not fast, they do not make up, they feed. Someone who misses days for a passing reason, illness, travel, pregnancy or menstruation, owes make-up fasts instead, and the fidya does not replace them.</p>

<h2>A mudd or half a sa’: two measures, two amounts</h2>
<p>The schools disagree on how much one meal is, and the difference is large. ${h.src('islamweb-fidya', 'Islamweb’s fatwa 28409')} sets out the views:</p>
<ul>
<li><strong>Maliki and Shafi‘i</strong>: one mudd per day, a quarter of a sa’. On the ${sa.majority} kg sa’ that is about ${h.dec(mudd, 2)} kg of the staple.</li>
<li><strong>Hanafi</strong>: half a sa’ of wheat, ${sa.hanafiHalfSaKg} kg, or a full sa’ of other foods.</li>
<li><strong>Hanbali</strong>: half a sa’, except for wheat, where a mudd suffices.</li>
</ul>
<p>Take rice at 3 units of your currency per kilo and thirty days. On the mudd, the fidya is ${h.num(30 * mudd * riceKg, 2)}; on the Hanafi half sa’, ${h.num(30 * sa.hanafiHalfSaKg * riceKg, 2)}, about three times as much. The bodies below made their own choice: the Fiqh Council of North America starts from the mudd and the price of a day’s food, the UAE Council for Fatwa from 3.25 kg of wheat.</p>

<h2>Official amounts for 1447</h2>
${h.table(['Country', 'Body', 'Per day', 'Basis'], rows, 'Fidya per day of fasting missed for good, Ramadan 1447 (2026).', ['l', 'l', 'r', 'l'])}
<p>The ${h.src('b-uae-fatwa-1447', 'UAE Council for Fatwa')} fixed 3.25 kg of wheat or its value. Pakistan’s ${h.src('b-cii-1447', 'Council of Islamic Ideology')} gave ${h.money(30 * h.fitr('pakistan').fidya!, 'PKR')} for thirty fasts on wheat, and higher sums on barley, dates and raisins. The ${h.src('b-fcna-1447', 'Fiqh Council of North America')} took the national average cost of a day’s food, $13.78, and rounded it to $15. ${h.src('b-muis-1447', 'MUIS')} in Singapore moved from rice to the cost of a meal, raising the rate from S$1.40 to S$4. Jordan’s Iftaa Council set at least one dinar a day. No official 1447 fidya was found for Malaysia’s states, Egypt, Saudi Arabia or the United Kingdom; use the price of a simple meal there as your own amount.</p>
${h.mini('fidya', { t: 'Fidya for missed fasts', p: ['days', 'body', 'per'], d: { days: 30, body: 'uae' } })}

<h2>Fasts made up late</h2>
<p>A different case: you missed days for a temporary reason, could have made them up during the year, and let the next Ramadan arrive. The Shafi‘i school adds a fidya of one mudd for each day and for each year of delay, on top of the make-up. The ${h.src('ppz-fidyah', 'Federal Territories zakat centre')} in Malaysia applies it: 7 days delayed for 3 years at RM4.00 makes 7 × RM4.00 × 3. The Hanafi school asks only for the make-up. MUIS in Singapore announced in 2026 that it no longer requires the compounded fidyah by default, while leaving voluntary payment open.</p>
${h.mini('fidya', { t: 'Fidya at your local meal price', p: ['days', 'per'], d: { days: 12, body: 'own', per: 9 } })}

<h2>Fidya on behalf of someone who has died</h2>
<p>When a person dies owing make-up fasts that he had the chance to complete, most scholars hold that his heir feeds a poor person for each day from the estate, at the measure of his school; some scholars allow a relative to fast on his behalf instead. Someone whose illness lasted until death, with no chance to make up the days, owes nothing, and nor do the heirs. Fidya owed from an estate is paid before the estate is shared, like other debts, and a relative may also pay it from his own money as a gift.</p>

<h2>Paying it in practice</h2>
<p>Fidya may be given as food or, on the Hanafi view and in the practice of the bodies above, as money. It goes to the poor and needy. You may give it day by day, at the end of Ramadan, or in one sum. Someone caring for an elderly parent who cannot fast may pay it on the parent’s behalf from the parent’s own money, or from his own as a gift. The ${h.a('kaffarah', 'kaffarah page')} covers the separate expiation for breaking a fast on purpose.</p>
`;
    },
  },
  ar: {
    slug: 'fidya', nav: 'فدية الصيام', card: 'فدية الصيام عن اليوم لعام 1447 كما أعلنتها الجهات الرسمية، ومقدارها بالمد ونصف الصاع عند المذاهب.',
    title: 'فدية الصيام 2026: مقدارها عن كل يوم ومن تجب عليه ومتى',
    description: 'فدية الصيام 2026: مقدارها عن اليوم كما أعلنتها مجالس الإفتاء لعام 1447 بالدرهم والدينار، والمد ونصف الصاع عند المذاهب الأربعة، وحكم من أخّر القضاء عن وقته.',
    h1: 'فدية الصيام: إطعام مسكين عن كل يوم',
    intro: 'أدخل عدد الأيام التي لا تستطيع قضاءها واختر الجهة الرسمية في بلدك، أو اكتب ثمن وجبة واحدة حيث تقيم.',
    resume: `فدية الصيام إطعام مسكين عن كل يوم من رمضان يفطره من لا يقدر على الصوم ولا يُرجى أن يقدر على قضائه، كالشيخ الكبير والمريض مرضًا مزمنًا، وأصلها قوله تعالى في سورة البقرة: ﴿وَعَلَى ٱلَّذِينَ يُطِيقُونَهُۥ فِدْيَةٌ طَعَامُ مِسْكِينٍ﴾. واختلفت المذاهب في قدر الإطعام: مدّ عن كل يوم عند المالكية والشافعية، أي نحو ${A.dec(mudd, 2)} كغ على صاع ${A.dec(sa.majority, 2)} كغ، ونصف صاع عند الحنفية، وهو ${A.dec(sa.hanafiHalfSaKg, 3)} كغ من البر، ونصف صاع عند الحنابلة إلا البر فمدّ. وقد قدّر مجلس الإمارات للإفتاء الشرعي الفدية لعام 1447 بـ3.250 كغ من البر أو ${A.money(A.fitr('uae').fidya!, 'AED')} عن اليوم، وقدّرها مجلس الإفتاء الأردني بـ${A.money2(A.fitr('jordan').fidya!, 'JOD')} في حدها الأدنى. فمن أفطر الشهر كله في الإمارات يخرج ${A.money(30 * A.fitr('uae').fidya!, 'AED')}، ومن كان في الأردن يخرج ${A.money(30 * A.fitr('jordan').fidya!, 'JOD')} على الأقل. وتُدفع للفقراء والمساكين طعامًا أو قيمة على قول الحنفية. أما مقادير 1448 فلم تُعلن بعد، وتصدر عادة قبيل رمضان.`,
    faqs: [
      { q: 'من الذي تلزمه الفدية بدل القضاء؟', a: 'من عجز عن الصيام عجزًا لا يُرجى زواله: الشيخ الكبير والعجوز اللذان لا يطيقان الصوم، والمريض مرضًا مزمنًا يمنعه الأطباء من الصيام. أما المريض مرضًا عارضًا والمسافر فعليهما القضاء لا الفدية. وإذا اشتبه عليك حالك فاستشر طبيبًا وعالمًا تثق بهما معًا.' },
      { q: 'هل تلزم الفدية من أخّر قضاء رمضان حتى دخل رمضان آخر؟', a: 'عند الشافعية نعم: مدّ عن كل يوم مع القضاء، ويتكرر بتكرر السنين، وبهذا يعمل مركز الزكاة في الأقاليم الاتحادية بماليزيا. وعند الحنفية يكفي القضاء وحده. وقد أعلن المجلس الإسلامي في سنغافورة سنة 2026 أنه لم يعد يلزم الناس بالفدية المضاعفة افتراضيًا.' },
      { q: 'هل يجوز دفع فدية الشهر كله لمسكين واحد؟', a: 'أجازه أكثر العلماء ما دام عدد الوجبات مستوفى، فتُعطى ثلاثون وجبة أو قيمتها لأسرة واحدة. واستحب بعضهم إطعام مسكين مختلف عن كل يوم. وأجاز الحنفية تعجيل الفدية أول الشهر، ويرى غيرهم إخراجها يومًا بيوم أو في آخر رمضان، والأمر في ذلك واسع.' },
    ],
    body: (h) => {
      const arab = ['uae', 'jordan'].map((id) => h.fitr(id));
      const rows = [...arab, h.fitr('pakistan'), h.fitr('usa')].map((r) => [r.country.ar, r.body.ar, h.money2(r.fidya!, r.cur)]);
      const flourEgp = 30;
      return `
<h2>دلالة الآية ومن تشملهم</h2>
<p>جعل الله في آيات الصيام لمن يشق عليه الصوم مشقة شديدة ﴿فِدْيَةٌ طَعَامُ مِسْكِينٍ﴾ عن كل يوم (${h.src('quran-2-184', 'سورة البقرة 184')}). ويُنزل الفقهاء الآية اليوم على من لا يُرجى أن يستطيع الصيام في المستقبل: الكبير الذي ذهبت قوته، والمريض الذي يمنعه مرضه المزمن من الصوم بقول الأطباء. فهذا لا يصوم ولا يقضي، وإنما يُطعم. أما من أفطر لعذر يزول، كالمرض العارض والسفر والحيض، فالواجب عليه القضاء، ولا تقوم الفدية مقامه.</p>
<p>واختلف العلماء في الحامل والمرضع إذا أفطرتا خوفًا على الولد: فمنهم من أوجب القضاء والفدية معًا، ومنهم من اكتفى بالقضاء، وهي مسألة تُسأل فيها جهة الفتوى في البلد.</p>

<h2>المد أم نصف الصاع</h2>
<p>الخلاف في مقدار الإطعام كبير الأثر في المبلغ. وتعرض ${h.src('islamweb-fidya', 'فتوى إسلام ويب 28409')} الأقوال:</p>
<ul>
<li><strong>المالكية والشافعية</strong>: مدّ عن كل يوم، وهو ربع صاع، أي نحو ${h.dec(mudd, 2)} كغ على صاع ${h.dec(sa.majority, 2)} كغ.</li>
<li><strong>الحنفية</strong>: نصف صاع من البر، ${h.dec(sa.hanafiHalfSaKg, 3)} كغ، أو صاع من غيره.</li>
<li><strong>الحنابلة</strong>: نصف صاع، إلا البر فيكفي منه مدّ.</li>
</ul>
<p>ولو كان ثمن كيلو الدقيق ${h.num(flourEgp)} وحدة من عملتك لكانت فدية ثلاثين يومًا على قول المد ${h.num(30 * mudd * flourEgp, 2)}، وعلى قول نصف الصاع ${h.num(30 * sa.hanafiHalfSaKg * flourEgp, 2)}، أي أكثر من ثلاثة أضعاف. والسعر رقم مجرد للمثال لا سعر سوق، ولم نجد قيمة رسمية للفدية لعام 1447 في مصر، فيكتب المصري ثمن الطعام بسعر سوقه في خانة المبلغ الذي يحدده بنفسه.</p>

<h2>المقادير الرسمية لعام 1447</h2>
${h.table(['الدولة', 'الجهة', 'عن اليوم'], rows, 'فدية الصيام عن اليوم، رمضان 1447 (2026). مقادير 1448 لم تُعلن بعد.', ['l', 'l', 'r'])}
<p>بنى ${h.src('b-uae-fatwa-1447', 'مجلس الإمارات للإفتاء الشرعي')} تقديره على 3.250 كغ من البر عن اليوم، وهو صاع كامل على تقدير الحنفية، بالتعاون مع وزارة الاقتصاد والسياحة. وقدّر مجلس الإفتاء الأردني الفدية بدينار واحد في حدها الأدنى للعاجز عن الصيام لكبر أو مرض لا يُرجى شفاؤه. ولم نعثر على مقدار رسمي لعام 1447 في السعودية ولا الكويت ولا قطر ولا مصر، فمن كان فيها يحسب ثمن الإطعام بنفسه.</p>
${h.mini('fidya', { t: 'فدية الأيام التي لا تُقضى', p: ['days', 'body'], d: { days: 30, body: 'uae' } })}

<h2>من أخّر القضاء حتى رمضان التالي</h2>
<p>هذه مسألة أخرى غير مسألة العاجز: رجل أفطر لعذر يزول، وتمكن من القضاء في سنته فلم يقضِ حتى دخل رمضان التالي. فالشافعية يوجبون عليه مع القضاء فدية مدّ عن كل يوم، وتتكرر بتكرر السنين، وبهذا يعمل ${h.src('ppz-fidyah', 'مركز الزكاة في الأقاليم الاتحادية بماليزيا')} في أمثلته. والحنفية لا يوجبون إلا القضاء. وقد أعلن ${h.src('b-muis-1447', 'المجلس الإسلامي في سنغافورة')} سنة 2026 أنه لم يعد يلزم بالفدية المضاعفة افتراضيًا، مع بقاء التطوع بها مفتوحًا.</p>
${h.mini('fidya', { t: 'الفدية بثمن الوجبة في بلدك', p: ['days', 'per'], d: { days: 10, body: 'own', per: 15 } })}

<h2>الفدية عن الميت</h2>
<p>إذا مات من عليه قضاء أيام من رمضان وقد تمكن من قضائها فلم يفعل، فالجمهور على أن يُطعم عنه وليه من تركته عن كل يوم مسكينًا، بالمقدار الذي يعتمده مذهبه، ويرى بعض العلماء أن يصوم عنه وليه. أما من مات قبل أن يتمكن من القضاء، كمن استمر به المرض حتى مات، فلا شيء عليه ولا على ورثته. وتُخرج الفدية من التركة قبل قسمتها كسائر الديون، فإن لم يترك مالًا وتبرع بها أحد أقاربه أجزأت عند من يقول بها.</p>

<h2>كيف تُخرج</h2>
<p>تُخرج الفدية طعامًا، أو قيمةً على قول الحنفية وعمل الجهات المذكورة، وتُدفع للفقراء والمساكين. ويجوز إخراجها يومًا بيوم أو في آخر الشهر أو جملة واحدة. ولا يُشترط أن يكون المسكين من أهل البلد، وإن كان إطعام فقراء البلد أولى عند كثير من العلماء، ولا تُدفع الفدية إلى من تلزمك نفقته كالوالدين والأولاد. ومن يرعى والدًا كبيرًا لا يستطيع الصوم يجوز له أن يخرجها عنه من مال الوالد، أو من ماله هو تبرعًا. أما من أفسد صومه عمدًا فعليه شيء آخر تشرحه صفحة ${h.a('kaffarah', 'كفارة الصيام')}، ولزكاة الفطر صفحتها في ${h.a('zakat-al-fitr', 'زكاة الفطر')}.</p>
`;
    },
  },
});
