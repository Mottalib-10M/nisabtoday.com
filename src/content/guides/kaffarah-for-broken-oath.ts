import { defineGuide } from '../../lib/page-types';
import { makeKit } from '../../lib/kit';

const E = makeKit('en');
const uae = E.fitr('uae'), sg = E.fitr('singapore');
const sa = E.P.fitr.saKg;

export default defineGuide({
  id: 'kaffarah-for-broken-oath', group: 'fitr', order: 60, tool: 'kaffarah', toolArg: { type: 'oath' },
  related: ['kaffarah', 'fidya', 'zakat-al-fitr', 'zakat-calculator-uae', 'zakat-fitrah'],
  sources: ['quran-5-89', 'b-uae-fatwa-1447', 'b-muis-1447', 'islamweb-fidya', 'egypt-fitr-hanafi'],
  en: {
    slug: 'kaffarah-for-broken-oath', nav: 'Kaffarah for an oath', card: 'Breaking a sworn oath: feeding or clothing ten poor people, or three days of fasting, and the 2026 amounts.',
    title: 'Kaffarah for a Broken Oath 2026: Ten Meals or Three Fasts',
    description: 'Kaffarah for a broken oath in 2026: feeding or clothing ten poor people or fasting three days, the 2026 official amounts, which oaths need it and how to pay it.',
    h1: 'Kaffarah for breaking an oath',
    intro: 'The calculator is set to a broken oath: enter how many oaths you broke and pick your country’s body, or type the price of one meal where you live.',
    resume: `Someone who swears by God to do or not do something, then breaks the oath, owes the kaffarah set out in the Qur’an, 5:89: feed ten poor people from the average of what you feed your own family, or clothe them, or free a slave; whoever cannot do any of these fasts three days. Unlike the kaffarah for a Ramadan fast, there is a free choice among the first three, and fasting is only for those who cannot afford them. For 1447, the UAE Council for Fatwa put the oath kaffarah at ${E.money(10 * uae.kaffarah!, 'AED')}, ten poor people at ${E.money(uae.kaffarah!, 'AED')} each, and MUIS in Singapore published a kafarah rate of ${E.money2(sg.kaffarah!, 'SGD')} per person without saying whether it covers an oath. Someone in Dubai who broke two separate oaths pays ${E.money(20 * uae.kaffarah!, 'AED')}. An oath made by mistake carries no kaffarah, and a deliberate lie under oath about the past calls first for repentance. Amounts for 1448 are to be published before Ramadan.`,
    faqs: [
      { q: 'Can I fast three days instead of feeding ten people?', a: 'Only if you cannot afford to feed or clothe ten poor people. The verse orders the options: feeding, clothing or freeing a slave first, fasting for whoever cannot find the means. Someone who can easily pay the meals but prefers to fast has not met the condition on the reading of the schools.' },
      { q: 'Do several broken oaths need several kaffarahs?', a: 'If they are separate oaths on separate matters, each broken oath has its own kaffarah. If you repeated the same oath about the same thing, many scholars accept one kaffarah. The calculator multiplies by the number you enter, so enter the count your scholar or your school indicates.' },
      { q: 'Is a promise without the words “by God” an oath?', a: 'Generally not. An oath needs the name of God or one of His attributes, such as wallahi or I swear by God. A simple promise should be kept, but breaking it carries no kaffarah. A vow to God, a nadhr, has its own rules, and many scholars apply the oath kaffarah to a broken vow.' },
    ],
    body: (h) => {
      const t2 = h.tool('kaffarah', { type: 'oath', times: 1, body: 'uae' });
      const mudd = sa.majority / 4;
      const meal = 6;
      return `
<h2>The verse and its four options</h2>
<p>The rule is in the Qur’an: “its expiation is the feeding of ten needy people from the average of that which you feed your families, or clothing them, or the freeing of a slave. But whoever cannot find it, then a fast of three days” (${h.src('quran-5-89', 'Qur’an 5:89')}). Three features set it apart from the Ramadan kaffarah. The number is ten, not sixty. The first options are a free choice, not a sequence. And fasting comes last, for someone who cannot find the means for the others. Freeing a slave no longer applies, which leaves feeding, clothing, or for the poor themselves, three days of fasting.</p>
${h.mini('kaffarah', { t: 'Feeding ten poor people for one broken oath', p: ['type', 'times', 'body'], d: { type: 'oath', times: 1, body: 'uae' } })}

<h2>Which oaths need it</h2>
<p>Scholars distinguish three kinds of oath, and only one of them leads to kaffarah:</p>
<ul>
<li><strong>A binding oath about the future</strong>, such as swearing not to speak to someone or to finish a task by Friday. Breaking it calls for kaffarah. If keeping it would mean doing wrong, cutting off a relative for instance, you should break it and expiate.</li>
<li><strong>A slip of the tongue</strong>, the habitual “wallahi” of everyday speech said without intending an oath. The Qur’an in the same verse says God does not take you to account for it; no kaffarah.</li>
<li><strong>A deliberate false oath about the past</strong>, swearing to something you know is untrue. Most scholars treat it as a grave sin whose remedy is repentance and returning any right taken; some also require the kaffarah.</li>
</ul>

<h2>How much feeding ten costs in 2026</h2>
<p>The ${h.src('b-uae-fatwa-1447', 'UAE Council for Fatwa')} set the kaffarah of an oath for 1447 at ${t2.value}, distributed to ten poor people. ${h.src('b-muis-1447', 'MUIS')} in Singapore aligned its kafarah rate with fidyah at ${h.money2(sg.kaffarah!, 'SGD')} per person, built on the actual cost of a meal, but its notice concerns Ramadan and does not say whether the rate also applies to an oath; the calculator therefore leaves Singapore out for an oath. Elsewhere no official figure was found, so you price a meal yourself. The verse sets the standard: the average of what you feed your family, neither the cheapest nor a feast. A family whose ordinary meal costs ${h.money(meal, 'GBP')} a head gives ${h.money(10 * meal, 'GBP')}.</p>
${h.mini('kaffarah', { t: 'Oath kaffarah at your local meal price', p: ['type', 'times', 'per'], d: { type: 'oath', times: 1, body: 'own', per: meal } })}

<h2>Measured in food: a mudd or half a sa’</h2>
<p>Some prefer to give staple food rather than cooked meals or money. The measures follow the same split as for fidya, which ${h.src('islamweb-fidya', 'Islamweb’s fatwa 28409')} summarises: the Maliki and Shafi‘i schools give a mudd per person, about ${h.dec(mudd, 2)} kg on the ${sa.majority} kg sa’, so ${h.dec(10 * mudd, 1)} kg for ten; the Hanafi school gives half a sa’ of wheat per person, ${sa.hanafiHalfSaKg} kg by ${h.src('egypt-fitr-hanafi', 'Dar al-Ifta’s conversion')}, so ${h.dec(10 * sa.hanafiHalfSaKg, 2)} kg for ten. The Hanafi school also allows the value in money and allows feeding one poor person on ten separate days.</p>

<h2>Clothing instead of food</h2>
<p>Clothing ten poor people is an equal option. Each should receive a garment in which prayer is valid for him or her: for a man, a long shirt or a set of clothes; for a woman, a dress and head covering. In winter, a coat given to ten homeless people in Manchester or Toronto fulfils the verse as well as meals do, and may meet a greater need.</p>

<h2>Who receives it, and when to pay</h2>
<p>The recipients are the poor and needy, as the verse names them. They should not be people you are already bound to maintain, such as your parents, children or spouse, but poor relatives outside that circle qualify and many scholars prefer them. Ten different people is the clearest way; giving everything to one family of ten is accepted too. Most scholars allow paying the kaffarah after the oath is broken, and some allow paying it before breaking an oath you have decided to break. Do not let it slide: it is a debt to God, and if you die owing it, it is settled from your estate before inheritance.</p>

<h2>The three days of fasting</h2>
<p>Only someone who has no means beyond his basic needs fasts. Schools differ on whether the three days must be consecutive; the Hanafi and Hanbali schools require it, others allow separate days. If you start fasting and later come into money, many scholars say you may continue. The days can be any time of year except the days on which fasting is forbidden. For a fast broken in Ramadan, the heavier duty is on the ${h.a('kaffarah', 'kaffarah page')}.</p>
`;
    },
  },
});
